# Setup Guide - EkstrakAja

Panduan lengkap untuk setup dan menjalankan EkstrakAja di mesin lokal Anda.

## 📋 Prerequisites

Pastikan Anda memiliki:

1. **Node.js** - Versi 18 atau lebih baru
   - Download dari https://nodejs.org/
   - Verifikasi: `node --version` dan `npm --version`

2. **Git** (Optional tapi disarankan)
   - Download dari https://git-scm.com/

3. **Text Editor** (VSCode disarankan)
   - Download dari https://code.visualstudio.com/

4. **Google Gemini API Key** - WAJIB!
   - Pergi ke https://aistudio.google.com/app/apikeys
   - Klik "Create API key"
   - Copy API key Anda

## 🔑 Setup API Key

### Langkah 1: Dapatkan API Key

1. Buka https://aistudio.google.com/app/apikeys
2. Login dengan akun Google Anda
3. Klik tombol **"Create API key"**
4. Pilih **"Create API key in existing project"** atau buat project baru
5. Copy API key yang ditampilkan
6. **JANGAN SHARE API KEY KE SIAPA PUN!**

### Langkah 2: Setup Environment Variable

1. Di folder root project, cari file `.env.local.example`
2. Duplicate file tersebut dan rename menjadi `.env.local`
3. Buka `.env.local` dan ganti:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
   ```
   Dengan API key Anda:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxx
   ```
4. **Pastikan `.env.local` ada di `.gitignore`** (sudah ada)

## 🚀 Instalasi & Menjalankan

### Langkah 1: Clone Repository (jika belum)

```bash
git clone https://github.com/eugenewijaya/EkstrakAja.git
cd EkstrakAja
```

### Langkah 2: Install Dependencies

Pilih salah satu sesuai package manager favorit Anda:

**Menggunakan npm:**
```bash
npm install
```

**Menggunakan pnpm:**
```bash
pnpm install
```

**Menggunakan yarn:**
```bash
yarn install
```

**Menggunakan bun:**
```bash
bun install
```

### Langkah 3: Jalankan Development Server

```bash
npm run dev
```

Output akan terlihat seperti ini:
```
> dev
> next dev

  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local
```

### Langkah 4: Buka di Browser

1. Buka browser Anda
2. Pergi ke http://localhost:3000
3. Klik "Mulai Gunakan Alatnya"
4. Coba upload gambar dan ekstrak!

## 🔨 Build untuk Production

### Langkah 1: Build Project

```bash
npm run build
```

### Langkah 2: Jalankan Production Build

```bash
npm start
```

Server akan berjalan di http://localhost:3000

## 🚀 Deploy ke Vercel

### Opsi 1: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel
```

Ikuti prompt dan pilih opsi yang sesuai.

### Opsi 2: Deploy via GitHub

1. Push code ke GitHub repository Anda
2. Pergi ke https://vercel.com/
3. Login dengan GitHub account
4. Import project dari GitHub
5. Vercel akan auto-detect Next.js
6. Setup environment variable `NEXT_PUBLIC_GEMINI_API_KEY`
7. Deploy!

## ⚙️ Troubleshooting

### Error: "Cannot find module 'next'"

**Solusi:**
```bash
npm install
# atau
rm -rf node_modules package-lock.json
npm install
```

### Error: "NEXT_PUBLIC_GEMINI_API_KEY is not defined"

**Solusi:**
1. Pastikan file `.env.local` ada di root folder
2. Pastikan formatnya benar:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=AIzaSy...
   ```
3. Restart development server dengan `npm run dev`

### Error: "API request failed" saat ekstrak

**Kemungkinan penyebab:**
1. API key tidak valid atau sudah expired
2. Quota API sudah habis
3. Koneksi internet bermasalah

**Solusi:**
1. Verifikasi API key di https://aistudio.google.com/app/apikeys
2. Check quota usage di Google Cloud Console
3. Restart development server

### Port 3000 sudah digunakan

**Solusi:**
```bash
# Gunakan port berbeda
npm run dev -- -p 3001
```

Akses http://localhost:3001

## 📁 Struktur Folder

```
EkstrakAja/
├── app/                 # Next.js app directory
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main page
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── HeroSection.tsx
│   ├── ExtractSection.tsx
│   ├── SheetGenerator.tsx
│   └── ...
├── lib/                 # Utility functions & hooks
│   ├── useExtraction.ts
│   ├── useSheetGenerator.ts
│   ├── constants.ts
│   └── downloadHelpers.ts
├── docs/                # Documentation
├── public/              # Static assets
├── .env.local          # Environment variables (local)
├── .env.local.example  # Template untuk env variables
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
├── tailwind.config.ts  # Tailwind CSS config
└── next.config.mjs     # Next.js config
```

## 🆘 Butuh Bantuan?

- Baca README.md untuk informasi umum
- Check docs/ARCHITECTURE.md untuk penjelasan technical
- Buka issue di GitHub repository
- Hubungi developer

## ✅ Checklist Setup

Pastikan sudah dilakukan:

- [ ] Node.js 18+ terinstall
- [ ] Folder project di-clone atau di-extract
- [ ] Dependencies sudah di-install (`npm install`)
- [ ] `.env.local` sudah dibuat dan diisi dengan API key
- [ ] Development server bisa dijalankan (`npm run dev`)
- [ ] Browser bisa akses http://localhost:3000
- [ ] Hero section terlihat dengan tombol "Mulai Gunakan Alatnya"

Selamat! Setup sudah selesai. Silahkan mulai menggunakan EkstrakAja! 🎉
