"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "@prisma/client";

export const signupUser = async () => {
  const clerk = await currentUser();

  if (!clerk) return;

  const userClerk: Partial<User> = {
    id: clerk.id,
    name: `${clerk.firstName} ${clerk.lastName}`,
    email: clerk.emailAddresses[0].emailAddress,
    picture: clerk.imageUrl,
  };

  await db.user.upsert({
    where: {
      email: userClerk.email,
    },
    update: userClerk,
    create: {
      id: userClerk.id!,
      name: userClerk.name!,
      email: userClerk.email!,
      picture: userClerk.picture!,
      role: "USER", // Default role to "USER" if not provided
    },
  });
};
