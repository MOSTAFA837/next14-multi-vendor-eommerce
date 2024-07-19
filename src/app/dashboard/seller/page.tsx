import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SellerDashboardPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/");
  }

  const stores = await db.store.findMany({
    where: {
      userId: user.id,
    },
  });

  if (stores.length === 0) {
    redirect("/dashboard/seller/stores/new");
  }

  redirect(`/dashboard/seller/stores/${stores[0].url}`);
}
