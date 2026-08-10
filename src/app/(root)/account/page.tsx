import { Metadata } from "next";
import MyProfile from "@/src/components/account/MyProfile";

export const metadata: Metadata = {
  title: "My Profile | Bangladesh Navy Hydrographic & Oceanographic Center",
  description: "Manage your account profile and settings.",
};

export default function MyProfilePage() {
  return <MyProfile />;
}
