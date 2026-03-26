'use client';

import { useState } from 'react';
import { FileText, Table, Download, Copy, Check, Loader2, ImageIcon } from 'lucide-react';

interface ResultAreaProps {
  mode: 'text' | 'table';
  loading: boolean;
  resultText: string;
  resultTable: string[][] | null;
  onDownload: () => void;
  onCopy: () => void;
  copied: boolean;
}

export function ResultArea({
  mode,
  loading,
  resultText,
  resultTable,
  onDownload,
  onCopy,
  copied,
}: ResultAreaProps) {
  return (
    <div className="w-full md:w-1/2 flex flex-col bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
      <div className="p-4 bg-slate-100 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-semibold text-slate-700 flex items-center gap-2">
          {mode === 'text' ? (
            <>
              <FileText size={18} /> Hasil Ekstraksi
            </>
          ) : (
            <>
              <Table size={18} /> Hasil Ekstraksi
            </>
          )}
        </h3>
        {((mode === 'text' && resultText) || (mode === 'table' && resultTable)) && (
          <div className="flex gap-2">
            <button
              onClick={onCopy}
              title="Salin ke Clipboard"
              className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
            >
              {copied ? (
                <Check size={18} className="text-green-600" />
              ) : (
                <Copy size={18} />
              )}
            </button>
            <button
              onClick={onDownload}
              title={mode === 'text' ? 'Unduh File .TXT' : 'Unduh CSV'}
              className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition flex items-center gap-1"
            >
              <Download size={18} />
            </button>
          </div>
        )}
      </div>

      <div className="p-4 flex-1 overflow-auto min-h-[300px]">
        {!resultText && !resultTable && !loading && (
          <div className="h-full flex flex-col items-center justify-center text-slate-400">
            <ImageIcon size={48} className="mb-3 opacity-20" />
            <p className="text-sm">Hasil ekstraksi akan muncul di sini</p>
          </div>
        )}

        {loading && (
          <div className="h-full flex flex-col items-center justify-center text-indigo-500">
            <Loader2 size={40} className="animate-spin mb-4" />
            <p className="text-sm font-medium animate-pulse">AI sedang memproses...</p>
          </div>
        )}

        {mode === 'text' && resultText && !loading && (
          <textarea
            className="w-full h-full min-h-[300px] p-0 bg-transparent border-none resize-none focus:ring-0 text-slate-700 leading-relaxed"
            value={resultText}
            readOnly
          />
        )}

        {mode === 'table' && resultTable && !loading && (
          <div className="overflow-x-auto w-full max-w-full">
            <table className="w-full text-sm text-left text-slate-600 border-collapse">
              <thead className="text-xs text-slate-700 uppercase bg-indigo-50/50 border-b border-indigo-100">
                <tr>
                  {resultTable[0]?.map((h, i) => (
                    <th
                      key={i}
                      className="px-4 py-3 border-r border-indigo-50 last:border-0 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {resultTable.slice(1).map((row, r) => (
                  <tr key={r} className="border-b border-slate-100 hover:bg-slate-50/50">
                    {row.map((cell, c) => (
                      <td
                        key={c}
                        className="px-4 py-3 border-r border-slate-50 last:border-0"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
