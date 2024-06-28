import SubCategoryDetails from "@/components/dashboard/forms/SubCategoryDetails";
import { getAllCategories, getCategory } from "@/queries/category";
import { getSubCategory } from "@/queries/subCategory";

export default async function AdminNewCategoryPage({
  params,
}: {
  params: { subcategoryId: string };
}) {
  const subCategory = await getSubCategory(params.subcategoryId);
  const categories = await getAllCategories();

  return (
    <div className="w-full">
      <SubCategoryDetails data={subCategory} categories={categories} />
    </div>
  );
}
