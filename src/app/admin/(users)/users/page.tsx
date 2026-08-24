import { Metadata } from "next";
import UserList from "@/src/components/admin/Users/UserList/UserList";

export const metadata: Metadata = {
  title: "Users",
  description: "View and manage registered users.",
};

const page = () => {
  return (
    <div>
      <UserList />
    </div>
  );
};

export default page;
