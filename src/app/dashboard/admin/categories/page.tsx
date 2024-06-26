import { Plus } from "lucide-react";

import CategoryDetails from "@/components/dashboard/forms/CategoryDetails";
import DataTable from "@/components/ui/data-table";
import { columns } from "./columns/columns";

import { getAllCategories } from "@/queries/category";

export default async function AdminCategoriesPage() {
  const categories = await getAllCategories();
  if (!categories) return null;

  return (
    <DataTable
      actionButtonText={
        <>
          <Plus size={15} />
          Create category
        </>
      }
      createNew="/dashboard/admin/categories/new"
      modalChildren={<CategoryDetails />}
      filterValue="name"
      data={categories}
      searchPlaceholder="Search category name..."
      columns={columns}
    />
  );
}
