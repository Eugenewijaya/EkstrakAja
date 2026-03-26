# 📄 EkstrakAja

Transform images, tables, and raw text into structured data using AI. Extract text, generate smart spreadsheets, and download results in multiple formats.

## ✨ Features

- **Text Extraction** - Extract text from images using AI
- **Table Extraction** - Convert table images to CSV/Excel format
- **Smart Sheet Generator** - Generate customized spreadsheets from templates or raw data
- **Multiple Export Formats** - Download as TXT, CSV, or Excel (.xls)
- **Privacy First** - No data is stored on our servers
- **Fast & Reliable** - Powered by Google's Gemini AI

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm/yarn/bun
- Google Gemini API Key ([Get it here](https://aistudio.google.com/app/apikeys))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/eugenewijaya/EkstrakAja.git
   cd ekstrak-aja
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your Gemini API key:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
ekstrak-aja/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles
├── components/
│   ├── HeroSection.tsx     # Welcome/hero section
│   ├── ExtractSection.tsx  # Text/table extraction UI
│   ├── UploadArea.tsx      # File upload component
│   ├── ResultArea.tsx      # Results display component
│   ├── SheetGenerator.tsx  # Spreadsheet generator UI
│   └── DonationModal.tsx   # Donation modal component
├── lib/
│   ├── useExtraction.ts    # Text/table extraction hook
│   └── useSheetGenerator.ts # Sheet generation hook
├── public/                 # Static assets
├── package.json
├── tailwind.config.ts
├── next.config.mjs
└── tsconfig.json
```

## 🔧 Usage

### Text Extraction
1. Click "Mulai Gunakan Alatnya"
2. Select the "Ekstrak Teks Biasa" tab
3. Upload an image containing text
4. Click "Ekstrak Sekarang"
5. View, copy, or download the extracted text

### Table Extraction
1. Select the "Ekstrak Tabel Gambar" tab
2. Upload an image with a table
3. Click "Ekstrak Sekarang"
4. Download as CSV or copy the table

### Sheet Generation
1. Select the "Pembuat Sheet Pintar" tab
2. Choose between template or custom mode
3. Configure formatting options (color, font, formulas, etc.)
4. Click "Buat Spreadsheet Otomatis"
5. Download as Excel file

## 🛠️ Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Google Gemini AI** - Image processing & text generation

## 📦 Build & Deploy

### Build for production
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
npx vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## 🔐 Environment Variables

- `NEXT_PUBLIC_GEMINI_API_KEY` - Your Google Gemini API key (required)

Note: This variable is public because it's prefixed with `NEXT_PUBLIC_`. Keep your API key safe and consider rate limiting.

## 📝 API Information

EkstrakAja uses the following Google Gemini API endpoint:
- Model: `gemini-2.5-flash-preview-09-2025`
- Endpoint: `generativelanguage.googleapis.com`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 💝 Support

If you find this tool helpful, consider supporting the developer:
- [QRIS Donation](https://i.ibb.co.com/JjfVVDsG/Whats-App-Interactive-2026-02-17-at-16-52-19.jpg)

## 🐛 Troubleshooting

### API Key Error
- Make sure your `.env.local` file is set up correctly
- Verify your Gemini API key is valid at https://aistudio.google.com/app/apikeys
- Check that the API key has quotas available

### Upload Issues
- Ensure the image format is JPG, PNG, or WEBP
- Make sure the image file size is reasonable (under 4MB recommended)
- Clear browser cache if you encounter persistent issues

### Extraction Problems
- Ensure the image is clear and well-lit
- Try uploading a higher resolution image
- For tables, make sure the table structure is clearly visible

## 📧 Contact

For questions or feedback, reach out to Eugene Wijaya or open an issue in the repository.

---

**Happy extracting! 🎉**
