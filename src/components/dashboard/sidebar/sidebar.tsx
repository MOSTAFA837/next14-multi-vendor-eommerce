import Logo from "@/components/shared/logo";
import { currentUser } from "@clerk/nextjs/server";
import UserInfo from "./user-info";
import { adminDashboardSidebarOptions } from "@/constants/data";
import SidebarNavAdmin from "./nav-admin";

interface SidebarProps {
  isAdmin?: boolean;
}

export default async function Sidebar({ isAdmin }: SidebarProps) {
  const user = await currentUser();

  return (
    <div className="w-[300px] border-r h-screen p-4 flex flex-col fixed top-0 left-0 bottom-0">
      <Logo width="100%" height="180px" />

      <span className="mt-3" />

      {/* {user && <UserInfo user={user} />} */}
      {isAdmin && <SidebarNavAdmin menuLinks={adminDashboardSidebarOptions} />}
    </div>
  );
}
