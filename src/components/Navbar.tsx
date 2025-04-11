"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

const NavbarIcons = dynamic(() => import("./NavIcons"), { ssr: false });

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="mb-8 h-20 border-b border-gray-200 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 bg-white sticky top-0 z-50">
      {/* MOBILE */}
      <div className="flex md:hidden items-center justify-between h-full relative">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Drip n Dwag"
            width={80}
            height={40}
            className="object-contain"
          />
        </Link>

        <div onClick={toggleMobileMenu} className="cursor-pointer">
          <Image src="/menu.png" alt="Menu" width={28} height={28} />
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-20 left-0 w-full bg-white border-t border-gray-200 shadow-md z-50 flex flex-col text-center text-base font-semibold text-gray-700">
            {["Home", "Shop", "About", "Contact"].map((text, i) => (
              <Link
                key={i}
                href={
                  text === "Shop"
                    ? "/list?cat=all-products"
                    : `/${text.toLowerCase()}`
                }
                className="py-4 hover:bg-gray-100 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {text}
              </Link>
            ))}

            <div className="border-t border-gray-200 px-4 py-4 flex justify-center">
              <NavbarIcons />
            </div>
          </div>
        )}
      </div>

      {/* DESKTOP */}
      <div className="hidden md:flex items-center justify-between h-full w-full">
        {/* Left: Logo & Nav */}
        <div className="flex items-center gap-8 min-w-0">
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo.png"
              alt="Drip n Dwag"
              width={90}
              height={40}
              className="object-contain"
            />
          </Link>

          <nav className="flex gap-6 text-sm xl:text-base font-semibold text-gray-700 flex-wrap">
            <Link href="/" className="hover:text-black transition">
              Home
            </Link>
            <Link
              href="/list?cat=all-products"
              className="hover:text-black transition"
            >
              Shop
            </Link>
            <Link href="/about" className="hover:text-black transition">
              About
            </Link>
            <Link href="/contact" className="hover:text-black transition">
              Contact
            </Link>
          </nav>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center justify-end gap-4 shrink-0">
          <NavbarIcons />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
