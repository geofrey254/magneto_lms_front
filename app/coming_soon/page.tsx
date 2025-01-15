import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { IoPhonePortraitOutline } from "react-icons/io5";
import React from "react";

function page() {
  return (
    <section className="w-full max-w-full px-4 pt-20 pb-6 md:py-32 xl:px-24 2xl:p-24 bg-[#350203] flex justify-center items-center">
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#350203] to-[#7a3435] text-white p-4 rounded-2xl border border-white">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/20">
          <div className="p-6 text-center space-y-6">
            <IoPhonePortraitOutline className="w-16 h-16 mx-auto text-[#ffd1d2]" />
            <h1 className="text-3xl font-bold tracking-tight">Coming Soon</h1>
            <p className="text-lg text-gray-200">
              We{"'"}re working hard to bring you an amazing mobile experience.
              Our app will be available in stores shortly.
            </p>
            <div className="flex items-center justify-center space-x-2 text-[#ffd1d2]">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
            </div>
            <p className="text-sm text-gray-300">
              Get ready for a whole new way to interact with the platform. We
              can{"'"}t wait to share it with you!
            </p>
            <p className="text-xs text-gray-400">
              Stay tuned for updates on our social media channels!
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}

export default page;
