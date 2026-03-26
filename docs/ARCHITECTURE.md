# Architecture - EkstrakAja

Penjelasan technical tentang arsitektur dan design pattern yang digunakan EkstrakAja.

## 🏗️ Overall Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Browser / Client                        │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    React Components                    │  │
│  │  (HeroSection, ExtractSection, SheetGenerator, etc)   │  │
│  └───────────────────────────────────────────────────────┘  │
│                           ↓                                   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Custom React Hooks (lib/)                │  │
│  │  (useExtraction, useSheetGenerator)                   │  │
│  └───────────────────────────────────────────────────────┘  │
│                           ↓                                   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │           Google Gemini API (Cloud)                   │  │
│  │  - Text extraction                                    │  │
│  │  - Table extraction                                   │  │
│  │  - Spreadsheet generation                            │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 📊 Data Flow

### Text Extraction Flow

```
User Upload Image
    ↓
UploadArea Component (handles file upload)
    ↓
useExtraction Hook (getBase64 + API call)
    ↓
Google Gemini API (process image)
    ↓
ExtractedText Result
    ↓
ResultArea Component (display + download)
```

### Sheet Generation Flow

```
User Configure Sheet
    ↓
SheetGenerator Component (form inputs)
    ↓
useSheetGenerator Hook (generate prompt)
    ↓
Google Gemini API (generate JSON)
    ↓
Parse JSON Response
    ↓
SheetGenerator Component (preview)
    ↓
Download as Excel
```

## 🎯 Component Hierarchy

```
Page (app/page.tsx) - Main orchestrator
├── HeroSection - Welcome screen
├── ExtractSection - Text/Table extraction UI
│   ├── UploadArea - File upload input
│   └── ResultArea - Results display
├── SheetGenerator - Spreadsheet generator UI
│   ├── Config form
│   └── Preview area
└── DonationModal - Support popup
```

## 📚 Component Responsibilities

### HeroSection.tsx
- Displays welcome/hero message
- Triggers tool visibility
- Shows privacy banner
- Single entry point untuk user

### UploadArea.tsx
- Handles file input & drag-drop
- Preview uploaded image
- Clear/change image button

### ResultArea.tsx
- Display extracted text atau table
- Copy to clipboard button
- Download button
- Loading state

### ExtractSection.tsx
- Container untuk upload + result
- Manage extraction UI workflow
- Pass props ke child components

### SheetGenerator.tsx
- Template/custom mode toggle
- Configuration form (colors, formulas, etc)
- Result preview
- Download Excel button

### DonationModal.tsx
- Donation prompt popup
- QRIS code display
- Download QRIS button
- Close button

## 🔧 Hooks Architecture

### useExtraction.ts

```typescript
Interface:
- loading: boolean
- error: string
- setError: (error: string) => void
- extractText: (file: File) => Promise<ExtractResult | null>
- extractTable: (file: File) => Promise<ExtractResult | null>

Key Functions:
- getBase64(): Convert File to Base64
- fetchWithRetry(): API call dengan retry logic
- extractText(): Ekstrak teks dengan Gemini
- extractTable(): Ekstrak tabel dengan Gemini
```

### useSheetGenerator.ts

```typescript
Interface:
- loading: boolean
- error: string
- setError: (error: string) => void
- generateSheet: (config: SheetConfig) => Promise<GeneratedSheet | null>

Key Functions:
- fetchWithRetry(): API call dengan retry logic
- generateSheet(): Generate spreadsheet structure via Gemini
```

## 📦 State Management

Menggunakan React's built-in hooks:

```typescript
// In Page component
- showTool: toggle tool visibility
- mode: 'text' | 'table' | 'sheet'
- showDonation: donation modal visibility
- copied: clipboard copy feedback
- file: selected file
- previewUrl: image preview URL
- resultText: extracted text
- resultTable: extracted table data
- sheetConfig: sheet generator configuration
- resultSheet: generated sheet result
```

**Why no external state management?**
- Aplikasi ini relati sederhana dengan state yang terlokalisir
- Redux/Zustand akan add unnecessary complexity
- React's useState + useRef sudah cukup

## 🔐 Security

### Stored Secrets
- API Key disimpan di `.env.local` (NOT pushed to git)
- Using `NEXT_PUBLIC_` prefix karena client-side access diperlukan
- **Consider rate limiting & monitoring di production**

### Data Privacy
- Data gambar/tabel TIDAK disimpan di server lokal
- Langsung di-process oleh Gemini API
- Gemini might cache untuk optimization, check terms

### Input Validation
- File type checking (image/* only)
- Base64 encoding untuk API transport
- JSON parsing dengan try-catch

## 🎨 Styling Approach

Using **Tailwind CSS** dengan:

```
- Semantic color classes (indigo, slate, green, etc)
- Responsive design (mobile-first)
- Custom animations di globals.css
- No custom CSS files needed (all in JSX)
```

## 🚀 Performance Optimizations

1. **Code Splitting**
   - Each component in separate file
   - Next.js automatic code splitting

2. **Image Optimization**
   - User uploaded images dalam <img> tag (browser optimized)
   - External QRIS image (lazy loaded)

3. **API Retry Logic**
   - Exponential backoff untuk rate limiting
   - Max 3 retries dengan delay

4. **Lazy Loading**
   - Components rendered conditionally (showTool state)
   - DonationModal hanya render jika open

## 🔄 File Download Strategy

Menggunakan browser's download API:

```typescript
// Pattern digunakan di download functions:
1. Create <a> element
2. Create Blob dari content
3. Set href ke ObjectURL
4. Trigger click()
5. Cleanup element & URL
```

## 🌐 API Integration

**Google Gemini API**
```
Endpoint: generativelanguage.googleapis.com/v1beta/models/{model}:generateContent
Method: POST
Auth: API Key in query param (?key=...)
Model: gemini-2.5-flash-preview-09-2025
```

**Request Format**
```json
{
  "contents": [{
    "role": "user",
    "parts": [
      { "text": "prompt here" },
      { "inlineData": { "mimeType": "...", "data": "base64..." } }
    ]
  }]
}
```

## 📋 Type System

Using **TypeScript** untuk type safety:

```typescript
// Custom interfaces di lib/useSheetGenerator.ts
- SheetData: sheet configuration
- GeneratedSheet: API response format
- SheetConfig: form configuration

// Native types
- React.ChangeEvent, React.MouseEvent, etc
- Exclude null dengan non-null assertions
```

## 🧪 Testing Strategy

(Belum diimplementasi, suggestions untuk future)

```typescript
// Unit tests untuk hooks
- Test API call dengan mock fetch
- Test error handling
- Test retry logic

// Component tests
- Test file upload
- Test form submissions
- Test conditional rendering

// E2E tests
- Full extraction flow
- Sheet generation flow
- Download functionality
```

## 🔗 Dependencies

Minimal & well-maintained:

```json
{
  "next": "^14.0.0",        // Framework
  "react": "^18.2.0",       // Library
  "react-dom": "^18.2.0",   // DOM binding
  "lucide-react": "^0.263", // Icons
  "tailwindcss": "^3.3",    // Styling
  "typescript": "^5.3"      // Type checking
}
```

## 📈 Scalability Notes

Jika perlu scale:

1. **Extract API logic ke backend**
   - Hide API key di backend
   - Implement rate limiting
   - Add database untuk history/cache

2. **Add authentication**
   - User accounts
   - Quota management
   - Usage analytics

3. **Implement caching**
   - Redis untuk recent extractions
   - Database untuk user results

4. **Split components lebih banyak**
   - Create separate pages
   - Extract reusable component library

---

**Last Updated:** 2025-03-26
**Architecture Version:** 1.0
