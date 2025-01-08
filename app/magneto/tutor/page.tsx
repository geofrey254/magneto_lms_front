import React from "react";
import TutorInterface from "../TutorInterface";
import { SidebarProvider } from "@/components/ui/sidebar";

function page() {
  return (
    <section className="">
      <SidebarProvider>
        <TutorInterface />
      </SidebarProvider>
    </section>
  );
}

export default page;
