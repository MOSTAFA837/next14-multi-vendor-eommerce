import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import { privateRoute } from "@/lib/privateRoute";
import { ReactNode } from "react";

export default async function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Block non admins from accessing the admin dashboard
  await privateRoute("ADMIN");

  return (
    <div className="w-full h-full">
      <Sidebar isAdmin />

      <div className="md:ml-[300px]">
        <Header />
        <div className="w-full mt-[75px] p-4">{children}</div>
      </div>
    </div>
  );
}
