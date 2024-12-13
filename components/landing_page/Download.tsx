import React from "react";
import Image from "next/image";
import Link from "next/link";

function Download() {
  return (
    <section className="w-full px-4 py-4 md:py-14 md:px-8 flex justify-center items-center text-[#350203]">
      <div className="container flex flex-col justify-center items-center">
        <div className="flex flex-col text-center gap-3">
          <h3 className="text-lg">Ready to start ?</h3>
          <h4 className="text-3xl md:text-2xl mb-2 font-extrabold tracking-tight leading-none dark:text-white">
            Take Learning with You – Download the Magneto App
          </h4>
        </div>
        <div className="mt-5 flex gap-3">
          <Link href="#">
            <Image
              src="/img/app.png"
              width={300}
              height={150}
              alt="google play"
              className="w-32 md:w-[140px]"
            />
          </Link>
          <Link href="#">
            <Image
              src="/img/play.png"
              width={300}
              height={150}
              alt="App Store"
              className="w-28 md:w-[125px]"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Download;
