"use client";

import Image from "next/image";
import { useState } from "react";

export default function LoginBanner() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative hidden md:block h-screen w-full overflow-hidden">
      <Image
        src="/bg.jpg"
        alt="login"
        fill
        priority
        className={`
          object-cover transition-opacity duration-700 ease-in-out
          ${loaded ? "opacity-100" : "opacity-0"}
        `}
        onLoad={() => setLoaded(true)}
      />
      <div className="absolute inset-0 backdrop-blur-xs bg-black/5 flex flex-col items-center justify-center ">
        <div className="w-100 h-100">
          <Image
            src="/logo.png"
            alt="login"
            height={100}
            width={400}
            priority
            className={`
          object-cover transition-opacity duration-700 ease-in-out
          }
        `}
        
          />
        </div>
        <h1 className="mt-10 text-4xl font-bold text-white w-3xl text-center">Bangladesh Hydrographic & Oceanographic Centre</h1>
      </div>
    </div>
  );
}
