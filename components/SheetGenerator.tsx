'use client';

import { useRef } from 'react';
import {
  Sparkles,
  FileUp,
  LayoutTemplate,
  Settings2,
  Palette,
  Type,
  FileSpreadsheet,
  Download,
  Loader2,
  LayoutTemplate as LayoutIcon,
} from 'lucide-react';
import { SheetConfig, GeneratedSheet } from '@/lib/useSheetGenerator';

interface SheetGeneratorProps {
  config: SheetConfig;
  loading: boolean;
  resultSheet: GeneratedSheet | null;
  onConfigChange: (config: SheetConfig) => void;
  onGenerate: () => void;
  onDownload: () => void;
  onDataFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SheetGenerator({
  config,
  loading,
  resultSheet,
  onConfigChange,
  onGenerate,
  onDownload,
  onDataFileUpload,
}: SheetGeneratorProps) {
  const dataInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col md:flex-row gap-8 animate-in fade-in zoom-in duration-500">
      {/* Form Area */}
      <div className="w-full md:w-[45%] flex flex-col gap-5 bg-white p-2">
        <div className="flex p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => onConfigChange({ ...config, mode: 'template' })}
            className={`flex-1 py-2 text-sm font-semibold rounded-md transition ${
              config.mode === 'template'
                ? 'bg-white shadow-sm text-indigo-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Template Bawaan
          </button>
          <button
            onClick={() => onConfigChange({ ...config, mode: 'custom' })}
            className={`flex-1 py-2 text-sm font-semibold rounded-md transition flex items-center justify-center gap-1 ${
              config.mode === 'custom'
                ? 'bg-white shadow-sm text-indigo-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Sparkles size={16} /> Data & Instruksi AI
          </button>
        </div>

        {config.mode === 'template' ? (
          <>
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                <LayoutTemplate size={16} className="text-indigo-600" /> Jenis Inventaris / Template
              </label>
              <select
                value={config.template || ''}
                onChange={(e) =>
                  onConfigChange({ ...config, template: e.target.value })
                }
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-700"
              >
                <option value="Inventaris Barang Masuk & Keluar">
                  Inventaris Barang Masuk & Keluar
                </option>
                <option value="Laporan Penjualan Bulanan">
                  Laporan Penjualan Bulanan
                </option>
                <option value="Database Karyawan & Gaji">Database Karyawan & Gaji</option>
                <option value="Manajemen Proyek & Tugas">Manajemen Proyek & Tugas</option>
                <option value="Catatan Keuangan Pribadi">Catatan Keuangan Pribadi</option>
              </select>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                <Settings2 size={16} className="text-indigo-600" /> Rumus Otomatis
              </label>
              <div className="flex flex-col gap-2 bg-slate-50 p-3 border border-slate-200 rounded-lg">
                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.formulas.sum}
                    onChange={(e) =>
                      onConfigChange({
                        ...config,
                        formulas: { ...config.formulas, sum: e.target.checked },
                      })
                    }
                    className="rounded text-indigo-600"
                  />{' '}
                  Total Penjumlahan (SUM)
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.formulas.average}
                    onChange={(e) =>
                      onConfigChange({
                        ...config,
                        formulas: { ...config.formulas, average: e.target.checked },
                      })
                    }
                    className="rounded text-indigo-600"
                  />{' '}
                  Rata-Rata (AVERAGE)
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.formulas.minmax}
                    onChange={(e) =>
                      onConfigChange({
                        ...config,
                        formulas: { ...config.formulas, minmax: e.target.checked },
                      })
                    }
                    className="rounded text-indigo-600"
                  />{' '}
                  Nilai Tertinggi/Terendah (MAX/MIN)
                </label>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in duration-300">
            <div>
              <label className="flex items-center justify-between text-sm font-bold text-slate-700 mb-2">
                <span className="flex items-center gap-2">
                  <FileSpreadsheet size={16} className="text-indigo-600" /> Data Mentah
                </span>
                <button
                  onClick={() => dataInputRef.current?.click()}
                  className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded flex items-center gap-1 hover:bg-indigo-200"
                >
                  <FileUp size={12} /> Upload
                </button>
                <input
                  type="file"
                  ref={dataInputRef}
                  accept=".csv,.txt"
                  onChange={onDataFileUpload}
                  className="hidden"
                />
              </label>
              <textarea
                placeholder="Paste data barang di sini (contoh: Kopi 5pcs, Teh 10pcs)..."
                value={config.customData}
                onChange={(e) =>
                  onConfigChange({ ...config, customData: e.target.value })
                }
                className="w-full h-28 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-700 text-sm"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                <Sparkles size={16} className="text-indigo-600" /> Instruksi Kustom AI
              </label>
              <textarea
                placeholder="Misal: 'Buatkan pivot tabel rekap per barang, lalu warnai baris merah jika jumlah di bawah 5'"
                value={config.customInstruction}
                onChange={(e) =>
                  onConfigChange({ ...config, customInstruction: e.target.value })
                }
                className="w-full h-20 p-3 bg-indigo-50 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-indigo-900 text-sm placeholder-indigo-300"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mt-2 border-t pt-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
              <Palette size={16} className="text-indigo-600" /> Warna Header
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={config.headerColor}
                onChange={(e) =>
                  onConfigChange({ ...config, headerColor: e.target.value })
                }
                className="w-10 h-10 rounded cursor-pointer border-0 p-0"
              />
              <span className="text-xs text-slate-500 uppercase">{config.headerColor}</span>
            </div>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
              <Type size={16} className="text-indigo-600" /> Gaya Huruf
            </label>
            <select
              value={config.fontStyle}
              onChange={(e) =>
                onConfigChange({
                  ...config,
                  fontStyle: e.target.value as 'sans-serif' | 'serif' | 'monospace',
                })
              }
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="sans-serif">Arial / Sans-Serif</option>
              <option value="serif">Times New Roman / Serif</option>
              <option value="monospace">Courier / Monospace</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
              Garis Tepi
            </label>
            <select
              value={config.hasBorders ? 'yes' : 'no'}
              onChange={(e) =>
                onConfigChange({ ...config, hasBorders: e.target.value === 'yes' })
              }
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
            >
              <option value="yes">Gunakan Garis</option>
              <option value="no">Tanpa Garis</option>
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
              Format Sheet
            </label>
            <select
              value={config.pageLayout}
              onChange={(e) =>
                onConfigChange({
                  ...config,
                  pageLayout: e.target.value as 'single' | 'multi',
                })
              }
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
            >
              <option value="single">Gabung (1 Sheet)</option>
              <option value="multi">Pisah per Kategori</option>
            </select>
          </div>
        </div>

        <button
          onClick={onGenerate}
          disabled={
            loading ||
            (config.mode === 'custom' && !config.customData && !config.customInstruction)
          }
          className={`mt-4 w-full py-3 px-4 rounded-xl font-bold text-white shadow-md flex items-center justify-center gap-2 transition-all ${
            loading ||
            (config.mode === 'custom' && !config.customData && !config.customInstruction)
              ? 'bg-green-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 hover:shadow-lg active:scale-[0.98]'
          }`}
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" /> Menyusun Sheet...
            </>
          ) : (
            <>
              <FileSpreadsheet size={20} /> Buat Spreadsheet Otomatis
            </>
          )}
        </button>
      </div>

      {/* Result Preview Area */}
      <div className="w-full md:w-[55%] flex flex-col bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-100 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-semibold text-slate-700 flex items-center gap-2">
            <FileSpreadsheet size={18} /> Preview Spreadsheet
          </h3>
          {resultSheet && (
            <button
              onClick={onDownload}
              className="py-2 px-4 bg-green-600 text-white hover:bg-green-700 rounded-lg transition flex items-center gap-2 text-sm font-medium shadow-sm"
            >
              <Download size={16} /> Ekspor Excel (.xls)
            </button>
          )}
        </div>

        <div className="p-4 flex-1 overflow-auto max-h-[500px]">
          {!resultSheet && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 mt-10">
              <LayoutIcon size={48} className="mb-3 opacity-20" />
              <p className="text-sm">Konfigurasi opsi di sebelah kiri, lalu klik Buat.</p>
            </div>
          )}

          {loading && (
            <div className="h-full flex flex-col items-center justify-center text-green-500 mt-10">
              <Loader2 size={40} className="animate-spin mb-4" />
              <p className="text-sm font-medium animate-pulse">Menghitung data & merancang layout...</p>
            </div>
          )}

          {resultSheet && !loading && (
            <div className="flex flex-col gap-8" style={{ fontFamily: config.fontStyle }}>
              {resultSheet.sheets.map((sheet, idx) => (
                <div key={idx} className="w-full overflow-x-auto">
                  <div className="inline-block min-w-full">
                    <div className="mb-2 font-bold text-sm text-slate-500 bg-white px-3 py-1 inline-block rounded-t-lg border border-b-0 border-slate-200 shadow-sm">
                      Sheet: {sheet.name}
                    </div>
                    <table
                      className={`w-full text-sm text-left border-collapse ${
                        config.hasBorders ? 'border border-slate-300' : ''
                      } bg-white shadow-sm rounded-b-lg rounded-tr-lg overflow-hidden`}
                    >
                      <thead style={{ backgroundColor: config.headerColor, color: '#ffffff' }}>
                        <tr>
                          {sheet.data[0]?.map((h, i) => (
                            <th
                              key={i}
                              className={`px-4 py-2 whitespace-nowrap ${
                                config.hasBorders ? 'border border-slate-300' : ''
                              }`}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sheet.data.slice(1).map((row, r) => (
                          <tr key={r} className="hover:bg-slate-50">
                            {row.map((cell, c) => {
                              let cellValue = cell;
                              let customBg = '';

                              if (
                                cell !== null &&
                                typeof cell === 'object' &&
                                'v' in cell
                              ) {
                                cellValue = cell.v;
                                if (cell.bg) customBg = cell.bg;
                              }

                              const isFormula =
                                typeof cellValue === 'string' &&
                                cellValue.startsWith('=');

                              return (
                                <td
                                  key={c}
                                  style={{ backgroundColor: customBg || 'transparent' }}
                                  className={`px-4 py-2 ${
                                    config.hasBorders
                                      ? 'border border-slate-200'
                                      : ''
                                  } ${
                                    isFormula
                                      ? 'font-mono text-green-700 bg-green-50/30'
                                      : 'text-slate-700'
                                  }`}
                                >
                                  {cellValue}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
              <div className="text-xs text-slate-500 italic mt-4">
                Teks berawalan {`"`}={`"`} akan dikenali sebagai rumus. Format warna
                akan tersimpan saat diekspor ke Excel.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
