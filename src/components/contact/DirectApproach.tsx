"use client";

import { useGet } from "@/src/hooks/useGet";
import { Clock, Mail, Phone } from "lucide-react";
import SectionTitle from "../SectionTitle";
import { IContactInfo } from "./types";

const DirectApproach = () => {
  const { data, isLoading } = useGet<IContactInfo>("/contact-info", [
    "contact-info",
  ]);

  const contactInfo = data?.data;
  const hasPhones =
    Array.isArray(contactInfo?.phones) && contactInfo.phones.length > 0;
  const hasEmails =
    Array.isArray(contactInfo?.emails) && contactInfo.emails.length > 0;

  const phoneNumbers = hasPhones ? contactInfo.phones : [];
  const emailAddresses = hasEmails ? contactInfo.emails : [];
  const officeHour = contactInfo?.office_hour || "";

  return (
    <div>
      <SectionTitle
        title="Direct Contact Info"
        desc="Reach us directly through any of the channels below, or find us on the map."
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {/* Phone */}
        <div className="rounded-2xl border border-gray-100 bg-[#f8fafc] p-6 h-full">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mb-4">
            <Phone className="w-5 h-5 text-liteBlue" />
          </div>
          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-2">
            Phone Numbers
          </p>
          {isLoading ? (
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
          ) : (
            <div className="flex flex-col gap-1">
              {phoneNumbers.length > 0 ? (
                phoneNumbers.map((phone: string, index: number) => (
                  <a
                    key={index}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="text-pBlue font-semibold hover:text-liteBlue transition-colors"
                  >
                    {phone}
                  </a>
                ))
              ) : (
                <p className="text-gray-500">+8801769722446</p>
              )}
            </div>
          )}
        </div>

        {/* Email */}
        <div className="rounded-2xl border border-gray-100 bg-[#f8fafc] p-6 h-full">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mb-4">
            <Mail className="w-5 h-5 text-liteBlue" />
          </div>
          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-2">
            Email Addresses
          </p>
          {isLoading ? (
            <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
          ) : (
            <div className="flex flex-col gap-1">
              {emailAddresses.length > 0 ? (
                emailAddresses.map((email: string, index: number) => (
                  <a
                    key={index}
                    href={`mailto:${email}`}
                    className="text-pBlue font-semibold hover:text-liteBlue transition-colors break-all"
                  >
                    {email}
                  </a>
                ))
              ) : (
                <p className="text-gray-500">bnhoc@navy.mil.bd</p>
              )}
            </div>
          )}
        </div>

        {/* Office Hours */}
        <div className="rounded-2xl border border-gray-100 bg-[#f8fafc] p-6 h-full">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mb-4">
            <Clock className="w-5 h-5 text-liteBlue" />
          </div>
          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-2">
            Office Hours
          </p>
          {isLoading ? (
            <div className="h-5 w-44 bg-gray-200 rounded animate-pulse" />
          ) : (
            <p className="text-pBlue font-semibold">
              {officeHour || "Sun - Thu, 08:30 AM - 04:30 PM"}
            </p>
          )}
        </div>
      </div>

      {/* Map */}
      <div className="mt-8 rounded-2xl overflow-hidden shadow-inner border border-gray-100">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.674384666324!2d91.792451!3d22.253046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acdf29143922d5%3A0x6758416d29994c6e!2sBangladesh%20Navy%20Hydrographic%20and%20Oceanographic%20Centre!5e0!3m2!1sen!2sbd!4v1714987044282!5m2!1sen!2sbd"
          width="100%"
          height="420"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="BNHOC Location"
          className="w-full"
        ></iframe>
      </div>
    </div>
  );
};

export default DirectApproach;
