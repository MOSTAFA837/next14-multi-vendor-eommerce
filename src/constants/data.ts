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
    label: "Offer Tags",
    icon: "/assets/icons/offer2.svg",
    link: "/dashboard/admin/offer-tags",
  },
  {
    label: "Coupons",
    icon: "/assets/icons/coupon2.svg",
    link: "/dashboard/admin/coupons",
  },
];

export const SellerDashboardSidebarOptions: DashboardSidebarMenuInterface[] = [
  {
    label: "Dashboard",
    icon: "/assets/icons/dashboard.svg",
    link: "",
  },
  {
    label: "Products",
    icon: "/assets/icons/products.svg",
    link: "/products",
  },
  {
    label: "Orders",
    icon: "/assets/icons/order.svg",
    link: "/orders",
  },
  {
    label: "Inventory",
    icon: "/assets/icons/inventory.svg",
    link: "/inventory",
  },
  {
    label: "Coupons",
    icon: "/assets/icons/coupon.svg",
    link: "/coupons",
  },
  {
    label: "Shipping",
    icon: "/assets/icons/shipping.svg",
    link: "/shipping",
  },
  {
    label: "Settings",
    icon: "/assets/icons/settings.svg",
    link: "/settings",
  },
];
