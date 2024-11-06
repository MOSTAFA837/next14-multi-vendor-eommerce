import { currentUser } from "@clerk/nextjs/server";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "./db";

export async function privateRoute(role: Role) {
  const clerk = await currentUser();

  const user = await db.user.findUnique({
    where: {
      id: clerk?.id,
    },
  });

  if (user?.role !== role) {
    return redirect("/");
  }
}
