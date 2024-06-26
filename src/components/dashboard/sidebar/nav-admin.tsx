"use client";

import { usePathname, useRouter } from "next/navigation";

import { DashboardSidebarMenuInterface } from "@/lib/types";

import { icons } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function SidebarNavAdmin({
  menuLinks,
}: {
  menuLinks: DashboardSidebarMenuInterface[];
}) {
  const pathname = usePathname();
  const router = useRouter();

  const onClick = (href: string) => {
    router.push(href);
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
              "w-full font-normal justify-start gap-3 py-8 mb-1 hover:bg-gray-300 hover:text-sky-700 dark:hover:bg-[#1e293b]",
              pathname === link.link &&
                "bg-gray-300 text-sky-700 dark:bg-[#1e293b] dark:text-white"
            )}
            variant="ghost"
          >
            {icon}
            {link.label}
          </Button>
        );
      })}
    </nav>
  );
}
