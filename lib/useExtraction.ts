import { useState } from 'react';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

interface ExtractResult {
  text: string;
  table: string[][] | null;
}

export function useExtraction() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result?.toString().replace(/^data:(.*,)?/, '') || '';
        if ((encoded.length % 4) > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      };
      reader.onerror = (error) => reject(error);
    });
  };

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

  const extractText = async (file: File): Promise<ExtractResult | null> => {
    if (!file) return null;

    setLoading(true);
    setError('');

    try {
      const base64Data = await getBase64(file);
      const prompt =
        'Ekstrak semua teks yang ada di dalam gambar ini. Berikan HANYA teks yang diekstrak tanpa tambahan komentar, penjelasan, atau basa-basi apapun. Pertahankan format paragraf aslinya semaksimal mungkin.';

      const payload = {
        contents: [
          {
            role: 'user',
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: file.type,
                  data: base64Data,
                },
              },
            ],
          },
        ],
      };

      const data = await fetchWithRetry(payload);
      const extractedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!extractedText) {
        throw new Error('Gagal mengekstrak data. Hasil kosong.');
      }

      return { text: extractedText, table: null };
    } catch (err) {
      setError(
        'Terjadi kesalahan saat memproses gambar. Pastikan API key valid atau coba lagi nanti.'
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  const extractTable = async (file: File): Promise<ExtractResult | null> => {
    if (!file) return null;

    setLoading(true);
    setError('');

    try {
      const base64Data = await getBase64(file);
      const prompt =
        'Ekstrak tabel dari gambar ini. Keluarkan HANYA array 2D dalam format JSON yang valid, di mana array pertama adalah baris header, dan array berikutnya adalah baris data. Contoh: [["Header 1"], ["Data 1"]]. Jangan tambahkan teks lain. Pastikan ini adalah JSON array yang bisa langsung di-parse.';

      const payload = {
        contents: [
          {
            role: 'user',
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: file.type,
                  data: base64Data,
                },
              },
            ],
          },
        ],
      };

      const data = await fetchWithRetry(payload);
      const extractedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!extractedText) {
        throw new Error('Gagal mengekstrak data. Hasil kosong.');
      }

      try {
        let cleanJson = extractedText.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsedTable = JSON.parse(cleanJson);

        if (Array.isArray(parsedTable) && parsedTable.length > 0) {
          return { text: '', table: parsedTable };
        } else {
          throw new Error('Format tabel tidak dikenali.');
        }
      } catch (parseError) {
        setError('Gagal memformat tabel visual. Berikut adalah hasil teks mentahnya.');
        return { text: extractedText, table: null };
      }
    } catch (err) {
      setError(
        'Terjadi kesalahan saat memproses gambar. Pastikan API key valid atau coba lagi nanti.'
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
    extractText,
    extractTable,
  };
}
