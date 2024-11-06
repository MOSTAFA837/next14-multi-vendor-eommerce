import { privateRoute } from "@/lib/privateRoute";
import React, { ReactNode } from "react";

export default async function SellerDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  await privateRoute("SELLER");

  return <div>{children}</div>;
}
