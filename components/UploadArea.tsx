'use client';

import { useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface UploadAreaProps {
  previewUrl: string | null;
  onFileSelect: (file: File) => void;
  onClear: () => void;
  loading: boolean;
}

export function UploadArea({
  previewUrl,
  onFileSelect,
  onClear,
  loading,
}: UploadAreaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
    }
  };

  return (
    <div
      className={`flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-8 transition-colors ${
        previewUrl
          ? 'border-indigo-300 bg-indigo-50/50'
          : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'
      }`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => !previewUrl && fileInputRef.current?.click()}
    >
      {previewUrl ? (
        <div className="relative w-full h-full min-h-[250px] flex items-center justify-center group">
          <img
            src={previewUrl}
            alt="Preview"
            className="max-h-[300px] object-contain rounded-lg shadow-sm"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              className="bg-white text-slate-800 px-4 py-2 rounded-full font-medium text-sm hover:bg-slate-100 shadow-md flex items-center gap-2"
            >
              <X size={16} /> Ganti Gambar
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center cursor-pointer">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="text-indigo-600" size={28} />
          </div>
          <p className="text-slate-700 font-medium mb-1">Klik atau seret gambar ke sini</p>
          <p className="text-slate-500 text-sm">Mendukung JPG, PNG, WEBP</p>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
