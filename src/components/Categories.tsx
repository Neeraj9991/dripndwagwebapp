"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";

const categories = [
  {
    name: "Anime T-Shirts",
    slug: "anime-tshirts",
    image: "/products/1.jpg",
  },
  {
    name: "Oversized T-Shirts",
    slug: "oversized-tshirts",
    image: "/products/3.jpg",
  },
  {
    name: "Graphic Tees",
    slug: "graphic-tees",
    image: "/products/8.jpg",
  },
  {
    name: "Hoodies",
    slug: "hoodies",
    image: "/products/6.jpg",
  },
];

const CategorySection = () => {
  return (
    <section className="w-full px-4 sm:px-8 md:px-16 py-14">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8">Shop by Category</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/collection/${category.slug}`}
            className="group relative block overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all"
          >
            <div className="relative h-[300px] w-full">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all" />
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 text-center">
              <h3 className="text-white text-lg font-semibold tracking-wide group-hover:tracking-wider transition-all">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
