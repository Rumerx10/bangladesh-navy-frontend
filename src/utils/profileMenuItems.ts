import {
  CreditCard,
  Home,
  KeyRound,
  LayoutDashboard,
  MapPin,
  Package,
  ShoppingBag,
  User,
  XCircle,
} from "lucide-react";

export const userMenuItems = [
  { label: "My Profile", href: "/account", icon: User },
  { label: "My Orders", href: "/account/orders", icon: Package },
  { label: "Cancellations", href: "/account/cancellations", icon: XCircle },
  { label: "Addresses", href: "/account/addresses", icon: MapPin },
  {
    label: "Payment Methods",
    href: "/account/payment-methods",
    icon: CreditCard,
  },
  {
    label: "Change Password",
    href: "/account/change-password",
    icon: KeyRound,
  },
];

export const adminMenuItems = [
  { label: "Admin Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Go to Storefront", href: "/", icon: Home },
  { label: "Manage Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "Manage Products", href: "/admin/products", icon: Package },
  { label: "Manage Users", href: "/admin/users", icon: User },
  {
    label: "Change Password",
    href: "/account/change-password",
    icon: KeyRound,
  },
];
