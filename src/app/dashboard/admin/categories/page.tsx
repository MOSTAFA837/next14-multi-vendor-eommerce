import { Plus } from "lucide-react";

import CategoryDetails from "@/components/dashboard/forms/CategoryDetails";
import DataTable from "@/components/ui/data-table";
import { columns } from "./_components/columns";

import { getAllCategories } from "@/queries/category";

export default async function AdminCategoriesPage() {
  const categories = await getAllCategories();
  if (!categories) return null;

  return (
    <div>
      <h1 className=" text-4xl font-bold">Categories ({categories.length})</h1>

      <DataTable
        actionButtonText="Create category"
        createNew="/dashboard/admin/categories/new"
        modalChildren={<CategoryDetails />}
        filterValue="name"
        data={categories}
        searchPlaceholder="Search category name..."
        columns={columns}
      />
    </div>
  );
}
