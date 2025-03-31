"use client";

import Link from "next/link";
import React from "react";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { SiMastercard, SiVisa, SiGooglepay, SiRazorpay } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-white px-4 sm:px-8 md:px-16 py-12">
      {/* Top Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
        {/* Address */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Address</h4>
          <p className="text-sm mb-2">123 Drip Street, Mumbai, India</p>
          <p className="text-sm mb-2">Email: contact@dripndwag.com</p>
          <p className="text-sm mb-4">Phone: +91 98765 43210</p>
          <div className="flex gap-4 text-xl">
            <FaInstagram />
            <FaFacebook />
            <FaTwitter />
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Company</h4>
          <ul className="text-sm space-y-2">
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Shop */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Shop</h4>
          <ul className="text-sm space-y-2">
            <li>
              <Link href="/collection/new-arrivals">New Arrivals</Link>
            </li>
            <li>
              <Link href="/collection/tshirts">T-Shirts</Link>
            </li>
            <li>
              <Link href="/collection/oversize-tshirts">Oversize T-Shirts</Link>
            </li>
            <li>
              <Link href="/collection/hoodies">Hoodies</Link>
            </li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Help</h4>
          <ul className="text-sm space-y-2">
            <li>
              <Link href="/support">Customer Service</Link>
            </li>
            <li>
              <Link href="/legal">Legal & Privacy</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="border-t border-zinc-700 pt-6 flex flex-col sm:flex-row justify-between items-center gap-6">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} DripnDwag. All rights reserved.
        </p>

        {/* Language & Currency */}
        <div className="flex items-center gap-4 text-sm">
          <select className="bg-zinc-800 text-white px-2 py-1 rounded">
            <option>English</option>
            <option>Hindi</option>
          </select>
          <select className="bg-zinc-800 text-white px-2 py-1 rounded">
            <option>INR ₹</option>
            <option>USD $</option>
          </select>
        </div>

        {/* Payment Icons */}
        <div className="flex items-center gap-4 text-2xl text-white">
          <SiVisa />
          <SiMastercard />
          <SiGooglepay />
          <SiRazorpay />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
