"use client";

import { usePathname, useRouter } from "next/navigation";

import { icons } from "@/constants/icons";

import { DashboardSidebarMenuInterface } from "@/lib/types";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function SidebarNavSeller({
  menuLinks,
}: {
  menuLinks: DashboardSidebarMenuInterface[];
}) {
  const pathname = usePathname();
  const storeUrlStart = pathname.split("/stores/")[1];
  const activeStore = storeUrlStart ? storeUrlStart.split("/")[0] : "";

  const router = useRouter();

  console.log(
    pathname ===
      `/dashboard/seller/stores/ae779267-8aad-43fc-9570-bdb6ee989b22/products`
  );

  const onClick = (href: string) => {
    router.push(`/dashboard/seller/stores/${activeStore}/${href}`);
  };

  return (
    <nav className="relative grow mt-4">
      {menuLinks.map((link, index) => {
        let icon;
        const iconSearch = icons.find((icon) => icon.value === link.icon);
        if (iconSearch) icon = <iconSearch.path />;

        return (
          <Button
            key={index}
            size="sm"
            onClick={() => onClick(link.link)}
            className={cn(
              "w-full font-normal justify-start gap-3 dark:text-gray-300 py-8 mb-1 hover:bg-gray-300 hover:text-white dark:hover:bg-[#1e293b]",
              pathname.includes(link.link) &&
                link.link !== "" &&
                "bgGradient dark:bg-[#1e293b] text-white bg-red-900",
              pathname === `/dashboard/seller/stores/${activeStore}` &&
                link.link === "" &&
                "bgGradient dark:bg-[#1e293b] text-white bg-red-900"
            )}
            variant="ghost"
          >
            <Image
              src={link.icon}
              width={35}
              height={35}
              alt=""
              className={cn("dark:invert", {
                invert:
                  (pathname.includes(link.link) && link.link !== "") ||
                  (pathname === `/dashboard/seller/stores/${activeStore}` &&
                    link.link === ""),
              })}
            />

            <span className=" font-bold text-lg">{link.label}</span>
          </Button>
        );
      })}
    </nav>
  );
}
