import Link from "next/link";
import Image from "next/image";
import React from "react";
import Menu from "./Menu";
import Searchbar from "./Searchbar";
import NavbarIcons from "./NavbarIcons";

const Navbar = () => {
  return (
    <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative bg-white shadow-sm">
      {/* Mobile Navbar */}
      <div className="h-full flex items-center justify-between md:hidden">
        <Link href="/" className="text-2xl font-semibold tracking-wide">
          Drip n Dwag
        </Link>
        <Menu />
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between h-full">
        {/* Left - Logo + Navigation */}
        <div className="w-1/3 xl:w-1/2 flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo1.png"
              alt="Drip n Dwag Logo"
              width={100}
              height={30}
            />
           
          </Link>

          {/* Navigation Links */}
          <nav className="hidden xl:flex gap-6 text-sm font-medium text-gray-700">
            <Link href="/" className="hover:text-black">
              Home
            </Link>
            <Link href="/shop" className="hover:text-black">
              Shop
            </Link>
            <Link href="/deals" className="hover:text-black">
              Deals
            </Link>
            <Link href="/about" className="hover:text-black">
              About
            </Link>
            <Link href="/contact" className="hover:text-black">
              Contact
            </Link>
          </nav>
        </div>

        {/* Right - Searchbar & Icons */}
        <div className="w-2/3 xl:w-1/2 flex items-center justify-end gap-6">
          <Searchbar />
          <NavbarIcons />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
