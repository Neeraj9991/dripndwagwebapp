"use client";

import React, { useState } from "react";
import Image from "next/image";

const allProducts = [
  {
    id: 1,
    name: "Anime Oversized Tee",
    category: "Anime",
    price: 899,
    image: "/products/1.jpg",
  },
  {
    id: 2,
    name: "Cyberpunk Graphic Tee",
    category: "Graphic",
    price: 999,
    image: "/products/2.jpg",
  },
  {
    id: 3,
    name: "Minimal Tee",
    category: "Basic",
    price: 699,
    image: "/products/3.jpg",
  },
  {
    id: 4,
    name: "Oversized Hoodie",
    category: "Oversized",
    price: 1499,
    image: "/products/7.jpg",
  },
  // Add more products...
];

const categories = ["All", "Anime", "Graphic", "Basic", "Oversized"];

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(2000);

  const filteredProducts = allProducts.filter((product) => {
    const inCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const inPrice = product.price <= priceRange;
    return inCategory && inPrice;
  });

  return (
    <div className="min-h-screen px-4 sm:px-8 md:px-16 py-10 bg-white text-gray-800">
      <h1 className="text-3xl font-bold mb-8 text-center">Shop All Products</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full border text-sm ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Price Filter */}
        <div className="w-full md:w-72">
          <label className="block text-sm font-medium mb-2">
            Max Price: ₹{priceRange}
          </label>
          <input
            type="range"
            min="500"
            max="2000"
            step="100"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={500}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="text-base font-semibold mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">₹{product.price}</p>
                <button className="w-full bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No products match your filter.
          </p>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
