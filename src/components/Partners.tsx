import Link from "next/link";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { FaArrowRightLong } from "react-icons/fa6";
import SectionTitle from "./SectionTitle";

const Partners = () => {
  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-8 lg:gap-12">
        <div className="space-y-4">
          <SectionTitle
            title="Our Trusted Partners"
            desc="Empowering maritime safety and oceanographic research through strategic collaborations with national and international stakeholders, hydrographic organizations, and global defense partners."
          />
        </div>
        {/* <div className="space-y-4">
          <h4 className="font-bold text-3xl lg:text-4xl">
            Companies that trust us
          </h4>
          <div className="flex flex-col lg:flex-row! justify-between">
            <p className="text-pGray max-w-210">
              Over the years, Momin Textile Mills Ltd has earned the trust of
              leading apparel manufacturers and sourcing partners worldwide. Our
              reliability, product quality, and service excellence
            </p>
            <Link
              href="/our-clients"
              className="hidden lg:flex items-center justify-end gap-2 mt-6 mr-5
              text-pViolet whitespace-nowrap font-medium cursor-pointeritems-center hover:mr-0 duration-300"
            >
              <p>See All Companies</p>
              <FaArrowRightLong />
            </Link>
          </div>
        </div> */}

        <div className="py-16 lg:py-0">
          <Marquee pauseOnHover={true} speed={100}>
            {[
              "/partners/client1.png",
              "/partners/client2.png",
              "/partners/client3.png",
              "/partners/client4.png",
              "/partners/client5.png",
              "/partners/client6.png",
              "/partners/client7.png",

            ].map((item, index) => (
              <div className="mx-5 lg:mx-16 h-auto lg:h-25" key={index}>
                <Image
                  src={item}
                  alt="power"
                  height={200}
                  width={240}
                  className="object-contain h-full w-full"
                />
              </div>
            ))}{" "}
          </Marquee>
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
