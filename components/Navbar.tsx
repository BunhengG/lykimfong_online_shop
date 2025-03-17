
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === "/product/[id]") {
      return pathname.startsWith("/product/");
    }
    return pathname === path; 
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "bg-gradient-to-b from-black/80 to-black/30 py-2" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-white font-bold uppercase">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: isScrolled ? 0.8 : 1 }}
            transition={{ duration: 0.3 }}
            className="lg:w-auto w-40"
          >
            <Image
              width={200}
              height={200}
              src="/logo.png"
              alt="Siren Shop Logo"
              className="object-cover p-4"
            />
          </motion.div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 ml-auto">
          <Link
            href="/"
            className={`text-lg font-medium uppercase hover:underline ${
              isActive("/") ? "text-white underline" : "text-gray-400"
            }`}
          >
            ទំព័រដើម
          </Link>
          <Link
            href="/productList"
            className={`text-lg font-medium uppercase hover:underline ${
              isActive("/productList") || isActive("/product/[id]")
                ? "text-white underline"
                : "text-gray-400"
            }`}
          >
            ផលិតផល
          </Link>
          <Link
            href="#"
            className={`text-lg font-medium uppercase hover:underline ${
              isActive("/contact") ? "text-white underline" : "text-gray-400"
            }`}
          >
            ទំនាក់ទំនង
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={28} color="white" /> : <FiMenu size={28} color="white" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 bg-gradient-to-b from-black/80 to-black/30 text-center py-8">
          <Link
            href="/"
            className={`text-lg font-medium uppercase hover:underline ${
              isActive("/") ? "text-white underline" : "text-gray-400"
            }`}
            onClick={() => setIsOpen(false)}
          >
            ទំព័រដើម
          </Link>
          <Link
            href="/productList"
            className={`text-lg font-medium uppercase hover:underline ${
              isActive("/productList") || isActive("/product/[id]")
                ? "text-white underline"
                : "text-gray-400"
            }`}
            onClick={() => setIsOpen(false)}
          >
            ផលិតផល
          </Link>
          <Link
            href="#"
            className={`text-lg font-medium uppercase hover:underline ${
              isActive("/contact") ? "text-white underline" : "text-gray-400"
            }`}
            onClick={() => setIsOpen(false)}
          >
            ទំនាក់ទំនង
          </Link>
        </div>
      )}
    </motion.nav>
  );
}
