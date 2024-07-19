"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { Store } from "@prisma/client";

export const upsertStore = async (store: Partial<Store>) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Unauthenticated.");

    // Verify seller permission
    if (user.privateMetadata.role !== "SELLER")
      throw new Error(
        "Unauthorized Access: Seller Privileges Required for Entry."
      );

    // Ensure store data is provided
    if (!store) throw new Error("Please provide store data.");

    // Check if store with same name, email,url, or phone number already exists
    const existingStore = await db.store.findFirst({
      where: {
        AND: [
          {
            OR: [
              { name: store.name },
              { url: store.url },
              { phone: store.phone },
              { email: store.email },
            ],
          },
          {
            NOT: {
              id: store.id,
            },
          },
        ],
      },
    });

    if (existingStore) {
      let errorMessage = "";
      if (existingStore.name === store.name) {
        errorMessage = "A store with the same name already exists";
      } else if (existingStore.email === store.email) {
        errorMessage = "A store with the same email already exists";
      } else if (existingStore.phone === store.phone) {
        errorMessage = "A store with the same phone number already exists";
      } else if (existingStore.url === store.url) {
        errorMessage = "A store with the same URL already exists";
      }
      throw new Error(errorMessage);
    }

    // Upsert store details into the database
    const storeDetails = await db.store.upsert({
      where: {
        id: store.id,
      },
      update: store,
      create: {
        ...store,
        user: {
          connect: { id: user.id },
        },
      },
    });

    return storeDetails;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
