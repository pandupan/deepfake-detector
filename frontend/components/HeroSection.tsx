// components/Hero.tsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import ParticlesBG from "./ParticlesBG";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden">
      {/* Background partikel bergerak */}
      <ParticlesBG />

      {/* Glow ornamen animasi */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-3xl"
        />
      </div>

      {/* Konten tengah */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-3xl mx-auto"
      >
        {/* Heading dengan animasi ketik */}
        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          Deteksi Deepfake dengan AI
        </motion.h1>

        {/* Sub-headline fade-in */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-4 text-lg sm:text-xl text-gray-200 font-bold"
        >
          EfficientNet-B0 &nbsp;•&nbsp;&nbsp; SE-Block &nbsp;•&nbsp;&nbsp; Real-time
        </motion.p>

        {/* CTA buttons dengan hover glow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/#architecture"
            className="px-6 py-3 glass hover:border-accent transition rounded-lg text-center relative group"
          >
            <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity" />
            Pelajari Arsitektur
          </Link>
          <Link
            href="/#demo"
            className="px-6 py-3 glass hover:border-accent transition rounded-lg text-center relative group"
          >
            <span className="absolute inset-0 rounded-lg bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            Coba Hasil Riset
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}