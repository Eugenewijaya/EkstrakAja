# Project Structure - EkstrakAja

Penjelasan lengkap struktur folder dan file dalam project EkstrakAja.

## 📁 Complete Directory Tree

```
EkstrakAja/
│
├── 📂 app/                          # Next.js App Router
│   ├── layout.tsx                  # Root layout with metadata
│   ├── page.tsx                    # Main page (orchestrator)
│   └── globals.css                 # Global styles & animations
│
├── 📂 components/                  # React Components
│   ├── HeroSection.tsx            # Welcome screen component
│   ├── ExtractSection.tsx         # Extraction UI container
│   ├── UploadArea.tsx             # File upload component
│   ├── ResultArea.tsx             # Results display component
│   ├── SheetGenerator.tsx         # Spreadsheet generator UI
│   └── DonationModal.tsx          # Donation popup component
│
├── 📂 lib/                         # Utilities & Hooks
│   ├── useExtraction.ts           # Text/table extraction hook
│   ├── useSheetGenerator.ts       # Sheet generation hook
│   ├── downloadHelpers.ts         # Download utility functions
│   └── constants.ts               # Application constants
│
├── 📂 docs/                        # Documentation
│   ├── SETUP.md                   # Setup guide for developers
│   └── ARCHITECTURE.md            # Technical architecture
│
├── 📂 public/                      # Static assets
│   └── .gitkeep                   # Keep folder in git
│
├── 📄 Configuration Files
│   ├── package.json               # Dependencies & scripts
│   ├── tsconfig.json              # TypeScript configuration
│   ├── tailwind.config.ts         # Tailwind CSS configuration
│   ├── next.config.mjs            # Next.js configuration
│   ├── postcss.config.mjs         # PostCSS configuration
│   └── vercel.json                # Vercel deployment config
│
├── 📝 Documentation Files
│   ├── README.md                  # Main documentation
│   ├── CONTRIBUTING.md            # Contribution guidelines
│   ├── SCRIPTS.md                 # NPM scripts reference
│   └── PROJECT_STRUCTURE.md       # This file
│
├── 🔐 Environment
│   ├── .env.local.example         # Template for environment vars
│   ├── .env.local                 # Actual env vars (git ignored)
│   ├── .gitignore                 # Git ignore rules
│   └── .eslintrc.json             # ESLint configuration
│
└── 📁 node_modules/               # Dependencies (git ignored)
```

## 📄 File Descriptions

### Core Application

#### `app/layout.tsx`
- Root layout component
- Metadata untuk SEO
- Viewport configuration
- HTML structure

#### `app/page.tsx`
- Main orchestrator component
- State management untuk entire app
- Integrates semua sub-components
- Handles data flow antara components

#### `app/globals.css`
- Global Tailwind directives
- Custom animations (fade-in, slide, zoom)
- Base HTML styles
- Reusable animation classes

### Components

#### `components/HeroSection.tsx`
- Welcome/intro screen
- Privacy banner
- Call-to-action button
- Shows sebelum user klik "Mulai"

#### `components/ExtractSection.tsx`
- Container untuk text/table extraction
- Integrates UploadArea & ResultArea
- Passes props & callbacks

#### `components/UploadArea.tsx`
- File input & drag-drop handling
- Image preview
- Clear/change button

#### `components/ResultArea.tsx`
- Displays extracted text atau table
- Copy to clipboard functionality
- Download button
- Loading states

#### `components/SheetGenerator.tsx`
- Template/custom mode toggle
- Configuration form
- Preview spreadsheet
- Download Excel button

#### `components/DonationModal.tsx`
- Modal popup untuk donation
- QRIS code display
- Download QRIS button

### Utility Functions & Hooks

#### `lib/useExtraction.ts`
- Custom hook untuk text/table extraction
- Handles Base64 encoding
- API call dengan retry logic
- State management (loading, error)

#### `lib/useSheetGenerator.ts`
- Custom hook untuk sheet generation
- Prompt construction
- JSON parsing
- Error handling

#### `lib/downloadHelpers.ts`
- `downloadFile()` - Generic file download
- `downloadImage()` - Download image dengan fallback
- `generateCsvContent()` - Create CSV format
- `generateExcelHtml()` - Create Excel HTML format

#### `lib/constants.ts`
- `SHEET_TEMPLATES` - Available templates
- `FONT_STYLES` - Font options
- `EXTRACTION_PROMPTS` - AI prompts
- `API_CONFIG` - API settings
- `DONATION_QRIS_URL` - QRIS code URL
- `POPUP_CONFIG` - Donation popup timing

### Configuration Files

#### `package.json`
- Project metadata
- Dependencies (react, next, tailwind, etc)
- DevDependencies (typescript, eslint)
- Scripts untuk dev, build, start, lint

#### `tsconfig.json`
- TypeScript compiler options
- Module resolution
- Path aliases (@/*)
- Strict mode enabled

#### `tailwind.config.ts`
- Tailwind CSS configuration
- Content paths untuk scanning
- Theme extensions
- Color definitions

#### `next.config.mjs`
- Next.js specific settings
- React Strict Mode
- SWC minification

#### `postcss.config.mjs`
- PostCSS plugins
- Tailwind CSS integration
- Autoprefixer

#### `vercel.json`
- Vercel deployment config
- Build/dev commands
- Framework detection
- Environment variable definitions

### Documentation

#### `README.md`
- Project overview
- Features list
- Getting started guide
- Usage examples
- Troubleshooting
- Contact information

#### `docs/SETUP.md`
- Step-by-step setup guide
- Prerequisites
- API key configuration
- Installation instructions
- Running locally
- Deployment guides
- Troubleshooting

#### `docs/ARCHITECTURE.md`
- Architecture overview
- Data flow diagrams
- Component hierarchy
- Hook interfaces
- State management explanation
- Security considerations
- Performance optimizations
- API integration details
- Type system
- Dependencies list
- Scalability notes

#### `CONTRIBUTING.md`
- Code of conduct
- How to contribute
- Commit message format
- Code style guidelines
- Bug reporting template
- Feature request template
- Testing guidelines
- Checklist before submitting

#### `SCRIPTS.md`
- Available NPM scripts
- Script descriptions
- Usage examples
- Tips & tricks

### Environment & Git

#### `.env.local.example`
- Template file untuk environment variables
- Contains: `NEXT_PUBLIC_GEMINI_API_KEY`
- Safe to commit (no actual secrets)

#### `.env.local`
- Actual environment variables
- Created locally by developers
- Contains: actual API key
- Should NOT be committed (in .gitignore)

#### `.gitignore`
- Node modules
- Build outputs (.next/)
- Environment files (.env.local)
- IDE files (.vscode, .idea)
- OS files (.DS_Store)

#### `.eslintrc.json`
- ESLint configuration
- Uses Next.js recommended config

## 🔄 Component Relationships

```
page.tsx (Main Orchestrator)
│
├─ HeroSection
│  └─ Shows welcome screen
│
├─ ToolSection (conditional)
│  ├─ ExtractSection (mode: text/table)
│  │  ├─ UploadArea
│  │  └─ ResultArea
│  │
│  └─ SheetGenerator (mode: sheet)
│     ├─ Config Form
│     └─ Preview Area
│
└─ DonationModal
   └─ Shows occasionally
```

## 📊 Data Flow

```
User Interaction
     ↓
Component Event Handler
     ↓
Custom Hook (useExtraction/useSheetGenerator)
     ↓
API Call (Google Gemini)
     ↓
Parse Response
     ↓
Update State
     ↓
Component Re-render
     ↓
Display Results
```

## 🎯 Key Design Principles

1. **Separation of Concerns**
   - Components handle UI
   - Hooks handle logic
   - Utilities handle common functions

2. **Single Responsibility**
   - Each component has one purpose
   - Each hook handles one feature

3. **Type Safety**
   - Full TypeScript usage
   - Explicit interfaces for data
   - No `any` types

4. **Reusability**
   - Components are modular
   - Hooks are generic
   - Utilities are standalone

5. **Performance**
   - Lazy loading components
   - Optimized re-renders
   - Minimal dependencies

## 🚀 Code Organization Tips

### Adding New Feature

1. Create component di `components/`
2. Create hook di `lib/` jika butuh logic
3. Import di `page.tsx`
4. Update documentation

### Adding New Utility

1. Create file di `lib/`
2. Export function/constant
3. Use dengan import path (@/lib/...)
4. Add JSDoc comments

### Updating Styles

1. Use Tailwind classes di JSX
2. Add custom animations di `globals.css` jika perlu
3. Extend theme di `tailwind.config.ts` jika perlu color/font

## 📦 File Size Reference

Typical file sizes (rough estimates):
- `page.tsx` - ~15-20 KB
- `useExtraction.ts` - ~6-8 KB
- Each component - ~3-5 KB
- Total source code - ~80-100 KB (before node_modules)

## ✅ Checklist for New Features

- [ ] Component created in `components/`
- [ ] Hook created in `lib/` (if needed)
- [ ] Types defined properly
- [ ] Error handling added
- [ ] Loading states implemented
- [ ] Documentation updated
- [ ] README.md updated (if user-facing)
- [ ] Tested locally

---

**Last Updated:** 2025-03-26
**Project Version:** 1.0.0
