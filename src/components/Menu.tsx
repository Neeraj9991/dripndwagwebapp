"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Menu = () => {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  const navLinks = [
    { name: "Homepage", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Deals", href: "/deals" },
    { name: "About", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Logout", href: "/logout" },
    { name: "Cart", href: "/cart" },
  ];

  return (
    <div className="relative z-30">
      <Image
        src="/menu.png"
        alt="Menu"
        width={28}
        height={28}
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />

      <div
        className={`fixed left-0 top-20 w-full h-[calc(100vh-80px)] bg-black text-white flex flex-col items-center justify-center gap-8 text-xl transition-all duration-500 ease-in-out transform ${
          open
            ? "translate-y-0 opacity-100"
            : "-translate-y-5 opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link) => (
          <Link key={link.name} href={link.href} onClick={handleLinkClick}>
            <div className="group relative cursor-pointer">
              {link.name}
              <span className="block h-0.5 w-full bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out mt-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Menu;
