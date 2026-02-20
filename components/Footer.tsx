"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "motion/react";

export default function Footer() {
  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0.75, 0.95], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);
  const y = useTransform(scrollYProgress, [0.75, 1], [100, 0]);
  const rotate = useTransform(scrollYProgress, [0.75, 1], [-5, 0]);
  const blur = useTransform(scrollYProgress, [0.75, 0.95], [10, 0]);

  const blurFilter = useMotionTemplate`blur(${blur}px)`;

  return (
    <footer className="relative bg-linear-to-r from-black via-zinc-900 to-black text-white min-h-[40vh] flex items-center justify-center p-4 sm:p-8 overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0  bg-linear-to-r from-white/5 to-white/10"
        style={{ opacity: blurFilter }}
      />

      {/* Decorative circles - adjusted for mobile */}
      <motion.div
        className="absolute -top-10 -left-10 sm:-top-20 sm:-left-20 w-32 h-32 sm:w-64 sm:h-64 bg-white/5 rounded-full blur-2xl sm:blur-3xl"
        style={{ scale, opacity }}
      />
      <motion.div
        className="absolute -bottom-10 -right-10 sm:-bottom-20 sm:-right-20 w-32 h-32 sm:w-64 sm:h-64 bg-white/5 rounded-full blur-2xl sm:blur-3xl"
        style={{ scale, opacity }}
      />

      {/* Main text with layered animations */}
      <motion.div
        style={{ y, rotate, opacity }}
        className="relative z-10 text-center px-4"
      >
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold bg-linear-to-r from-white via-gray-300 to-white bg-clip-text text-transparent leading-tight"
          style={{
            scale,
            filter: blurFilter,
          }}
        >
          Shop Luvra
        </motion.h1>

        {/* Subtle underline animation */}
        <motion.div
          className="h-0.5 sm:h-1 bg-linear-to-r from-transparent via-white to-transparent mt-2 sm:mt-4 mx-auto max-w-[80%]"
          style={{
            scaleX: useTransform(scrollYProgress, [0.8, 1], [0, 1]),
          }}
        />
      </motion.div>

      {/* Additional text elements */}
      <motion.p
        className="absolute bottom-4 sm:bottom-8 text-xs sm:text-sm text-gray-400 text-center px-4"
        style={{
          opacity: useTransform(scrollYProgress, [0.85, 1], [0, 0.7]),
          y: useTransform(scrollYProgress, [0.85, 1], [20, 0]),
        }}
      >
        Discover luxury reimagined
      </motion.p>
    </footer>
  );
}
