"use client";

import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { ClipboardPaste, Loader2 } from "lucide-react";
import { usePost } from "@/src/hooks/usePost";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import InputLabel from "@/src/components/shared/InputLabel";
import Paragraph from "@/src/components/shared/Paragraph";
import { useCoursesList } from "@/src/components/courses/useCourses";
import {
  ALUMNI_MEMBERS_ENDPOINT,
  ALUMNI_MEMBERS_QUERY_KEY,
  ALUMNI_MEMBERS_TREE_QUERY_KEY,
  nextMemberSerial,
  useAlumniTree,
} from "@/src/components/alumni/useAlumni";

interface ParsedRow {
  pNo: string;
  rankAndName: string;
  organization: string;
  remarks: string;
}

/**
 * Splits one pasted line into cells. Rosters are copied out of a Word table, so
 * the separator is a tab, a pipe, or a run of two or more spaces.
 */
const splitRow = (line: string) =>
  line
    .split(/\t|\s*\|\s*|\s{2,}/)
    .map((cell) => cell.trim())
    .filter(Boolean);

/**
 * Maps a pasted row onto member fields. A leading "1." / "12" serial column is
 * dropped — serials are assigned from the course's current roster, not typed.
 */
const parseRow = (line: string): ParsedRow | null => {
  const cells = splitRow(line);
  if (cells.length === 0) return null;
  if (cells.length > 2 && /^\d+\.?$/.test(cells[0])) cells.shift();

  const [first, second, third, fourth] = cells;
  if (cells.length === 1)
    return { pNo: "", rankAndName: first, organization: "", remarks: "" };

  return {
    pNo: first ?? "",
    rankAndName: second ?? "",
    organization: third ?? "",
    remarks: fourth ?? "",
  };
};

interface BulkAddMembersProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Roster entry in bulk. Members are individual records, so each parsed row is
 * POSTed in turn — sequentially, so the serials land in the pasted order.
 */
const BulkAddMembers = ({ isOpen, onClose }: BulkAddMembersProps) => {
  const [courseId, setCourseId] = useState("");
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(0);

  const queryClient = useQueryClient();
  const { courses } = useCoursesList();
  const { groups } = useAlumniTree({ includeInactive: true });
  const { mutateAsync, isPending } = usePost(ALUMNI_MEMBERS_ENDPOINT);

  const rows = useMemo(
    () =>
      text
        .split(/\r?\n/)
        .map(parseRow)
        .filter((row): row is ParsedRow => row !== null && !!row.rankAndName),
    [text]
  );

  const startSerial = courseId ? nextMemberSerial(groups, courseId) : 1;

  const handleClose = () => {
    if (isPending) return;
    setCourseId("");
    setText("");
    setSaved(0);
    onClose();
  };

  const handleSubmit = async () => {
    if (!courseId || rows.length === 0) return;

    let serial = startSerial;
    let created = 0;
    const failed: string[] = [];
    setSaved(0);

    for (const row of rows) {
      try {
        await mutateAsync({
          data: {
            courseId,
            rankAndName: row.rankAndName,
            serial,
            status: "ACTIVE",
            ...(row.pNo && { pNo: row.pNo }),
            ...(row.organization && { organization: row.organization }),
            ...(row.remarks && { remarks: row.remarks }),
          },
        });
        created += 1;
        serial += 1;
        setSaved(created);
      } catch {
        failed.push(row.rankAndName);
      }
    }

    queryClient.invalidateQueries({ queryKey: ALUMNI_MEMBERS_QUERY_KEY });
    queryClient.invalidateQueries({ queryKey: ALUMNI_MEMBERS_TREE_QUERY_KEY });

    if (created > 0)
      toast.success(
        `${created} ${created === 1 ? "member" : "members"} added successfully!`
      );
    if (failed.length > 0) {
      toast.error(
        `${failed.length} row${failed.length === 1 ? "" : "s"} failed — check them and try again.`
      );
      // Keep only what failed in the box so it can be retried as-is.
      setText(failed.join("\n"));
      setSaved(0);
      return;
    }

    handleClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="scrollbar-modern max-h-[90vh] min-w-[60vw] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-secondary">
            <ClipboardPaste className="h-5 w-5 text-primary" />
            Paste a Roster
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2 space-y-5">
          <div>
            <InputLabel label="Course" required />
            <Select value={courseId} onValueChange={setCourseId}>
              <SelectTrigger className="h-10.5 w-full border border-input bg-white shadow-none">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <InputLabel label="Roster" required />
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              rows={8}
              disabled={isPending}
              placeholder={
                "790\tCdre A K M Mostak Sherafullah, (H1), psc, BN\tBN\tPresent Rank\n817\tLt Cdr K A Rahman, (H2), BN (Rtd)\tBN\tRtd"
              }
              className="w-full rounded-md border border-light-silver bg-white p-3 font-mono text-xs outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 disabled:opacity-60"
            />
            <Paragraph className="mt-2 text-xs! text-gray-500">
              One member per line — P. No, Rank &amp; Name, Organization,
              Remarks, separated by tabs, pipes or two or more spaces. A leading
              serial column is ignored.
            </Paragraph>
          </div>

          {rows.length > 0 && (
            <div className="rounded-lg border border-light-silver">
              <div className="flex items-center justify-between border-b border-light-silver px-4 py-2.5">
                <Paragraph className="text-sm! font-medium text-pBlue">
                  Preview
                </Paragraph>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary tabular-nums">
                  {rows.length} row{rows.length === 1 ? "" : "s"} · serials{" "}
                  {startSerial}–{startSerial + rows.length - 1}
                </span>
              </div>
              <div className="scrollbar-modern max-h-56 overflow-y-auto">
                <table className="min-w-full text-left text-xs">
                  <thead className="sticky top-0 bg-gray-50 text-[11px] font-bold uppercase tracking-wide text-gray-500">
                    <tr>
                      <th className="w-12 px-3 py-2">Ser</th>
                      <th className="w-20 px-3 py-2">P. No</th>
                      <th className="px-3 py-2">Rank &amp; Name</th>
                      <th className="w-28 px-3 py-2">Org</th>
                      <th className="w-32 px-3 py-2">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {rows.map((row, index) => (
                      <tr key={`${row.rankAndName}-${index}`}>
                        <td className="px-3 py-2 text-gray-400 tabular-nums">
                          {startSerial + index}
                        </td>
                        <td className="px-3 py-2 tabular-nums">
                          {row.pNo || "—"}
                        </td>
                        <td className="px-3 py-2 text-secondary-dark">
                          {row.rankAndName}
                        </td>
                        <td className="px-3 py-2 text-gray-600">
                          {row.organization || "—"}
                        </td>
                        <td className="px-3 py-2 text-gray-600">
                          {row.remarks || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {isPending && (
            <Paragraph className="text-xs! text-gray-500">
              Saving {saved} of {rows.length}…
            </Paragraph>
          )}

          <div className="flex items-center justify-end gap-4">
            <Button
              type="button"
              onClick={handleClose}
              disabled={isPending}
              className="cursor-pointer border bg-transparent text-secondary-foreground shadow-none hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isPending || !courseId || rows.length === 0}
              className="flex h-11 cursor-pointer items-center gap-2 bg-primary text-white hover:bg-primary disabled:cursor-not-allowed disabled:bg-primary/70"
            >
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              Add {rows.length || ""} Member{rows.length === 1 ? "" : "s"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BulkAddMembers;
