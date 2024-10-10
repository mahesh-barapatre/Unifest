import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Search, SidebarOpen } from "lucide-react";
import React from "react";

function Header({ ToggleSideNav }: any) {
  return (
    <div className="py-2 px-5 shadow-sm border-b-2 bg-white flex justify-between items-center">
      <div className="text-primary text-3xl font-bold">Unifest</div>
      <div className="flex gap-5 items-center">
        <SidebarOpen
          className="hover:cursor-pointer sm:hidden"
          onClick={() => ToggleSideNav((prev: boolean) => !prev)}
          color="blue"
        />
        <Button
          variant={"outline"}
          onClick={() => (window.location.href = "/")}
        >
          HOME
        </Button>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
