'use client';

import { ChevronRight, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <>
      <header className="bg-gradient-to-br from-indigo-700 to-blue-600 text-white pt-20 pb-20 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-white/20 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider mb-6 backdrop-blur-sm border border-white/30">
            EkstrakAja
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            Ubah Gambar & Teks Mentah<br />
            Menjadi Data Terstruktur
          </h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 pb-20 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 border border-slate-100">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
            Halo! Kenalin, ini EkstrakAja.
          </h2>
          <div className="text-slate-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed space-y-4">
            <p>
              Sering dapet foto tabel buram terus pusing karena harus nyalin manual ke Excel? Atau mungkin punya catatan teks kepanjangan yang pengen dirapihin jadi format digital?
            </p>
            <p>
              Tenang aja... Web ini emang sengaja dibikin buat ngeberesin masalah-masalah <i>nyebelin</i> kayak gitu! Tinggal <i>upload</i> gambarnya, kasih tau AI-nya mau diapain, dan... kelar deh! Kerjaan beres, kamu bisa lanjut rebahan.
            </p>
          </div>

          {/* PRIVACY BANNER */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 my-8 mx-auto max-w-2xl flex flex-col md:flex-row items-center md:items-start gap-4 shadow-sm text-left">
            <div className="bg-orange-100 text-orange-500 p-3 rounded-full flex-shrink-0">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h4 className="font-bold text-orange-800">Privasi Super Aman!</h4>
              <p className="text-sm text-orange-700 leading-relaxed mt-1">
                Data kamu 100% aman dan <strong>nggak kami simpan</strong> sama sekali ke database. Boro-boro mau nyimpen data pengguna, <i>developer</i> kami aja kerjaannya cuma scroll fesbuk doang seharian.
              </p>
            </div>
          </div>

          <button
            onClick={onGetStarted}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center gap-2 mx-auto text-lg"
          >
            Mulai Gunakan Alatnya <ChevronRight />
          </button>
        </div>
      </main>
    </>
  );
}
