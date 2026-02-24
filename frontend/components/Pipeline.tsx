// components/Pipeline.tsx
"use client";
import { motion } from "framer-motion";

export default function Pipeline() {
  const pipelines = [
    { phase: "1. Dataset", detail: "10.000 gambar (50 % real, 50 % fake) di-resize 256×256 px." },
    { phase: "2. Augmentasi", detail: "Flip, rotasi kecil, brightness → hindari overfitting." },
    { phase: "3. Training", detail: "20 epoch, Adam lr=1e-3, early-stop berdasarkan val-loss." },
    { phase: "4. Evaluasi", detail: "Accuracy 89 %, ROC-AUC 98 %, IoU 78 %." },
  ];

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
      >
        Alur Penelitian
      </motion.h2>

      <div className="space-y-6">
        {pipelines.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="glass p-5 flex items-center gap-4 cursor-pointer"
          >
            <div className="text-accent text-2xl font-black w-10">{i + 1}</div>
            <div>
              <h3 className="font-semibold text-lg">{p.phase}</h3>
              <p className="text-gray-300">{p.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}