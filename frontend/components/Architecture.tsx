// components/Architecture.tsx
"use client";
import { motion } from "framer-motion";

export default function Architecture() {
  const steps = [
    { title: "Input", desc: "Gambar beresolusi 256×256 pixel" },
    { title: "EfficientNet-B0", desc: "Ekstraksi fitur otomatis (pre-trained ImageNet)" },
    { title: "SE-Block", desc: "Channel attention → fokus pada artefak halus" },
    { title: "Classification", desc: "Output probabilitas Real vs Fake" },
  ];

  return (
    <section id="architecture" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
      >
        Arsitektur Model 
      </motion.h2>

      <div className="relative flex flex-col md:flex-row justify-between items-center gap-6">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="glass p-6 w-52 text-center cursor-pointer"
          >
            <div className="text-accent text-3xl font-black mb-2">{i + 1}</div>
            <h3 className="font-semibold text-lg">{s.title}</h3>
            <p className="text-sm text-gray-300">{s.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12 glass p-6"
      >
        <h3 className="text-xl font-semibold mb-2">Kenapa SE-Block?</h3>
        <p className="text-gray-300">
          SE-Block memperbolehkan model untuk <strong className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">otomatisasi weighting channel</strong> menekan channel yang kurang informatif dan memperkuat channel yang mengandung artefak khas deepfake.
        </p>
      </motion.div>
    </section>
  );
}