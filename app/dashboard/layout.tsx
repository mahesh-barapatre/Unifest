"use client";
import React, { useState } from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sideNavOpen, setSideNavOpen] = useState<boolean>(false);
  return (
    <div className="bg-slate-100 min-h-screen">
      <div
        className={`${sideNavOpen ? "block" : "hidden"} md:w-64 md:block fixed`}
      >
        <SideNav />
      </div>

      <div className="md:ml-64">
        <Header ToggleSideNav={setSideNavOpen} />
        {children}
      </div>
      <div></div>
    </div>
  );
}

export default layout;
