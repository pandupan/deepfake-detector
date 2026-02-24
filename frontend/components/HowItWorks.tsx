"use client";
import { motion } from "framer-motion";
import { FiEye, FiCpu, FiShield } from "react-icons/fi";

const cards = [
  {
    icon: <FiEye />,
    title: "Mata AI Super-Tajam",
    desc: "Berbasis CNN dengan pretrained EfficientNet-B0 menelusuri artefak halus (alias artefak GAN) yang tak kasat mata.",
  },
  {
    icon: <FiCpu />,
    title: "Squeeze-and-Excitation",
    desc: "Blok SE sebagai attention mechanism memperkuat channel fitur ektrasi yang paling ‘curiga’ sebelum klasifikasi akhir.",
  },
  {
    icon: <FiShield />,
    title: "Tepat Cepat Akurat",
    desc: "Langsung amati raw-pixel—sehingga cepat & compatible semua format.",
  },
];

export default function HowItWorks() {
  return (
    <section id="cara" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
        >
          Cara Kerja Deteksi Kami
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 text-center"
            >
              <div className="text-3xl text-accent mb-4 flex justify-center">{c.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{c.title}</h3>
              <p className="text-gray-300 text-sm">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}