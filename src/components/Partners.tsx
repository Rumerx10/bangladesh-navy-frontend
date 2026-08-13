"use client";

import Link from "next/link";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { FaArrowRightLong } from "react-icons/fa6";
import SectionTitle from "./SectionTitle";
import { useGet } from "@/src/hooks/useGet";
import { IPartner } from "./admin/ContentManagement/home/partner-management/types";

const Partners = () => {
  const { data, isLoading } = useGet<IPartner[]>("/partners/list", [
    "partners-list",
  ]);

  const partners = (Array.isArray(data?.data) ? data.data : []).filter(
    (partner) => partner.status === "ACTIVE"
  );

  if (!isLoading && partners.length === 0) return null;

  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-8 lg:gap-12">
        <div className="space-y-4">
          <SectionTitle title="Our Trusted Partners" />
        </div>

        <div className="py-16 lg:py-0">
          {isLoading ? (
            <div className="flex items-center justify-center gap-10">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-16 w-32 rounded-lg bg-gray-100 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <Marquee pauseOnHover={true} speed={100}>
              {partners.map((partner) => {
                const logo = (
                  <div className="h-16 w-32 flex items-center justify-center" key={partner.id}>
                    <Image
                      src={partner.image}
                      alt="Partner logo"
                      height={200}
                      width={240}
                      className="object-contain h-full w-full"
                    />
                  </div>
                );

                return (
                  <div
                    className="mx-5 lg:mx-16 h-auto lg:h-25"
                    key={partner.id}
                  >
                    {partner.link ? (
                      <Link
                        href={partner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {logo}
                      </Link>
                    ) : (
                      logo
                    )}
                  </div>
                );
              })}
            </Marquee>
          )}
        </div>

        <Link
          href="/#"
          className="text-pViolet font-medium cursor-pointer flex lg:hidden items-center mr-5 hover:mr-0 gap-2 justify-center mt-6 duration-300"
        >
          <p>See All Companies</p>
          <FaArrowRightLong />
        </Link>
      </div>
    </div>
  );
};

export default Partners;
