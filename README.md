# Deepfake Detector 🕵️‍♂️

> **Deteksi gambar deepfake berbasis AI dengan EfficientNet-B0 dan SE-Block**

Proyek ini adalah sistem deteksi deepfake yang menggabungkan **frontend Next.js** modern dengan **backend Python (FastAPI + PyTorch)** untuk mengidentifikasi apakah suatu gambar adalah asli (*real*) atau hasil manipulasi deepfake.

Model menggunakan arsitektur **EfficientNet-B0** yang sudah di-*fine-tune* dengan tambahan **Squeeze-and-Excitation Block (SE-Block)** untuk memberikan perhatian khusus (*channel attention*) pada artefak halus khas deepfake, seperti ketidakwajaran tekstur kulit, pola pencahayaan, dan gradien tepi.

---

## ✨ Fitur Utama

- **Upload & Drag-and-Drop** — Unggah gambar dengan mudah, dukungan drag-and-drop
- **Deteksi Real-time** — Analisis gambar dalam hitungan detik
- **Visual Arsitektur Model** — Penjelasan interaktif alur EfficientNet-SE
- **Pipeline Deteksi** — Visualisasi langkah demi langkah proses inferensi
- **Informasi Edukatif** — Penjelasan tentang deepfake dan cara kerjanya
- **Privasi Terjaga** — Gambar tidak disimpan, hanya digunakan untuk inferensi
- **Animasi Particles** — Latar belakang partikel interaktif yang memukau
- **Responsive Design** — Tampilan optimal di semua perangkat

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Bahasa:** TypeScript
- **UI Library:** React 19 + shadcn/ui
- **Styling:** Tailwind CSS 4
- **Animasi:** Framer Motion, tsparticles
- **Ikon:** Lucide React, React Icons

### Backend
- **Framework:** FastAPI (Python)
- **Deep Learning:** PyTorch + torchvision
- **Model:** EfficientNet-B0 + SE-Block (*custom classifier*)
- **Image Processing:** Pillow (PIL)

---

## 🚀 Cara Install & Jalankan

### Prasyarat
- Node.js 18+
- Python 3.10+
- npm atau yarn

### 1. Clone Repository
```bash
git clone https://github.com/pandupan/deepfake-detector.git
cd deepfake-detector
```

### 2. Setup Backend (Python)
```bash
cd backend
pip install -r requirements.txt  # atau install manual: fastapi, torch, torchvision, pillow, uvicorn
uvicorn main:app --reload
```
Backend akan berjalan di `http://localhost:8000`.

### 3. Setup Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
Frontend akan berjalan di `http://localhost:3000`.

### 4. Gunakan
Buka `http://localhost:3000`, unggah gambar, dan AI akan mendeteksi apakah gambar tersebut asli atau deepfake.

---

## 📁 Struktur Folder

```
deepfake-detector/
├── backend/
│   └── main.py              # API FastAPI + model inference
├── frontend/
│   ├── app/
│   │   ├── page.tsx         # Halaman utama
│   │   ├── layout.tsx       # Layout root
│   │   └── globals.css      # Global styles
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── WhatIsDeepfake.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Architecture.tsx  # Arsitektur model interaktif
│   │   ├── Pipeline.tsx      # Pipeline deteksi
│   │   ├── Uploader.tsx      # Upload & deteksi
│   │   ├── ParticlesBG.tsx
│   │   └── Footer.tsx
│   ├── lib/
│   │   └── utils.ts
│   └── package.json
└── README.md
```

## 📄 Lisensi

Proyek ini dilisensikan di bawah **MIT License** — lihat file [LICENSE](LICENSE) untuk detail lebih lanjut.

---

> Dibuat oleh [Pandu Pangestu](https://github.com/pandupan) sebagai bagian dari proyek deteksi deepfake dengan pendekatan deep learning.
