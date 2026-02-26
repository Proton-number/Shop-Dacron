"use client";
import { Button } from "@/components/ui/button";
import VerticalCutReveal from "@/components/ui/VerticalCutReveal";
import { motion } from "motion/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col space-y-8 min-h-screen items-center justify-center font-sans">
      <VerticalCutReveal
        splitBy="characters"
        staggerDuration={0.025}
        staggerFrom="first"
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 21,
        }}
      >
        Luvra
      </VerticalCutReveal>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 21,
          delay: 0.9,
        }}
        className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light"
      >
        Where every piece tells your story.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 21,
          delay: 1.5,
        }}
        className="text-sm md:text-base text-gray-500 dark:text-gray-400 tracking-widest uppercase"
      >
        Curated collections · Timeless finds
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 21,
          delay: 2.1,
        }}
        className="mt-4"
      >
        <Link href={"/categories/shop-all"}>
          <Button size="lg" className="px-8 py-6 text-base">
            Get Started
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
