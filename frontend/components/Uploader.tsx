/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, ChangeEvent, DragEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FiUploadCloud,
  FiCheckCircle,
  FiXCircle,
  FiShield,
  FiImage,
  FiRotateCcw,
} from "react-icons/fi";

type Result = {
  filename: string;
  prediction: "Real" | "Deepfake";
  probability: string;
};

const hologramVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

export default function Uploader() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [err, setErr] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [inputKey, setInputKey] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ---------- Handlers ---------- */
  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setErr("");
    setProgress(0);
    setLoading(false);

    // bersihkan nilai input & fokus (mencegah dialog muncul lagi)
    if (inputRef.current) {
      inputRef.current.value = "";
      (document.activeElement as HTMLElement | null)?.blur?.();
    }
    setInputKey((k) => k + 1);
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0];
    if (f) validateAndSet(f);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) validateAndSet(f);
  };

  const validateAndSet = (f: File) => {
    if (!f.type.startsWith("image/")) {
      setErr("Format harus JPG / PNG");
      return;
    }
    if (f.size > 10_000_000) {
      setErr("Ukuran maksimal 10 MB");
      return;
    }
    setResult(null);
    setProgress(0);
    setErr("");
    setLoading(false);
    setFile(f);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(f);
  };

  const submit = async () => {
    if (!file) return setErr("Pilih gambar dulu");
    setLoading(true);
    setErr("");
    setProgress(0);

    const tick = setInterval(() => {
      setProgress((p) => (p >= 90 ? 90 : p + 10));
    }, 150);

    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) throw new Error(`Server mengembalikan status ${res.status}`);
      const data: Result = await res.json();
      clearInterval(tick);
      setProgress(100);
      setTimeout(() => setResult(data), 250);
    } catch (e: any) {
      clearInterval(tick);
      setErr(
        e?.message?.includes("status")
          ? `Gagal memproses: ${e.message}`
          : "Gagal terhubung ke server, coba lagi"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------- UI ---------- */
  return (
    <section id="demo" className="py-24 px-6 relative">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Siliwangi Deepfake Detector
          </h2>
          <p className="text-gray-300 mt-3 max-w-2xl mx-auto">
            Menggabungkan EfficientNet-SE dan pemindaian artefak GAN mikro,
            sistem membandingkan pola tekstur, pencahayaan, dan detail wajah
            untuk menilai keaslian gambar secara cepat. Analisis berjalan lokal
            di peramban dengan privasi terjaga.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden"
        >
          {/* Dropzone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            // ⛔️ Hapus onClick di sini agar tidak memicu dialog kedua kalinya
            className={`relative border-2 rounded-xl p-8 md:p-12 flex flex-col items-center justify-center transition
              ${dragActive ? "border-accent bg-purple-500/10" : "border-border-glass bg-transparent"}
            `}
            aria-label="Unggah gambar untuk dianalisis"
          >
            {/* Input menutupi area, jadi klik di mana saja dalam zona akan membuka dialog */}
            <input
              key={inputKey}
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-hidden="true"
            />

            <AnimatePresence mode="wait">
              {!preview ? (
                <motion.div
                  key="placeholder"
                  variants={hologramVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-center pointer-events-none"
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  >
                    <FiUploadCloud className="mx-auto text-5xl text-gray-300 mb-3" />
                  </motion.div>
                  <p className="text-gray-200 font-medium text-lg">
                    Letakkan gambar di sini atau klik untuk memilih
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG / JPG • Maks 10 MB
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="preview"
                  variants={hologramVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="relative pointer-events-none"
                >
                  <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden ring-4 ring-purple-400/30">
                    <Image
                      src={preview}
                      alt="Pratinjau gambar yang akan dianalisis"
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Tombol ganti gambar */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // jaga-jaga
                      reset();
                    }}
                    className="absolute -top-3 -right-3 glass-icon w-9 h-9 rounded-full flex items-center justify-center text-gray-200 hover:text-white pointer-events-auto"
                    aria-label="Ganti gambar"
                    title="Ganti gambar"
                    type="button"
                  >
                    <FiImage />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Micro-copy helper */}
          <div className="text-center mt-4" aria-live="polite">
            {!file && !loading && (
              <p className="text-sm text-gray-400">
                <span className="font-medium">Cara kerja singkat:</span> model
                mengekstrak ciri frekuensi tinggi (halos di tepi, anomali pori
                kulit) dan konsistensi pencahayaan, lalu menghitung skor
                keyakinan untuk klasifikasi <em>Real</em> vs <em>Deepfake</em>.
              </p>
            )}
            {file && !loading && !result && (
              <p className="text-sm text-gray-300">
                Siap dianalisis. Tekan tombol di bawah — proses ±1 detik.
              </p>
            )}
          </div>

          {/* Progress */}
          {loading && (
            <div className="mt-4">
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                {progress}% Menyusuri piksel...
              </p>
            </div>
          )}

          {/* CTA */}
          <AnimatePresence>
            {file && !result && !loading && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-5"
              >
                <button
                  onClick={submit}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500
                    hover:from-purple-600 hover:to-pink-600 disabled:opacity-60
                    text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3"
                  type="button"
                >
                  <FiShield className="text-xl" />
                  <span>Scan dengan AI</span>
                </button>
                <p className="text-xs text-gray-400 mt-2">
                  Kami tidak menyimpan gambar Anda. Data hanya dipakai untuk
                  inferensi dan dibuang setelah proses selesai.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error */}
          {err && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm text-center mt-4"
              role="alert"
            >
              {err}
            </motion.p>
          )}

          {/* Result */}
          <AnimatePresence>
            {result && (
              <motion.div
                variants={hologramVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`mt-6 p-6 rounded-xl border
                  ${
                    result.prediction === "Deepfake"
                      ? "bg-red-500/10 border-red-400/30"
                      : "bg-green-500/10 border-green-400/30"
                  }
                `}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`min-w-12 w-12 h-12 rounded-full flex items-center justify-center
                        ${
                          result.prediction === "Deepfake"
                            ? "bg-red-500/20"
                            : "bg-green-500/20"
                        }
                      `}
                    >
                      {result.prediction === "Deepfake" ? (
                        <FiXCircle className="text-red-400 text-2xl" />
                      ) : (
                        <FiCheckCircle className="text-green-400 text-2xl" />
                      )}
                    </div>

                    <div>
                      <p className="text-xl font-bold">
                        {result.prediction === "Deepfake"
                          ? "Deepfake Terdeteksi!"
                          : "Asli ✓"}
                      </p>
                      <p className="text-sm text-gray-300">
                        Keyakinan AI: {result.probability}
                        {result.filename ? ` • Berkas: ${result.filename}` : ""}
                      </p>

                      <div className="text-xs text-gray-300 mt-3 space-y-2 leading-relaxed">
                        {result.prediction === "Deepfake" ? (
                          <>
                            <p>
                              Sistem menemukan ketidakwajaran pada pola tepi,
                              tekstur kulit, dan gradien pencahayaan yang
                              konsisten dengan artefak <em>deepfake</em>.
                            </p>
                            <p className="text-gray-400">
                              Saran: verifikasi sumber, lakukan reverse image
                              search, dan hindari penyebaran sebelum valid.
                            </p>
                          </>
                        ) : (
                          <>
                            <p>
                              Tidak ditemukan indikasi kuat artefak sintetis.
                              Konsistensi tekstur dan pencahayaan berada pada
                              rentang wajar citra asli.
                            </p>
                            <p className="text-gray-400">
                              Catatan: hasil probabilistik; gunakan verifikasi
                              multi-sumber untuk kepastian lebih tinggi.
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={reset}
                    className="glass-icon w-10 h-10 rounded-full flex items-center justify-center text-gray-300 hover:text-white"
                    aria-label="Ulangi"
                    title="Ulangi (unggah gambar lain)"
                    type="button"
                  >
                    <FiRotateCcw />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
