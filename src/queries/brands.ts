"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { Brand } from "@prisma/client";

export const upsertBrand = async (brand: Brand) => {
  try {
    const user = await currentUser();

    if (!user) throw new Error("Unauthenticated.");

    if (user.privateMetadata.role !== "ADMIN")
      throw new Error(
        "Unauthorized Access: Admin Privileges Required for Entry."
      );

    if (!brand) throw new Error("Please provide brand data.");

    const existingBrand = await db.brand.findFirst({
      where: {
        AND: [
          {
            OR: [{ name: brand.name }, { url: brand.url }],
          },
          {
            NOT: {
              id: brand.id,
            },
          },
        ],
      },
    });

    if (existingBrand) {
      let errorMessage = "";
      if (existingBrand.name === brand.name) {
        errorMessage = "A brand with the same name already exists";
      } else if (existingBrand.url === brand.url) {
        errorMessage = "A brand with the same URL already exists";
      }
      throw new Error(errorMessage);
    }

    const brandDetails = await db.brand.upsert({
      where: {
        id: brand.id,
      },
      update: brand,
      create: brand,
    });
    return brandDetails;
  } catch (error) {
    throw error;
  }
};

export const getAllBrands = async () => {
  // Retrieve all brands from the database
  const brands = await db.brand.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });
  return brands;
};

export const getBrand = async (brandId: string) => {
  // Ensure brand ID is provided
  if (!brandId) throw new Error("Please provide brand ID.");

  // Retrieve brand
  const brand = await db.brand.findUnique({
    where: {
      id: brandId,
    },
  });
  return brand;
};

export const deleteBrand = async (brandId: string) => {
  // Get current user
  const user = await currentUser();

  // Check if user is authenticated
  if (!user) throw new Error("Unauthenticated.");

  // Verify admin permission
  if (user.privateMetadata.role !== "ADMIN")
    throw new Error(
      "Unauthorized Access: Admin Privileges Required for Entry."
    );

  // Ensure brand ID is provided
  if (!brandId) throw new Error("Please provide brand ID.");

  // Delete brand from the database
  const response = await db.brand.delete({
    where: {
      id: brandId,
    },
  });
  return response;
};
