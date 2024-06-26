import { UserButton } from "@clerk/nextjs";
import ThemeToggle from "@/components/shared/theme-toggle";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "../sidebar/sidebar";

export default function Header() {
  return (
    <div className="fixed z-[20] md:left-[300px] left-0 top-0 right-0 p-4 bg-background/80 backdrop-blur-md flex gap-4 items-center border-b-[1px]">
      <Sheet>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Sidebar isAdmin isMobile />
        </SheetContent>
      </Sheet>

      <div className="flex items-center gap-2 ml-auto">
        <UserButton afterSignOutUrl="/" />
        <ThemeToggle />
      </div>
    </div>
  );
}
