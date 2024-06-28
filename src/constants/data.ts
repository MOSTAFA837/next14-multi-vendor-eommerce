import { DashboardSidebarMenuInterface } from "@/lib/types";

export const adminDashboardSidebarOptions: DashboardSidebarMenuInterface[] = [
  {
    label: "Dashboard",
    icon: "/assets/icons/dashboard.svg",
    link: "/dashboard/admin",
  },
  {
    label: "Stores",
    icon: "/assets/icons/store.svg",
    link: "/dashboard/admin/stores",
  },

  {
    label: "Orders",
    icon: "/assets/icons/order.svg",
    link: "/dashboard/admin/orders",
  },

  {
    label: "Categories",
    icon: "/assets/icons/category.svg",
    link: "/dashboard/admin/categories",
  },
  {
    label: "Sub-Categories",
    icon: "/assets/icons/sub-category.svg",
    link: "/dashboard/admin/subcategories",
  },
  {
    label: "Brands",
    icon: "/assets/icons/brand.png",
    link: "/dashboard/admin/brands",
  },
  {
    label: "Coupons",
    icon: "/assets/icons/coupon.svg",
    link: "/dashboard/admin/coupons",
  },
];
