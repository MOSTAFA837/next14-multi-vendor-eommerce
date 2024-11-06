import ThemeToggle from "@/components/shared/theme-toggle";
import { signupUser } from "@/queries/user";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const clerk = await currentUser();

  if (clerk) await signupUser();

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
