import { Plus } from "lucide-react";

import DataTable from "@/components/ui/data-table";
import { columns } from "./_components/columns";

import BrandDetails from "@/components/dashboard/forms/BrandDetails";
import { getAllBrands } from "@/queries/brands";

export default async function AdminCategoriesPage() {
  const brands = await getAllBrands();
  if (!brands) return null;

  return (
    <div>
      <h1 className=" text-4xl font-bold">Brands ({brands.length})</h1>

      <DataTable
        actionButtonText={
          <>
            <Plus size={15} />
            Create brand
          </>
        }
        createNew="/dashboard/admin/brands/new"
        modalChildren={<BrandDetails />}
        filterValue="name"
        data={brands}
        searchPlaceholder="Search brand name..."
        columns={columns}
      />
    </div>
  );
}
