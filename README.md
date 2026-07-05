# 🧠 Deepfake Detector

Aplikasi deteksi deepfake berbasis **Artificial Intelligence (AI)** yang memungkinkan pengguna mengunggah gambar atau video untuk diperiksa apakah konten tersebut asli atau hasil manipulasi deepfake.

## ✨ Fitur

- **Upload & Deteksi** — Unggah gambar/video untuk dianalisis secara real-time
- **Pipeline Deteksi** — Visualisasi proses deteksi dari awal hingga hasil
- **Arsitektur Sistem** — Penjelasan bagaimana model AI bekerja dalam mendeteksi deepfake
- **Informasi Edukatif** — Penjelasan tentang apa itu deepfake dan cara kerjanya
- **Tampilan Modern** — UI responsif dengan animasi partikel background

## 🛠️ Tech Stack

### Frontend
- **Next.js** — React framework
- **TypeScript** — Type safety
- **Tailwind CSS** — Utility-first styling
- **shadcn/ui** — UI component library

### Backend
- **Python** — Core detection logic
- Backend Python terletak di folder `backend/`

## 🚀 Cara Menjalankan

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
pip install -r requirements.txt
python main.py
```

## 📁 Struktur Proyek

```
├── frontend/               # Next.js frontend application
│   ├── app/                # App router pages
│   ├── components/         # React komponen
│   │   ├── Architecture.tsx
│   │   ├── HeroSection.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Pipeline.tsx
│   │   ├── Uploader.tsx
│   │   └── WhatIsDeepfake.tsx
│   └── ...
├── backend/                # Python backend
│   └── main.py             # Entry point backend
└── README.md
```

## 📄 Lisensi

Distributed under the MIT License.

---

> Dibuat oleh [Pandu Pangestu](https://github.com/pandupan) — Proyek deteksi deepfake untuk edukasi dan penelitian.
