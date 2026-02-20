"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { appStore } from "@/store/appStore";

export default function Nav() {
  const { toggleMenu, toggleCart, cart } = appStore();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-black p-4">
      <div className="max-w-8xl mx-auto px-6 py-4 grid grid-cols-3 items-center">
        <nav className="flex items-center gap-4">
          <Button
            onClick={toggleMenu}
            aria-label="Open menu"
            className="bg-transparent border-none shadow-none p-0 h-auto font-normal hover:bg-transparent hover:opacity-70 transition-opacity hover:cursor-pointer text-md text-black"
          >
            Menu
          </Button>
          <Link
            href="/categories/shop-all"
            className="hidden md:block hover:opacity-70 text-black transition-opacity"
          >
            Shop All
          </Link>
        </nav>

        <Link
          href="/"
          className="text-center flex items-center justify-center  mx-auto"
        >
          <h1 className="text-base font-normal leading-none text-black">Luvra</h1>
        </Link>

        <div className="flex justify-end  ">
          <Button
            onClick={toggleCart}
            className=" bg-transparent border-none shadow-none p-0 h-auto font-normal hover:bg-transparent hover:opacity-70 transition-opacity hover:cursor-pointer text-md text-black"
          >
            Cart ({cart.length})
          </Button>
        </div>
      </div>
    </header>
  );
}
