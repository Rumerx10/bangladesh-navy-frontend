"use client";

import Image from "next/image";
import { Edit, Mail, Phone, Clock } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Paragraph from "@/src/components/shared/Paragraph";
import { IContactInfo } from "./types";

interface ContactPreviewProps {
  data: IContactInfo;
  onEdit: () => void;
}

const ContactPreview = ({ data, onEdit }: ContactPreviewProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="relative bg-linear-to-r from-primary/5 via-primary/10 to-transparent px-8 py-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 w-10 h-10 flex items-center justify-center rounded-xl border border-primary/20">
            <Image
              src="/icons/phone.svg"
              alt="contact info preview"
              width={40}
              height={40}
              className="w-5"
            />
          </div>
          <div>
            <Paragraph className="font-semibold text-lg! text-pBlue">
              Contact Info Preview
            </Paragraph>
            <Paragraph className="text-sm! text-gray-500">
              Site-wide phone, email & office hour
            </Paragraph>
          </div>
        </div>

        <Button
          onClick={onEdit}
          className="absolute -bottom-5 right-8 flex items-center gap-2 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 px-5 py-5 rounded-xl transition-all hover:scale-105"
        >
          <Edit className="w-4 h-4" />
          Edit Contact Info
        </Button>
      </div>

      <div className="p-8 pt-10 space-y-4">
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <Paragraph className="text-xs! text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" />
            Phone Numbers
          </Paragraph>
          {data.phones?.length ? (
            <div className="flex flex-wrap gap-2">
              {data.phones.map((phone, index) => (
                <span
                  key={index}
                  className="text-sm! font-medium text-secondary-dark bg-white border border-gray-200 rounded-full px-3 py-1"
                >
                  {phone}
                </span>
              ))}
            </div>
          ) : (
            <Paragraph className="text-sm! text-gray-400">—</Paragraph>
          )}
        </div>

        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <Paragraph className="text-xs! text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" />
            Email Addresses
          </Paragraph>
          {data.emails?.length ? (
            <div className="flex flex-wrap gap-2">
              {data.emails.map((email, index) => (
                <span
                  key={index}
                  className="text-sm! font-medium text-secondary-dark bg-white border border-gray-200 rounded-full px-3 py-1"
                >
                  {email}
                </span>
              ))}
            </div>
          ) : (
            <Paragraph className="text-sm! text-gray-400">—</Paragraph>
          )}
        </div>

        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <Paragraph className="text-xs! text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Office Hour
          </Paragraph>
          <Paragraph className="text-sm! font-medium text-secondary-dark">
            {data.office_hour || "—"}
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default ContactPreview;
