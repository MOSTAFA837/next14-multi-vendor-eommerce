import ThemeToggle from "@/components/shared/theme-toggle";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-5">
      <div className="w-100 flex justify-end">
        <ThemeToggle />
      </div>

      <h1 className="fon-bold text-blue-500">Welcome to the course !</h1>
    </div>
  );
}
