/* eslint-disable @typescript-eslint/no-explicit-any */
// app/demo/page.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiUploadCloud, FiCheckCircle, FiXCircle } from "react-icons/fi";

export default function Demo() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setResult(null);
    setPreview(URL.createObjectURL(f));
  };

  const onSubmit = async () => {
    if (!file) return;
    setLoading(true);
    const fd = new FormData();
    fd.append("file", file);
    const r = await fetch("http://127.0.0.1:8000/predict", { method: "POST", body: fd });
    const data = await r.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen px-6 py-24">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-8"
        >
          <h1 className="text-3xl font-bold mb-4">Uji Coba Deepfake Detector</h1>
          <p className="text-gray-300 mb-6">Upload foto wajah → model memprediksi Real vs Fake beserta confidence score.</p>

          <label htmlFor="up" className="cursor-pointer glass px-4 py-2 rounded-lg inline-flex items-center gap-2">
            <FiUploadCloud /> Pilih Gambar
          </label>
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" id="up" />

          {preview && (
            <div className="mt-4">
              <Image src={preview} alt="preview" width={300} height={300} className="rounded-xl object-cover" />
            </div>
          )}

          {file && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSubmit}
              disabled={loading}
              className="mt-4 bg-accent hover:bg-accent/80 px-4 py-2 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Menganalisis..." : "Prediksi"}
            </motion.button>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 glass p-4"
            >
              <div className={`flex items-center gap-3 ${result.prediction === "Fake" ? "text-red-400" : "text-green-400"}`}>
                {result.prediction === "Fake" ? <FiXCircle size={24} /> : <FiCheckCircle size={24} />}
                <div>
                  <p className="text-xl font-semibold">{result.prediction}</p>
                  <p className="text-sm text-gray-300">Confidence: {result.probability}</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 mt-2">Hasil diperoleh dengan arsitektur EfficientNet-B0 + SE-Block yang telah dilatih pada 10.000 gambar.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}