// components/WhatIsDeepfake.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function WhatIsDeepfake() {
  return (
    <section id="definisi" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Ilustrasi kiri */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="glass p-4 rounded-xl">
            <Image
              src="/images/ilustrator-1.jpg" // <-- ganti foto
              alt="Ilustrasi Deepfake"
              width={400}
              height={250}
              className="rounded-lg object-cover"
            />
          </div>
        </motion.div>

        {/* Penjelasan kanan */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Apa itu Deepfake?</h2>
          <p className="text-gray-300 text-justify">
            Deepfake adalah teknologi <strong className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">AI-generated</strong> yang menyisipkan wajah (atau suara) seseorang ke konten yang bukan miliknya. Proses ini biasanya menggunakan <strong className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">GAN</strong> (Generative Adversarial Network) sehingga menghasilkan video yang tampak sangat realistis.
          </p>
          <p className="text-gray-300 mt-4 text-justify">
            Dampaknya bisa positif (efek film, dubbing) namun juga berbahaya (misinformasi, reputasi korban). Oleh karena itu, <strong className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">deteksi deepfake</strong> menjadi krusial.
          </p>
        </motion.div>
      </div>
    </section>
  );
}