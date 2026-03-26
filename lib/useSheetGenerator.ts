import { useState } from 'react';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

export interface SheetData {
  name: string;
  data: (string | number | { v: string | number; bg?: string })[][];
}

export interface GeneratedSheet {
  sheets: SheetData[];
}

export interface SheetConfig {
  mode: 'template' | 'custom';
  template?: string;
  customData: string;
  customInstruction: string;
  formulas: {
    sum: boolean;
    average: boolean;
    minmax: boolean;
  };
  headerColor: string;
  fontStyle: 'sans-serif' | 'serif' | 'monospace';
  hasBorders: boolean;
  pageLayout: 'single' | 'multi';
}

export function useSheetGenerator() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWithRetry = async (payload: any, maxRetries = 3): Promise<any> => {
    let retries = maxRetries;
    let delay = 1000;

    while (retries > 0) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
      } catch (err) {
        retries--;
        if (retries === 0) throw err;
        await new Promise((res) => setTimeout(res, delay));
        delay *= 2;
      }
    }
  };

  const generateSheet = async (config: SheetConfig): Promise<GeneratedSheet | null> => {
    setLoading(true);
    setError('');

    try {
      let prompt = '';

      if (config.mode === 'template') {
        const activeFormulas = [];
        if (config.formulas.sum) activeFormulas.push('Penjumlahan (SUM)');
        if (config.formulas.average) activeFormulas.push('Rata-rata (AVERAGE)');
        if (config.formulas.minmax) activeFormulas.push('Nilai Max/Min (MAX/MIN)');

        prompt = `Anda adalah ahli pembuat template Spreadsheet/Excel. Buatkan data struktur spreadsheet yang realistis dan lengkap untuk keperluan: "${config.template}".
        Instruksi Konfigurasi:
        1. Rumus yang diaktifkan: ${activeFormulas.length > 0 ? activeFormulas.join(', ') : 'Tidak ada'}. JIKA ADA rumus yang aktif, masukkan sintaks Excel yang valid (misal: =SUM(E2:E10), =D2*C2) langsung ke dalam sel data yang sesuai.
        2. Layout Halaman: ${config.pageLayout === 'multi' ? 'Pisahkan data menjadi beberapa sheet logis (misalnya per kategori).' : 'Jadikan satu sheet utama yang merangkum semua data.'}
        3. Berikan minimal 5 baris data percontohan (dummy data).
        
        Output HARUS berupa objek JSON murni:
        { "sheets": [ { "name": "Nama Sheet", "data": [ ["Header1"], ["Data 1", "=B2*10"] ] } ] }`;
      } else {
        prompt = `Anda adalah ahli pengolahan data Excel. Saya memiliki data mentah berikut:
        ${config.customData || '(Data kosong, buatkan format berdasarkan instruksi saja)'}
        
        Instruksi Khusus: ${config.customInstruction}
        
        Tugas Anda:
        1. Olah data mentah tersebut menjadi struktur tabel sesuai instruksi.
        2. Jika instruksi meminta pivot table atau rekapitulasi, buatkan format tabel agregatnya di sheet yang relevan.
        3. Jika instruksi meminta pewarnaan baris/cell tertentu, berikan warna tersebut dalam format objek cell JSON { "v": "nilai", "bg": "#kodehexwarna" }. Jika tidak butuh warna khusus, bisa langsung pakai format string/angka biasa.
        
        Output HARUS berupa objek JSON murni TANPA markdown \`\`\`json, dengan format:
        {
          "sheets": [
            {
              "name": "Nama Sheet",
              "data": [
                ["Header1", "Header2", "Header 3"],
                ["Data Biasa", 50, { "v": "Stok Menipis", "bg": "#ffcccc" }]
              ]
            }
          ]
        }`;
      }

      const payload = { contents: [{ role: 'user', parts: [{ text: prompt }] }] };
      const responseData = await fetchWithRetry(payload);
      let jsonText = responseData?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!jsonText) {
        throw new Error('Gagal membuat sheet.');
      }

      jsonText = jsonText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsedSheet: GeneratedSheet = JSON.parse(jsonText);

      if (parsedSheet && parsedSheet.sheets) {
        return parsedSheet;
      } else {
        throw new Error('Format output AI tidak sesuai yang diharapkan.');
      }
    } catch (err) {
      console.error(err);
      setError(
        'Gagal membuat spreadsheet. Data JSON AI tidak valid atau instruksi terlalu rumit. Coba sederhanakan instruksi Anda.'
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    setError,
    generateSheet,
  };
}
