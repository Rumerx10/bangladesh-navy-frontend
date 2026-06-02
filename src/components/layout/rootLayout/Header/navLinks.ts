export interface NavLink {
  label: string;
  href: string;
  isDropdown?: boolean;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about", isDropdown: true },
  { label: "Products & Services", href: "/product-service", isDropdown: true },
  { label: "Skill Development", href: "/#skill-development" },
  { label: "Contact", href: "/#contact" },
];
