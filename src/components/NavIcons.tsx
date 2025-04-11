"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CartModal from "./CartModal";
import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";
import { useCartStore } from "@/hooks/useCartStore";

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const pathName = usePathname();
  const cartRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const wixClient = useWixClient();
  const isLoggedIn = wixClient.auth.loggedIn();

  const { cart, counter, getCart } = useCartStore();

  // Close modals when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sync cart on mount
  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    setIsLoading(false);
    setIsProfileOpen(false);
    router.push(logoutUrl);
  };

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      {/* Profile Icon */}
      <div ref={profileRef}>
        <Image
          src="/profile.png"
          alt="Profile"
          width={22}
          height={22}
          className="cursor-pointer hover:opacity-80 transition"
          onClick={handleProfile}
        />

        {/* Profile Dropdown */}
        {isProfileOpen && (
          <div className="absolute top-12 left-0 bg-white border rounded-lg shadow-lg text-sm p-4 z-30">
            <Link
              href="/profile"
              className="block hover:text-lama transition"
              onClick={() => setIsProfileOpen(false)}
            >
              Profile
            </Link>
            <div
              className="mt-2 cursor-pointer text-red-500 hover:text-red-600 transition"
              onClick={handleLogout}
            >
              {isLoading ? "Logging out..." : "Logout"}
            </div>
          </div>
        )}
      </div>

      {/* Cart Icon */}
      <div ref={cartRef} className="relative">
        <div
          className="relative cursor-pointer"
          onClick={() => setIsCartOpen((prev) => !prev)}
        >
          <Image
            src="/cart.png"
            alt="Cart"
            width={22}
            height={22}
            className="hover:opacity-80 transition"
          />
          {counter > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-lama rounded-full text-white text-xs flex items-center justify-center font-semibold">
              {counter}
            </div>
          )}
        </div>

        {/* Cart Modal */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setIsCartOpen(false)}
            />
            <div className="relative w-full max-w-md h-full bg-white shadow-xl">
              <CartModal onClose={() => setIsCartOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavIcons;
