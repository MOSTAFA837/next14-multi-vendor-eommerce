import ProductDetails from "@/components/dashboard/forms/product-details";
import { getAllCategories } from "@/queries/category";

async function SellerNewProductPage({
  params,
}: {
  params: { storeUrl: string };
}) {
  const categories = await getAllCategories();

  // http://localhost:3000/dashboard/seller/stores/ae779267-8aad-43fc-9570-bdb6ee989b22/products/new

  return (
    <div className="w-full">
      <ProductDetails categories={categories} storeUrl={params.storeUrl} />
    </div>
  );
}

export default SellerNewProductPage;
