import ThemeToggle from "@/components/shared/theme-toggle";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="p-5">
      <div className="flex gap-x-5 w-100 justify-end">
        <UserButton />

        <ThemeToggle />
      </div>

      <h1 className=" text-blue-500 font-barlow">Home page</h1>
    </div>
  );
}
