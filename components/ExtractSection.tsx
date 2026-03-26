'use client';

import { ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { UploadArea } from './UploadArea';
import { ResultArea } from './ResultArea';

interface ExtractSectionProps {
  mode: 'text' | 'table';
  file: File | null;
  previewUrl: string | null;
  resultText: string;
  resultTable: string[][] | null;
  loading: boolean;
  error: string;
  copied: boolean;
  onFileSelect: (file: File) => void;
  onClearFile: () => void;
  onExtract: () => void;
  onDownload: () => void;
  onCopy: () => void;
}

export function ExtractSection({
  mode,
  file,
  previewUrl,
  resultText,
  resultTable,
  loading,
  error,
  copied,
  onFileSelect,
  onClearFile,
  onExtract,
  onDownload,
  onCopy,
}: ExtractSectionProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8 animate-in fade-in zoom-in duration-500">
      <div className="w-full md:w-1/2 flex flex-col">
        <UploadArea
          previewUrl={previewUrl}
          onFileSelect={onFileSelect}
          onClear={onClearFile}
          loading={loading}
        />

        <button
          onClick={onExtract}
          disabled={!file || loading}
          className={`mt-6 w-full py-3 px-4 rounded-xl font-bold text-white shadow-md flex items-center justify-center gap-2 transition-all ${
            !file || loading
              ? 'bg-indigo-300 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg active:scale-[0.98]'
          }`}
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" /> Memproses...
            </>
          ) : (
            <>
              <ChevronRight size={20} /> Ekstrak Sekarang
            </>
          )}
        </button>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-start gap-2 text-sm border border-red-100">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
      </div>

      <ResultArea
        mode={mode}
        loading={loading}
        resultText={resultText}
        resultTable={resultTable}
        onDownload={onDownload}
        onCopy={onCopy}
        copied={copied}
      />
    </div>
  );
}
