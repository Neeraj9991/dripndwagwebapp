"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useWixClient } from "@/hooks/useWixClient";

type Slide = {
  _id: string;
  title: string;
  description: string;
  img: string;
  url: string;
  bg: string;
};

const Slider = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [current, setCurrent] = useState(0);
  const wixClient = useWixClient();

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const result = await wixClient.items.dataItems
          .queryDataItems({ dataCollectionId: "Sliders" })
          .find();

        const items = result.items.map((item: any) => ({
          _id: item._id,
          title: item.data.title,
          description: item.data.description,
          img: item.data.img,
          url: item.data.url ?? "/",
          bg: item.data.bg ?? "bg-white",
        }));

        setSlides(items);
      } catch (err) {
        console.error("❌ Failed to fetch sliders:", err);
      }
    };

    fetchSlides();
  }, [wixClient]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [slides]);

  if (!slides.length) return null;

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
