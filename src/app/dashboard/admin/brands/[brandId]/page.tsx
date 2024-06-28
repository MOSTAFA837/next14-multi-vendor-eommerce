import BrandDetails from "@/components/dashboard/forms/BrandDetails";
import { getBrand } from "@/queries/brands";

export default async function AdminNewCategoryPage({
  params,
}: {
  params: { brandId: string };
}) {
  const brand = await getBrand(params.brandId);

  return (
    <div className="w-full">
      <BrandDetails data={brand} />
    </div>
  );
}
