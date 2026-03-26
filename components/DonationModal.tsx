'use client';

import { X, Heart, Download } from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadQRIS: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function DonationModal({ isOpen, onClose, onDownloadQRIS }: DonationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-in fade-in zoom-in duration-300 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition"
        >
          <X size={20} />
        </button>

        <div className="p-8 text-center">
          <div className="inline-block bg-red-100 p-4 rounded-full mb-4">
            <Heart className="text-red-500" size={32} fill="currentColor" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Suka dengan EkstrakAja?</h2>
          <p className="text-slate-600 mb-6 text-sm leading-relaxed">
            Jika tool ini membantu kerjamu, pertimbangkan untuk mendukung developer kami dengan donasi.
            Setiap dukungan sangat berarti!
          </p>

          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-xl mb-6 border border-indigo-100">
            <p className="text-xs text-slate-500 mb-3 font-semibold">SCAN QRIS UNTUK DONASI</p>
            <div className="bg-white p-4 rounded-lg inline-block">
              <img
                src="https://i.ibb.co.com/JjfVVDsG/Whats-App-Interactive-2026-02-17-at-16-52-19.jpg"
                alt="QRIS Code"
                className="w-40 h-40 object-contain"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition"
            >
              Nanti Dulu
            </button>
            <button
              onClick={onDownloadQRIS}
              className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2"
            >
              <Download size={16} /> Unduh QRIS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
