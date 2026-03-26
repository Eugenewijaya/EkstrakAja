import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EkstrakAja - Transform Images to Structured Data',
  description: 'Turn images, tables, and raw text into structured data using AI. Extract text, tables, and generate smart spreadsheets instantly.',
  keywords: 'extract text, OCR, table extraction, data extraction, spreadsheet generator, AI',
  authors: [{ name: 'Eugene Wijaya' }],
  creator: 'Eugene Wijaya',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://ekstrak-aja.vercel.app',
    siteName: 'EkstrakAja',
    title: 'EkstrakAja - Transform Images to Structured Data',
    description: 'Turn images, tables, and raw text into structured data using AI.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#4F46E5',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="bg-slate-50 font-sans text-slate-800">
        {children}
      </body>
    </html>
  );
}
