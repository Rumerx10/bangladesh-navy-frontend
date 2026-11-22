"use client";

import Image from "next/image";
import { Edit, Mail, Phone } from "lucide-react";
import { MdLocationPin } from "react-icons/md";
import { Button } from "@/src/components/ui/button";
import Paragraph from "@/src/components/shared/Paragraph";
import { IContactInfo } from "./types";

interface ContactPreviewProps {
  data: IContactInfo;
  onEdit: () => void;
}

const ContactPreview = ({ data, onEdit }: ContactPreviewProps) => {
  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
      <div className="relative bg-linear-to-r from-primary/5 via-primary/10 to-transparent px-4 sm:px-8 py-5 sm:py-6 border-b border-border">
        <div className="flex min-w-0 items-center gap-3">
          <div className="bg-primary/10 w-10 h-10 shrink-0 flex items-center justify-center rounded-xl border border-primary/20">
            <Image
              src="/icons/phone.svg"
              alt="contact info preview"
              width={40}
              height={40}
              className="w-5"
            />
          </div>
          <div className="min-w-0">
            <Paragraph className="font-semibold text-lg! text-pBlue wrap-break-word">
              Contact Info Preview
            </Paragraph>
            <Paragraph className="text-sm! text-secondary-foreground wrap-break-word">
              Site-wide phone, email & office address
            </Paragraph>
          </div>
        </div>

        <Button
          onClick={onEdit}
          className="mt-4 w-full justify-center sm:mt-0 sm:w-auto sm:absolute sm:-bottom-5 sm:right-8 flex items-center gap-2 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 px-5 py-5 rounded-xl transition-all hover:scale-105"
        >
          <Edit className="w-4 h-4" />
          Edit Contact Info
        </Button>
      </div>

      <div className="p-4 sm:p-8 sm:pt-10 space-y-4">
        <div className="bg-light rounded-xl p-4 border border-border">
          <Paragraph className="text-xs! text-secondary-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" />
            Phone Numbers
          </Paragraph>
          {data.phones?.length ? (
            <div className="flex flex-wrap gap-2">
              {data.phones.map((phone, index) => (
                <span
                  key={index}
                  className="max-w-full text-sm! font-medium text-secondary-dark bg-card border border-border rounded-2xl px-3 py-1 wrap-anywhere"
                >
                  {phone}
                </span>
              ))}
            </div>
          ) : (
            <Paragraph className="text-sm! text-muted-foreground">—</Paragraph>
          )}
        </div>

        <div className="bg-light rounded-xl p-4 border border-border">
          <Paragraph className="text-xs! text-secondary-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" />
            Email Addresses
          </Paragraph>
          {data.emails?.length ? (
            <div className="flex flex-wrap gap-2">
              {data.emails.map((email, index) => (
                <span
                  key={index}
                  className="max-w-full text-sm! font-medium text-secondary-dark bg-card border border-border rounded-2xl px-3 py-1 wrap-anywhere"
                >
                  {email}
                </span>
              ))}
            </div>
          ) : (
            <Paragraph className="text-sm! text-muted-foreground">—</Paragraph>
          )}
        </div>

        <div className="bg-light rounded-xl p-4 border border-border">
          <Paragraph className="text-xs! text-secondary-foreground uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <MdLocationPin className="w-3.5 h-3.5" />
            Office Address
          </Paragraph>
          <Paragraph className="text-sm! font-medium text-secondary-dark wrap-break-word">
            {data.office_hour || "—"}
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default ContactPreview;
