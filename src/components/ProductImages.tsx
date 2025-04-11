"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProductImages = ({ items }: { items: any[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image - Portrait Aspect Ratio */}
      <div
        className="relative w-full overflow-hidden rounded-xl bg-gray-100"
        style={{ aspectRatio: "2/3", maxHeight: "500px" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full w-full"
          >
            <Image
              src={
                items[currentIndex]?.image?.url || "/placeholder-product.jpg"
              }
              alt={`Product image ${currentIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              className="object-contain"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnail Gallery - Portrait Aspect Ratio */}
      <div className="grid grid-cols-4 gap-3">
        {items.map((item, index) => (
          <motion.div
            key={item._id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative overflow-hidden rounded-lg cursor-pointer border-2 transition-all ${
              currentIndex === index
                ? "border-lama"
                : "border-transparent hover:border-gray-300"
            }`}
            style={{ aspectRatio: "2/3" }}
            onClick={() => setCurrentIndex(index)}
          >
            <Image
              src={item.image?.url || "/placeholder-thumbnail.jpg"}
              alt={`Thumbnail ${index + 1}`}
              fill
              sizes="(max-width: 768px) 25vw, 15vw"
              className="object-contain"
            />
            {currentIndex === index && (
              <div className="absolute inset-0 bg-black/10" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
