import CategoryDetails from "@/components/dashboard/forms/CategoryDetails";
import { getCategory } from "@/queries/category";

export default async function AdminNewCategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const category = await getCategory(params.categoryId);

  return (
    <div className="w-full">
      <CategoryDetails data={category} />
    </div>
  );
}
