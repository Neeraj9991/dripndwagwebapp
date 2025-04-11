"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Slide = {
  _id: string;
  title: string;
  description: string;
  img: string;
  url: string;
  bg: string;
};

const staticSlides: Slide[] = [
  {
    _id: "1",
    title: "Streetwear Drop 2025",
    description: "Bold • Minimal • Oversized",
    img: "/images/1.png", // Replace with your public image path
    url: "/list?cat=graphic-tees",
    bg: "bg-white",
  },
  {
    _id: "2",
    title: "Anime Vibes",
    description: "Unleash Your Inner Hero",
    img: "/images/2.png",
    url: "/list?cat=anime-t-shirt",
    bg: "bg-black",
  },
  {
    _id: "3",
    title: "Drip Essentials",
    description: "Breathable & Stylish Tees",
    img: "/images/3.png",
    url: "/list?cat=featured",
    bg: "bg-yellow-50",
  },
];

const Slider = () => {
  const [slides] = useState<Slide[]>(staticSlides);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [slides]);

  return (
    <div className="relative h-[80vh] w-full overflow-hidden bg-neutral-900">
      <div
        className="flex transition-transform duration-500 ease-out h-full w-full"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide._id}
            className="relative w-screen h-full flex-shrink-0 group"
          >
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0">
              <Image
                src={slide.img}
                alt={slide.title}
                fill
                className="object-cover w-full h-full transform transition-transform duration-1000 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            </div>

            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col items-start justify-center text-left px-8 md:px-16 lg:px-24 xl:px-32 z-20 space-y-6">
              <p className="text-white/80 text-lg md:text-xl font-light tracking-wide uppercase mb-2 animate-fade-in">
                {slide.description}
              </p>
              <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-2xl drop-shadow-2xl animate-slide-up">
                {slide.title}
              </h1>
              <Link href={slide.url} className="animate-fade-in-up">
                <button className="bg-transparent border-2 border-white/30 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-white hover:text-black transition-all duration-300 hover:border-white hover:scale-105">
                  Discover Collection
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1 transition-all duration-500 ease-out ${
              current === index ? "w-8 bg-white" : "w-4 bg-white/40"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
