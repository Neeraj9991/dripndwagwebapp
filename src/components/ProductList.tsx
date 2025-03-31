"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Ninja Oversized Tee",
    price: "₹899",
    description: "Stealth-inspired oversized tee with katana kanji graphic.",
    frontImage: "/products/1.jpg",
    backImage: "/products/2.jpg",
    sizes: ["S", "M", "L", "XL"],
    stock: 12,
    tag: "HOT",
  },
  {
    id: 2,
    name: "Cyber Ronin Tee",
    price: "₹999",
    description: "Futuristic ronin design with glitch accents.",
    frontImage: "/products/4.png",
    backImage: "/products/3.jpg",
    sizes: ["M", "L", "XL"],
    stock: 0,
    tag: "",
  },
  {
    id: 3,
    name: "Akira Kanji Tee",
    price: "₹949",
    description: "Classic red kanji with street-style oversize fit.",
    frontImage: "/products/5.jpg",
    backImage: "/products/6.jpg",
    sizes: ["S", "L"],
    stock: 7,
    tag: null,
  },
  {
    id: 4,
    name: "Akira Kanji Tee",
    price: "₹949",
    description: "Classic red kanji with street-style oversize fit.",
    frontImage: "/products/7.jpg",
    backImage: "/products/8.jpg",
    sizes: ["S", "L"],
    stock: 7,
    tag: null,
  },
];

const ProductList = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showBack, setShowBack] = useState(false);

  const closeModal = () => {
    setSelectedIndex(null);
    setShowBack(false);
  };

  const currentProduct =
    selectedIndex !== null ? products[selectedIndex] : null;

  const nextProduct = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev! + 1) % products.length);
      setShowBack(false);
    }
  };

  const prevProduct = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) =>
        prev! === 0 ? products.length - 1 : prev! - 1
      );
      setShowBack(false);
    }
  };

  return (
    <div className="w-full px-4 sm:px-8 md:px-16 py-10">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Featured Products</h2>

      <div className="flex gap-6 overflow-x-auto scroll-smooth pb-2">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="relative w-[200px] sm:w-[220px] flex-shrink-0 group"
          >
            <div
              className="relative h-[300px] w-full overflow-hidden rounded-xl shadow-md cursor-pointer"
              onClick={() => setSelectedIndex(index)}
            >
              {product.tag && (
                <span className="absolute top-2 left-2 z-10 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-semibold uppercase tracking-wide">
                  {product.tag}
                </span>
              )}

              <Image
                src={product.frontImage}
                alt={product.name}
                fill
                className="object-cover group-hover:opacity-0 transition duration-500 ease-in-out"
              />
              <Image
                src={product.backImage}
                alt={product.name + " Back"}
                fill
                className="object-cover opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out"
              />
            </div>

            <div className="mt-3 text-center">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-gray-800 font-semibold">{product.price}</p>
              <button className="mt-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}

        {/* View All Card */}
        <div className="w-[200px] sm:w-[220px] flex-shrink-0 flex items-center justify-center border border-gray-300 rounded-xl shadow-md cursor-pointer hover:bg-gray-100 transition">
          <Link
            href="/shop"
            className="text-center w-full h-full flex flex-col items-center justify-center px-4 py-6"
          >
            <span className="text-lg font-semibold">View All</span>
            <span className="text-sm text-gray-500 mt-1">
              Browse Full Collection
            </span>

            {/* Bold Centered Arrow */}
            <div className="mt-4 flex justify-center">
              <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition">
                <span className="text-2xl font-bold">→</span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {currentProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white max-w-2xl w-full rounded-lg p-6 flex gap-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Section */}
              <div className="relative w-1/2 min-h-[350px] overflow-hidden rounded-lg group cursor-zoom-in">
                <Image
                  src={
                    showBack
                      ? currentProduct.backImage
                      : currentProduct.frontImage
                  }
                  alt={currentProduct.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <button
                  onClick={() => setShowBack(!showBack)}
                  className="absolute bottom-2 right-2 bg-black text-white px-3 py-1 text-xs rounded-full"
                >
                  {showBack ? "View Front" : "View Back"}
                </button>
              </div>

              {/* Details Section */}
              <div className="flex flex-col justify-between w-1/2 text-black">
                <div>
                  <h3 className="text-2xl font-bold">{currentProduct.name}</h3>
                  <p className="text-lg text-gray-700 font-semibold">
                    {currentProduct.price}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    {currentProduct.description}
                  </p>

                  {/* Size Options */}
                  <div className="mt-4">
                    <p className="font-medium mb-1">Size</p>
                    <div className="flex gap-2">
                      {currentProduct.sizes.map((size) => (
                        <span
                          key={size}
                          className="px-3 py-1 border rounded-full text-sm cursor-pointer hover:bg-black hover:text-white transition"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stock Badge */}
                  {currentProduct.stock > 0 ? (
                    <span className="inline-block mt-4 text-sm text-green-600 font-medium">
                      In Stock ({currentProduct.stock} left)
                    </span>
                  ) : (
                    <span className="inline-block mt-4 text-sm text-red-600 font-medium">
                      Out of Stock
                    </span>
                  )}
                </div>

                <button className="mt-4 bg-black text-white px-4 py-2 rounded-full font-medium hover:bg-gray-800 transition">
                  Add to Cart
                </button>
              </div>

              {/* Arrows */}
              <button
                onClick={prevProduct}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-gray-100"
              >
                ◀
              </button>
              <button
                onClick={nextProduct}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-gray-100"
              >
                ▶
              </button>

              {/* Close */}
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-black text-xl"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductList;
