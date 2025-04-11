import Link from "next/link";
import React from "react";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import {
  SiMastercard,
  SiVisa,
  SiGooglepay,
  SiRazorpay,
  SiFlipkart,
  SiAmazon,
} from "react-icons/si";
import { wixClientServer } from "@/lib/wixClientServer";

const Footer = async () => {
  // Fetch categories from Wix
  const wixClient = await wixClientServer();
  const { items: categories } = await wixClient.collections
    .queryCollections()
    .limit(6)
    .find();

  return (
    <footer className="mt-5 bg-neutral-950 text-neutral-100 px-4 sm:px-8 lg:px-16 py-16 border-t border-neutral-800">
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
        {/* Brand Column */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold tracking-tight">DripnDwag</h3>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Premium streetwear and urban fashion for the bold and expressive.
          </p>

          {/* Social Media Links */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-300 mb-2">
              Follow us
            </h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/dwagcreation"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-neutral-400 hover:text-white transition-colors duration-300"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/Dwag"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-neutral-400 hover:text-white transition-colors duration-300"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/918058362686"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-neutral-400 hover:text-white transition-colors duration-300"
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Marketplace Links */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-300 mb-2">
              Find us on
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.amazon.in/s?k=DWAG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors duration-300 text-sm"
                >
                  <SiAmazon className="w-4 h-4" />
                  Shop on Amazon
                </a>
              </li>
              <li>
                <a
                  href="https://www.flipkart.com/search?q=DWAG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors duration-300 text-sm"
                >
                  <SiFlipkart className="w-4 h-4" />
                  Shop on Flipkart
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Links - Dynamic Categories */}
        <div>
          <h4 className="text-lg font-semibold mb-6 uppercase tracking-wider">
            Shop
          </h4>
          <ul className="space-y-3">
            {categories.map((category) => (
              <li key={category._id}>
                <Link
                  href={`/list?cat=${category.slug}`}
                  className="text-neutral-400 hover:text-white transition-colors duration-300 text-sm"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-lg font-semibold mb-6 uppercase tracking-wider">
            Company
          </h4>
          <ul className="space-y-3">
            <li>
              <Link
                href="/about"
                className="text-neutral-400 hover:text-white transition-colors duration-300 text-sm"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-neutral-400 hover:text-white transition-colors duration-300 text-sm"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-6 uppercase tracking-wider">
            Contact
          </h4>
          <address className="not-italic space-y-3 text-sm text-neutral-400">
            <p className="hover:text-white transition-colors duration-300">
              D139 Ground Floor, Abul Fazal,
              <br />
              Jamia Nagar, New Delhi 110025
            </p>
            <p>
              <a
                href="https://wa.me/918058362686"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300"
              >
                +91 8058362686
              </a>
            </p>
            <p>
              <a
                href="mailto:dwag.care@gmail.com"
                className="hover:text-white transition-colors duration-300"
              >
                dwag.care@gmail.com
              </a>
            </p>
          </address>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-800 my-12 max-w-7xl mx-auto"></div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className="text-neutral-500 text-xs">
            &copy; {new Date().getFullYear()} DripnDwag. All rights reserved.
          </p>

          {/* Payment Methods */}
          <div className="flex items-center gap-4 text-neutral-500">
            <SiVisa className="w-8 h-8 hover:text-white transition-colors duration-300" />
            <SiMastercard className="w-8 h-8 hover:text-white transition-colors duration-300" />
            <SiGooglepay className="w-8 h-8 hover:text-white transition-colors duration-300" />
            <SiRazorpay className="w-8 h-8 hover:text-white transition-colors duration-300" />
          </div>

          {/* Legal Links */}
          {/* <div className="flex gap-6 text-xs">
            <Link
              href="/privacy"
              className="text-neutral-500 hover:text-white transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-neutral-500 hover:text-white transition-colors duration-300"
            >
              Terms of Service
            </Link>
            <Link
              href="/refunds"
              className="text-neutral-500 hover:text-white transition-colors duration-300"
            >
              Refund Policy
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
