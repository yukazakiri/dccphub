"use client";

import { ChevronRight } from "lucide-react";
import { Link } from "@inertiajs/react";
import React from 'react';

export function Banner() {
  return (
    <div className="relative top-0 items-center justify-center w-full py-3 text-white bg-black border-b md:py-0 border-white/20">
      <div className="flex flex-col items-center justify-center gap-4 w-fullcontainer md:h-12 md:flex-row">
        <Link
          href="https://github.com/karthikmudunuri/eldoraui"
          target="_blank"
          className="inline-flex items-center justify-center text-sm leading-loose text-center group"
        >
          ✨
          <span className="font-bold">
            {" "}
            ⭐ Leave a star in Github
          </span>{" "}
          <ChevronRight className="ml-1 transition-all duration-300 ease-out size-4 group-hover:translate-x-1" />
        </Link>
      </div>


    </div>
  );
}
