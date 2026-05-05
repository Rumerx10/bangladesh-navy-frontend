import logo from "@/public/logo.png";
import { siteConfig } from "@/src/config/siteConfig";
import { Facebook, MapPin, Mail, Phone, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const productLinks = [
  { label: "Paper Charts", href: "/product-service?category=paper-charts" },
  { label: "Electronic Charts", href: "/product-service?category=electronic-charts" },
  { label: "Tide Tables", href: "/product-service?category=tide-tables" },
  { label: "Notices to Mariners", href: "/product-service?category=notices-to-mariners" },
  { label: "Publications", href: "/product-service?category=publications" },
];

const aboutLinks = [
  { label: "History", href: "/about/history" },
  { label: "Vision & Mission", href: "/about/vision-mission" },
  { label: "Organization", href: "/about/organization" },
  { label: "Survey Ships", href: "/about/survey-ships" },
  { label: "Gallery", href: "/about/gallery" },
];

const serviceLinks = [
  { label: "Skill Development", href: "/#skill-development" },
  { label: "Hydrographic Forms", href: "#" },
  { label: "Marine Weather", href: "/product-service?category=marine-weather" },
  { label: "GIS Explorer", href: "#" },
];

const Footer = () => {
  return (
    <footer className="bg-[#001836] text-gray-300 pt-12 lg:pt-16">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Logo & Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              aria-label={siteConfig.name}
              className="flex gap-2.5 items-center mb-4"
            >
              <Image
                src={logo}
                alt={siteConfig.name}
                width={100}
                height={100}
                className="w-11 h-11"
              />
              <div>
                <h2 className="text-sm font-bold text-white leading-tight">
                  {siteConfig.name}
                </h2>
                <p className="text-[11px] text-gray-400 leading-tight">
                  {siteConfig.description}
                </p>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Providing accurate nautical charts and navigational information
              for safe maritime navigation in Bangladesh waters.
            </p>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-2.5 text-gray-400">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gray-500" />
                <span>{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-400">
                <Phone size={16} className="shrink-0 text-gray-500" />
                <span>{siteConfig.phone1}</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-400">
                <Mail size={16} className="shrink-0 text-gray-500" />
                <Link href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
                  {siteConfig.email}
                </Link>
              </div>
            </div>
          </div>

          {/* Products & Services */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 lg:mb-5">
              Products & Services
            </h4>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 lg:mb-5">
              About Us
            </h4>
            <ul className="space-y-2.5">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 lg:mb-5">
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Follow Us */}
            <h4 className="text-sm font-semibold text-white mt-6 mb-3">
              Follow Us
            </h4>
            <div className="flex gap-2.5">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#003f71] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} className="text-white" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#003f71] flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#003f71] flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={16} className="text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10 mt-10">
        <div className="container px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between py-5 gap-3">
          <span className="text-xs text-gray-500">
            © {new Date().getFullYear()} Bangladesh Navy. All rights reserved.
          </span>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
