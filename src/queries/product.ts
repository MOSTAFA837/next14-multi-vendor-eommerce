"use server";

import { currentUser } from "@clerk/nextjs/server";
import slugify from "slugify";

import { ProductWithVariantType } from "@/lib/types";
import { db } from "@/lib/db";
import { generateUniqueSlug } from "@/lib/utils";

export const upsertProduct = async (
  product: ProductWithVariantType,
  storeUrl: string
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Unauthenticated.");

    if (user.privateMetadata.role !== "SELLER")
      throw new Error(
        "Unauthorized Access: Seller Privileges Required for Entry."
      );

    if (!product) throw new Error("Please provide product data.");

    // Check if the product already exists
    const existingProduct = await db.product.findUnique({
      where: { id: product.productId },
    });

    // Find the store by URL
    const store = await db.store.findUnique({
      where: { id: storeUrl },
    });

    if (!store) throw new Error("Store not found.");

    // generate unique slugs for product and variants
    const productSlug = await generateUniqueSlug(
      slugify(product.name, { replacement: "-", lower: true, trim: true }),
      "product"
    );

    const variantSlug = await generateUniqueSlug(
      slugify(product.variantName, {
        replacement: "-",
        lower: true,
        trim: true,
      }),
      "productVariant"
    );

    // common data for product and variant
    const commonProductData = {
      name: product.name,
      description: product.description,
      slug: productSlug,
      brand: product.brand,
      store: { connect: { id: store.id } },
      category: { connect: { id: product.categoryId } },
      subCategory: { connect: { id: product.subCategoryId } },
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };

    const commonVariantData = {
      variantName: product.variantName,
      variantDescription: product.variantDescription,
      slug: variantSlug,
      isSale: product.isSale,
      sku: product.sku,
      keywords: product.keywords.join(","),
      images: {
        create: product.images.map((image) => ({
          url: image.url,
          alt: image.url.split("/").pop() || "",
        })),
      },
      colors: {
        create: product.colors.map((color) => ({
          name: color.color,
        })),
      },
      sizes: {
        create: product.sizes.map((size) => ({
          size: size.size,
          quantity: size.quantity,
          price: size.price,
          discount: size.discount,
        })),
      },
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };

    // if product existing create a variant
    if (existingProduct) {
      const variantData = {
        ...commonVariantData,
        product: { connect: { id: product.productId } },
      };

      return await db.productVariant.create({ data: variantData });
    } else {
      // create a new product with variant
      const productData = {
        ...commonProductData,
        id: product.productId,
        variants: {
          create: [{ id: product.variantId, ...commonVariantData }],
        },
      };

      return await db.product.create({ data: productData });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getStoreProducts = async (storeUrl: string) => {
  const store = await db.store.findUnique({ where: { id: storeUrl } });
  if (!store) throw new Error("Please provide a valid store URL.");

  // retrive all products associated with the store
  const products = await db.product.findMany({
    where: {
      storeId: store.id,
    },
    include: {
      category: true,
      subCategory: true,
      store: {
        select: {
          id: true,
          url: true,
        },
      },
      variants: {
        include: {
          images: true,
          colors: true,
          sizes: true,
        },
      },
    },
  });

  return products;
};

export const deleteProduct = async (productId: string) => {
  const user = await currentUser();

  if (!user) throw new Error("Unauthenticated.");

  if (user.privateMetadata.role !== "SELLER") {
    throw new Error(
      "Unauthorized Access: Seller Privileges Required for Entry."
    );
  }

  // Ensure product data is provided
  if (!productId) throw new Error("Please provide product id.");

  const response = await db.product.delete({ where: { id: productId } });

  return response;
};
