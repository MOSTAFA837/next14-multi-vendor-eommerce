import { currentUser } from "@clerk/nextjs/server";
import { adminDashboardSidebarOptions } from "@/constants/data";
import SidebarNavAdmin from "./nav-admin";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isAdmin?: boolean;
  isMobile?: boolean;
}

export default async function Sidebar({ isAdmin, isMobile }: SidebarProps) {
  const user = await currentUser();

  return (
    <div
      className={cn(
        "h-screen p-4 md:flex flex-col fixed top-0 left-0 bottom-0 w-[300px]",
        !isMobile ? "border-r  hidden" : ""
      )}
    >
      {/* <Logo width="100%" height="180px" /> */}
      <h1 className="text-center text-4xl text-blue-600 font-extrabold">
        e-SHOP
      </h1>

      <span className="mt-3" />

      {/* {user && <UserInfo user={user} />} */}
      {isAdmin && <SidebarNavAdmin menuLinks={adminDashboardSidebarOptions} />}
    </div>
  );
}
