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
    <header className="mb-8 h-20 border-b border-gray-200 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-white sticky top-0 z-50">
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

            {/* NavIcons in mobile menu */}
            <div className="border-t border-gray-200 px-4 py-4 flex justify-center">
              <NavbarIcons />
            </div>
          </div>
        )}
      </div>

      {/* DESKTOP */}
      <div className="hidden md:flex items-center justify-between h-full">
        {/* Left - Logo + Navigation */}
        <div className="w-1/3 xl:w-1/2 flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Drip n Dwag Logo"
              width={100}
              height={40}
              className="object-contain"
            />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden xl:flex gap-8 text-base font-semibold text-gray-700">
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

        {/* Right - Searchbar & Icons */}
        <div className="w-2/3 xl:w-1/2 flex items-center justify-end gap-6">
          {/* Optional: <SearchBar /> */}
          <NavbarIcons />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
