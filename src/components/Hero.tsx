"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Particles } from "./Particles";

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <div
      ref={ref}
      className="relative h-[500px] w-full overflow-hidden bg-white flex items-center justify-center px-4 sm:px-8 md:px-16"
    >
      {/* Particles */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={550}
        size={2.0}
        color="#999999"
        ease={60}
        staticity={40}
        refresh
      />

      {/* Hero Content */}

      <motion.div
        style={{ y, opacity }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center max-w-3xl mx-auto"
      >
        <div className="backdrop-blur-xl bg-white/70 border border-white/30 shadow-xl ring-1 ring-white/20 rounded-2xl px-6 py-10 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-black drop-shadow-md">
            Elevate Your Everyday Style
          </h1>
          <p className="text-lg sm:text-xl text-gray-800 mb-6 drop-shadow-sm">
            From bold graphics to everyday essentials — shop premium T-shirts
            that match your vibe and stand out from the crowd.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 bg-black text-white px-6 py-3 rounded-full text-base font-semibold shadow-lg hover:bg-gray-800 transition"
          >
            Shop Now
          </motion.button>
        </div>
      </motion.div>

      {/* Scroll Cue Arrow */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-6 border-b-2 border-r-2 border-gray-500 rotate-45" />
      </motion.div>
    </div>
  );
};

export default Hero;
