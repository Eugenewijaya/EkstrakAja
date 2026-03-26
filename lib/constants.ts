/**
 * Application constants
 */

export const SHEET_TEMPLATES = [
  'Inventaris Barang Masuk & Keluar',
  'Laporan Penjualan Bulanan',
  'Database Karyawan & Gaji',
  'Manajemen Proyek & Tugas',
  'Catatan Keuangan Pribadi',
] as const;

export const FONT_STYLES = [
  { value: 'sans-serif', label: 'Arial / Sans-Serif' },
  { value: 'serif', label: 'Times New Roman / Serif' },
  { value: 'monospace', label: 'Courier / Monospace' },
] as const;

export const EXTRACTION_PROMPTS = {
  text: 'Ekstrak semua teks yang ada di dalam gambar ini. Berikan HANYA teks yang diekstrak tanpa tambahan komentar, penjelasan, atau basa-basi apapun. Pertahankan format paragraf aslinya semaksimal mungkin.',
  table: 'Ekstrak tabel dari gambar ini. Keluarkan HANYA array 2D dalam format JSON yang valid, di mana array pertama adalah baris header, dan array berikutnya adalah baris data. Contoh: [["Header 1"], ["Data 1"]]. Jangan tambahkan teks lain. Pastikan ini adalah JSON array yang bisa langsung di-parse.',
} as const;

export const API_CONFIG = {
  baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models',
  model: 'gemini-2.5-flash-preview-09-2025',
  maxRetries: 3,
  retryDelay: 1000,
} as const;

export const DONATION_QRIS_URL =
  'https://i.ibb.co.com/JjfVVDsG/Whats-App-Interactive-2026-02-17-at-16-52-19.jpg';

export const POPUP_CONFIG = {
  showAfterMs: 120000, // 2 minutes
  showProbability: 0.1, // 10% chance
} as const;
