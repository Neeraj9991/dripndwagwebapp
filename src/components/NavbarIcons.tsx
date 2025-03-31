"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CartModal from "./CartModal";

const NavbarIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const router = useRouter();

  const isLoggedIn = false; // Replace with real auth logic

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
    setIsProfileOpen(false);
  };

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsProfileOpen((prev) => !prev);
      setIsCartOpen(false);
    }
  };

  return (
    <div className="relative flex items-center gap-4 xl:gap-6">
      {/* Profile */}
      <Image
        src="/profile.png"
        alt="Profile"
        width={22}
        height={22}
        className="cursor-pointer"
        onClick={handleProfile}
      />
      {isProfileOpen && (
        <div className="absolute top-8 left-0 bg-white shadow-md p-3 rounded-md flex flex-col gap-2 z-20">
          <Link href="/profile" className="hover:text-blue-500">
            Profile
          </Link>
          <Link href="/logout" className="hover:text-red-500">
            Logout
          </Link>
        </div>
      )}

      {/* Notifications */}
      <Image
        src="/notification.png"
        alt="Notifications"
        width={22}
        height={22}
        className="cursor-pointer"
      />

      {/* Cart */}
      <div className="relative">
        <Image
          src="/cart.png"
          alt="Cart"
          width={22}
          height={22}
          className="cursor-pointer"
          onClick={toggleCart}
        />
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
          2
        </div>
      </div>

      {/* Cart Modal */}
      {isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} />}
    </div>
  );
};

export default NavbarIcons;
