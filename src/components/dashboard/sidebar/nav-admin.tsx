"use client";

import { usePathname, useRouter } from "next/navigation";

import { DashboardSidebarMenuInterface } from "@/lib/types";

import { icons } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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
              "w-full font-normal justify-start gap-3 dark:text-gray-300 py-8 mb-1 hover:bg-gray-300 hover:text-white dark:hover:bg-[#1e293b]",
              pathname === link.link &&
                "bgGradient dark:bg-[#1e293b] text-white"
            )}
            variant="ghost"
          >
            <Image
              src={link.icon}
              width={35}
              height={35}
              alt=""
              className={cn("dark:invert", pathname === link.link && "invert")}
            />

            <span className=" font-bold text-lg">{link.label}</span>
          </Button>
        );
      })}
    </nav>
  );
}
