"use client";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { appStore } from "@/store/appStore";
import Link from "next/link";
import { useState } from "react";

export default function Menu() {
  const { menuOpen, toggleMenu } = appStore();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const menuItems = [
    { name: "Accessories", href: "/categories/accessories" },
    { name: "Books and Home Decor", href: "/categories/books-and-home-decor" },
    { name: "Bottomwear", href: "/categories/bottom-wear" },
    { name: "Footwear", href: "/categories/foot-wear" },
    { name: "Gadgets", href: "/categories/gadgets" },
    { name: "Headwear", href: "/categories/head-wear" },
    {
      name: "Personal Care Essentials",
      href: "/categories/personal-care-essentials",
    },
    { name: "Sports And Games", href: "/categories/sports-and-games" },
    { name: "Topwear", href: "/categories/top-wear" },
    { name: "Underwear", href: "/categories/under-wear" },
  ];

  return (
    <AnimatePresence mode="wait">
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="fixed mt-1 inset-0 z-50 bg-white/30 backdrop-blur-lg p-6"
        >
          <div className="mx-8 ">
            <Button
              onClick={toggleMenu}
              aria-label="Close menu"
              className="bg-transparent shadow-none p-0 h-auto  hover:bg-transparent hover:opacity-70 transition-opacity hover:cursor-pointer text-md text-black  mb-4 font-normal"
            >
              Close
            </Button>
            <div className="w-full bg-black h-px mb-3" />
            <Link
              href="/categories/shop-all"
              className="text-lg font-medium hover:opacity-70 transition-opacity cursor-pointer sm:hidden "
            >
              Shop All
            </Link>
            <p className="text-sm mb-6 mt-4">Categories</p>
            <ul className="space-y-4 inline-block ">
              {menuItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{
                    duration: 0.3,
                    ease: "circInOut",
                    delay: index * 0.05,
                  }}
                  onClick={toggleMenu}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="text-lg font-medium hover:opacity-70 transition-opacity cursor-pointer"
                  style={{
                    filter:
                      hoveredIndex !== null && hoveredIndex !== index
                        ? "blur(0.8px)"
                        : "none",
                    transition: "filter 1s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <Link href={item.href}>{item.name}</Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
