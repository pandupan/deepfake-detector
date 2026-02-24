"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiZap } from "react-icons/fi";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-3 left-0 right-0 z-50 transition-all duration-300
        /* ➊ exact glass shape you showed */
        mx-4 mt-4 px-6 py-3
        rounded-2xl border
        ${
          scrolled
            ? "bg-black/10 backdrop-blur-xl border-white/20 shadow-lg"
            : "bg-white/5 backdrop-blur-md border-white/10"
        }
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* logo */}
        <div className="flex items-center gap-2">
          <FiZap className="text-accent text-xl" />
          <span className="font-black text-xl tracking-wide">
            Siliwangi Deepfake Detector
          </span>
        </div>

        {/* nav-links (desktop) */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="#" className="hover:text-accent transition">Home</Link>
          <Link href="/#definisi" className="hover:text-accent transition">Model AI</Link>
          <Link href="/#demo" className="hover:text-accent transition">Demo</Link>
        </nav>
      </div>
    </motion.header>
  );
}