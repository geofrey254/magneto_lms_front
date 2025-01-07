import React from "react";
import Billing from "./Billing";
import { ViewMoreWrapper } from "@/components/providers/ViewMore";

function page() {
  return (
    <section className="w-full flex justify-center items-center max-w-full px-4 pt-20 pb-6 md:p-16 md:pt-24 xl:px-24 2xl:p-24">
      <ViewMoreWrapper limits={3}>
        <Billing />
      </ViewMoreWrapper>
    </section>
  );
}

export default page;
