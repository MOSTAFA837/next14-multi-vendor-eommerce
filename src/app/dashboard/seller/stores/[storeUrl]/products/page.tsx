import DataTable from "@/components/ui/data-table";
import { getStoreProducts } from "@/queries/product";
import { columns } from "./columns";

async function SellerProductsPage({
  params,
}: {
  params: { storeUrl: string };
}) {
  // fetching product data for the active store
  const products = await getStoreProducts(params.storeUrl);

  return (
    <DataTable
      filterValue="name"
      data={products}
      columns={columns}
      searchPlaceholder="Search product name.."
      createNew={`/dashboard/seller/stores/${params.storeUrl}/products/new`}
      actionButtonText="Create new product"
    />
  );
}

export default SellerProductsPage;
