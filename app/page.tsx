'use client';

import { useState, useRef, useEffect } from 'react';
import { FileText, Table, FileSpreadsheet } from 'lucide-react';
import { HeroSection } from '@/components/HeroSection';
import { ExtractSection } from '@/components/ExtractSection';
import { SheetGenerator } from '@/components/SheetGenerator';
import { DonationModal } from '@/components/DonationModal';
import { useExtraction } from '@/lib/useExtraction';
import { useSheetGenerator, SheetConfig } from '@/lib/useSheetGenerator';

const TEMPLATES = [
  'Inventaris Barang Masuk & Keluar',
  'Laporan Penjualan Bulanan',
  'Database Karyawan & Gaji',
  'Manajemen Proyek & Tugas',
  'Catatan Keuangan Pribadi',
];

export default function Page() {
  // UI State
  const [showTool, setShowTool] = useState(false);
  const [mode, setMode] = useState<'text' | 'table' | 'sheet'>('text');
  const [showDonation, setShowDonation] = useState(false);
  const [copied, setCopied] = useState(false);
  const lastPopupTime = useRef(Date.now());
  const toolSectionRef = useRef<HTMLDivElement>(null);

  // Extract Mode State
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultText, setResultText] = useState('');
  const [resultTable, setResultTable] = useState<string[][] | null>(null);

  // Sheet Generator State
  const [sheetConfig, setSheetConfig] = useState<SheetConfig>({
    mode: 'template',
    template: TEMPLATES[0],
    customData: '',
    customInstruction: '',
    formulas: { sum: true, average: false, minmax: false },
    headerColor: '#4F46E5',
    fontStyle: 'sans-serif',
    hasBorders: true,
    pageLayout: 'single',
  });
  const [resultSheet, setResultSheet] = useState(null);

  // Hooks
  const extraction = useExtraction();
  const sheetGenerator = useSheetGenerator();

  // Donation popup logic
  useEffect(() => {
    const handleGlobalClick = () => {
      if (!showTool) return;

      const now = Date.now();
      if (now - lastPopupTime.current > 120000) {
        if (Math.random() < 0.1) {
          setShowDonation(true);
          lastPopupTime.current = now;
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, [showTool]);

  // Scroll to tool
  const scrollToTool = () => {
    setShowTool(true);
    setTimeout(() => {
      toolSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // File handlers
  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setResultText('');
    setResultTable(null);
    extraction.setError('');
  };

  const handleClearFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setResultText('');
    setResultTable(null);
  };

  // Extract handlers
  const handleExtract = async () => {
    if (!file) return;

    if (mode === 'text') {
      const result = await extraction.extractText(file);
      if (result) {
        setResultText(result.text);
        downloadTxt(result.text);
      }
    } else if (mode === 'table') {
      const result = await extraction.extractTable(file);
      if (result) {
        if (result.table) {
          setResultTable(result.table);
        } else {
          setResultText(result.text);
        }
      }
    }
  };

  // Download handlers
  const downloadTxt = (text: string) => {
    const element = document.createElement('a');
    const blob = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(blob);
    element.download = 'Hasil_EkstrakAja.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadCsv = () => {
    if (!resultTable) return;

    const csvContent = resultTable
      .map((row) =>
        row
          .map((cell) => {
            let cellStr = cell ? cell.toString() : '';
            if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
              cellStr = `"${cellStr.replace(/"/g, '""')}"`;
            }
            return cellStr;
          })
          .join(',')
      )
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Tabel_EkstrakAja.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadStyledExcel = () => {
    if (!resultSheet) return;

    let html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
    <meta charset="utf-8" />
    <style>
      table { font-family: ${sheetConfig.fontStyle}; border-collapse: collapse; margin-bottom: 2em; }
      th { background-color: ${sheetConfig.headerColor}; color: #ffffff; ${sheetConfig.hasBorders ? 'border: 1pt solid #000000;' : ''} padding: 8px; font-weight: bold; text-align: left; }
      td { ${sheetConfig.hasBorders ? 'border: 1pt solid #000000;' : ''} padding: 8px; }
    </style>
    </head>
    <body>`;

    // @ts-ignore
    resultSheet.sheets.forEach((sheet: any) => {
      html += `<h2>${sheet.name}</h2>`;
      html += `<table>`;
      sheet.data.forEach((row: any, rowIndex: number) => {
        html += `<tr>`;
        row.forEach((cell: any) => {
          const isHeader = rowIndex === 0;
          const tag = isHeader ? 'th' : 'td';

          let cellValue = '';
          let cellStyle = '';

          if (cell !== null && typeof cell === 'object' && cell.v !== undefined) {
            cellValue = cell.v.toString();
            if (cell.bg && !isHeader) {
              cellStyle = `style="background-color: ${cell.bg};"`;
            }
          } else {
            cellValue = cell === null ? '' : cell.toString();
          }

          html += `<${tag} ${cellStyle}>${cellValue}</${tag}>`;
        });
        html += `</tr>`;
      });
      html += `</table><br><br>`;
    });

    html += `</body></html>`;

    const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    // @ts-ignore
    const fileName = sheetConfig.mode === 'template' ? sheetConfig.template : 'Data_Kustom';
    link.download = `EkstrakAja_${fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy to clipboard
  const copyToClipboard = () => {
    let textToCopy = '';

    if (mode === 'text' && resultText) {
      textToCopy = resultText;
    } else if (mode === 'table' && resultTable) {
      textToCopy = resultTable.map((row) => row.join('\t')).join('\n');
    }

    if (textToCopy) {
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Gagal menyalin', err);
      }
      document.body.removeChild(textArea);
    }
  };

  // Sheet generator handlers
  const handleGenerateSheet = async () => {
    const result = await sheetGenerator.generateSheet(sheetConfig);
    if (result) {
      setResultSheet(result);
    }
  };

  const handleDataFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setSheetConfig({
          ...sheetConfig,
          customData: evt.target?.result as string,
        });
      };
      reader.readAsText(file);
    }
  };

  const handleDownloadQRIS = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const imageUrl =
      'https://i.ibb.co.com/JjfVVDsG/Whats-App-Interactive-2026-02-17-at-16-52-19.jpg';
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'QRIS_Donasi_Developer.jpg';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowDonation(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 relative scroll-smooth">
      {/* Hero Section */}
      {!showTool && <HeroSection onGetStarted={scrollToTool} />}

      {/* Tool Section */}
      {showTool && (
        <div
          ref={toolSectionRef}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 -mt-12 relative z-10"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Tabs */}
            <div className="flex flex-col sm:flex-row border-b border-slate-200">
              <button
                onClick={() => {
                  setMode('text');
                  extraction.setError('');
                }}
                className={`flex-1 py-4 px-4 text-center font-semibold text-sm transition flex items-center justify-center gap-2 ${
                  mode === 'text'
                    ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`}
              >
                <FileText size={18} /> Ekstrak Teks Biasa
              </button>
              <button
                onClick={() => {
                  setMode('table');
                  extraction.setError('');
                }}
                className={`flex-1 py-4 px-4 text-center font-semibold text-sm transition flex items-center justify-center gap-2 ${
                  mode === 'table'
                    ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`}
              >
                <Table size={18} /> Ekstrak Tabel Gambar
              </button>
              <button
                onClick={() => {
                  setMode('sheet');
                  extraction.setError('');
                }}
                className={`flex-1 py-4 px-4 text-center font-semibold text-sm transition flex items-center justify-center gap-2 ${
                  mode === 'sheet'
                    ? 'bg-green-50 text-green-700 border-b-2 border-green-600'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`}
              >
                <FileSpreadsheet size={18} /> Pembuat Sheet Pintar
              </button>
            </div>

            <div className="p-6 md:p-8">
              {extraction.error && mode !== 'sheet' && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-start gap-3 text-sm border border-red-100">
                  <span>⚠️</span>
                  <span>{extraction.error}</span>
                </div>
              )}

              {sheetGenerator.error && mode === 'sheet' && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-start gap-3 text-sm border border-red-100">
                  <span>⚠️</span>
                  <span>{sheetGenerator.error}</span>
                </div>
              )}

              {mode === 'text' && (
                <ExtractSection
                  mode="text"
                  file={file}
                  previewUrl={previewUrl}
                  resultText={resultText}
                  resultTable={null}
                  loading={extraction.loading}
                  error={extraction.error}
                  copied={copied}
                  onFileSelect={handleFileSelect}
                  onClearFile={handleClearFile}
                  onExtract={handleExtract}
                  onDownload={() => downloadTxt(resultText)}
                  onCopy={copyToClipboard}
                />
              )}

              {mode === 'table' && (
                <ExtractSection
                  mode="table"
                  file={file}
                  previewUrl={previewUrl}
                  resultText={resultText}
                  resultTable={resultTable}
                  loading={extraction.loading}
                  error={extraction.error}
                  copied={copied}
                  onFileSelect={handleFileSelect}
                  onClearFile={handleClearFile}
                  onExtract={handleExtract}
                  onDownload={downloadCsv}
                  onCopy={copyToClipboard}
                />
              )}

              {mode === 'sheet' && (
                <SheetGenerator
                  config={sheetConfig}
                  loading={sheetGenerator.loading}
                  resultSheet={resultSheet}
                  onConfigChange={setSheetConfig}
                  onGenerate={handleGenerateSheet}
                  onDownload={downloadStyledExcel}
                  onDataFileUpload={handleDataFileUpload}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Donation Modal */}
      <DonationModal
        isOpen={showDonation}
        onClose={() => setShowDonation(false)}
        onDownloadQRIS={handleDownloadQRIS}
      />
    </div>
  );
}
