import { getAllCategories } from "@/queries/category";
import React from "react";

async function ProductVariantPage({
  params,
}: {
  params: { storeUrl: string; productId: string; variantId: string };
}) {
  const categories = await getAllCategories();

  return <div>ProductVariantPage</div>;
}

export default ProductVariantPage;
