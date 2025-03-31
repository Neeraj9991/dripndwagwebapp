"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const animatedWords = ["obsessed", "loyal", "inspired", "loving it", "raving"];

const testimonials = [
  {
    name: "Aarav Patel",
    image: "/testimonials/user1.avif",
    product: "Anime T-Shirt",
    rating: 5,
    comment: "Quality exceeded my expectations. Fits perfectly and looks dope!",
  },
  {
    name: "Meera Sharma",
    image: "/testimonials/user2.avif",
    product: "Oversized Hoodie",
    rating: 4,
    comment: "Super comfy and cozy. Perfect for winter anime binges!",
  },
  {
    name: "Rohit Das",
    image: "/testimonials/user3.avif",
    product: "Graphic Tee",
    rating: 5,
    comment: "Design is 🔥 and the print quality is top-tier!",
  },
];

export default function Testimonials() {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTitleIndex((prev) => (prev + 1) % animatedWords.length);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [titleIndex]);

  return (
    <section className="relative w-full bg-gray-100 py-20 md:py-32 overflow-hidden text-center">
      <div className="container mx-auto px-4">
        {/* Animated Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          Our customers are{" "}
          <span className="relative inline-block h-[1.2em] align-middle overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={animatedWords[titleIndex]}
                className="inline-block min-w-max"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {animatedWords[titleIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
          .
        </h2>

        <p className="text-muted-foreground text-lg md:text-xl mt-4 max-w-2xl mx-auto">
          Join thousands who’ve already made the switch to style, comfort and
          quality. Your wardrobe deserves the upgrade.
        </p>

        {/* Testimonial Carousel */}
        <div className="mt-16 overflow-hidden relative">
          <motion.div
            className="flex gap-6 px-4 sm:px-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={index}
                className="min-w-[300px] max-w-[300px] bg-white border border-gray-200 shadow-md rounded-xl p-6 flex-shrink-0 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  <div className="text-left">
                    <h4 className="font-semibold text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {testimonial.product}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 mb-2 text-yellow-500">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-sm text-gray-700 italic">
                  "{testimonial.comment}"
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
