import { Plus } from "lucide-react";

import DataTable from "@/components/ui/data-table";
import { columns } from "./_components/columns";

import { getAllSubCategories } from "@/queries/subCategory";
import SubCategoryDetails from "@/components/dashboard/forms/SubCategoryDetails";
import { getAllCategories } from "@/queries/category";

export default async function AdminSubCategoriesPage() {
  const subCategories = await getAllSubCategories();
  const categories = await getAllCategories();

  if (!subCategories) return null;

  return (
    <div>
      <h1 className=" text-4xl font-bold">
        Sub Categories ({subCategories.length})
      </h1>

      <DataTable
        actionButtonText="Create sub category"
        createNew="/dashboard/admin/subcategories/new"
        modalChildren={<SubCategoryDetails categories={categories} />}
        filterValue="name"
        data={subCategories}
        searchPlaceholder="Search Sub category name..."
        columns={columns}
      />
    </div>
  );
}
