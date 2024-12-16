import React from "react";
import Image from "next/image";
import Link from "next/link";

function Download() {
  return (
    <section className="download w-full px-4 py-12 md:py-14 md:px-0 xl:px-20 flex justify-center items-center text-[#350203]">
      <div className="container grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-0 md:gap-36">
        <div className="flex flex-col text-start gap-3">
          <h3 className="text-lg">Ready to start ?</h3>
          <h4 className="text-2xl md:text-4xl font-medium md:tracking-tight leading-none dark:text-white">
            Take Learning with You – Download the Magneto App
          </h4>
        </div>
        <div className="mt-5 flex flex-col md:flex-row gap-3">
          <Link href="#">
            <Image
              src="/img/app.png"
              width={300}
              height={150}
              alt="google play"
              className="w-40 md:w-[200px] bg-[#f0e1d4ec] p-3 rounded-2xl"
            />
          </Link>
          <Link href="#">
            <Image
              src="/img/play.png"
              width={300}
              height={150}
              alt="App Store"
              className="w-40 md:w-[195px] bg-[#f0e1d4ec] p-3 rounded-2xl"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Download;
