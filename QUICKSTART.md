# 🚀 Quick Start - EkstrakAja

Ingin langsung mulai? Ikuti panduan singkat ini.

## ⏱️ 5 Minutes Setup

### 1️⃣ Clone & Install (2 min)

```bash
# Clone or download project
cd EkstrakAja

# Install dependencies
npm install
```

### 2️⃣ Get API Key (2 min)

1. Go to https://aistudio.google.com/app/apikeys
2. Click "Create API key"
3. Copy the key
4. Create file `.env.local` in root folder:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=paste_your_key_here
   ```

### 3️⃣ Run & Enjoy! (1 min)

```bash
npm run dev
# Opens at http://localhost:3000
```

Done! 🎉

---

## 📖 What Can You Do?

### 🖼️ Extract Text from Images
1. Upload image
2. Select "Ekstrak Teks Biasa"
3. Click "Ekstrak Sekarang"
4. Download as TXT

### 📊 Extract Tables from Images
1. Upload table image
2. Select "Ekstrak Tabel Gambar"
3. Click "Ekstrak Sekarang"
4. Download as CSV

### 📑 Generate Spreadsheets
1. Select "Pembuat Sheet Pintar"
2. Choose template or custom data
3. Configure formatting
4. Click "Buat Spreadsheet Otomatis"
5. Download as Excel

---

## 🔗 Common Tasks

### Change Port
```bash
npm run dev -- -p 3001
```

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
npx vercel
# Follow prompts
```

### Check for Errors
```bash
npm run lint
```

---

## 🆘 Troubleshooting

### "API key not found"
- Check `.env.local` exists in root
- Verify key is pasted correctly
- Restart `npm run dev`

### "Port 3000 already in use"
```bash
npm run dev -- -p 3001
```

### "Module not found"
```bash
rm -rf node_modules
npm install
```

### "TypeScript errors"
- Check file has proper types
- Run `npm run lint` to see issues
- Check docs/ARCHITECTURE.md

---

## 📚 Next Steps

### Learn More
- Read [README.md](README.md) - Full documentation
- Check [docs/SETUP.md](docs/SETUP.md) - Detailed setup
- See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) - Technical deep dive

### Modify Code
- Components in `components/`
- Logic hooks in `lib/`
- Styles in `app/globals.css`

### Deploy
- GitHub → Vercel (automatic deployment)
- OR `npx vercel` (manual deployment)

### Contribute
- Fork repository
- Check [CONTRIBUTING.md](CONTRIBUTING.md)
- Submit pull request

---

## 💡 Pro Tips

### Speed Up Install
```bash
# Use pnpm instead of npm (faster)
npm install -g pnpm
pnpm install
pnpm run dev
```

### Multiple Instances
```bash
# Terminal 1 (dev)
npm run dev

# Terminal 2 (linting)
npm run lint -- --watch
```

### Debug
```bash
# See more logs
DEBUG=* npm run dev

# Or in VSCode
# F5 to debug
```

---

## 🎯 Project Structure at a Glance

```
Components       → UI rendering
Hooks (lib/)     → Business logic
Utils (lib/)     → Helper functions
Styles           → Tailwind CSS
Config           → Build configuration
Docs             → Documentation
```

---

## ❓ Quick FAQ

**Q: Do you store my images?**
A: No! Images go straight to Google Gemini API. We don't store anything.

**Q: Is my API key safe?**
A: Yes! It's stored in `.env.local` (not committed to git).

**Q: Can I use this commercially?**
A: Yes! MIT License allows commercial use.

**Q: What if API fails?**
A: Auto-retry logic kicks in. Check your API quota if it keeps failing.

---

## 🚀 Deploy in 1 Click

### GitHub → Vercel (Recommended)
1. Push code to GitHub
2. Go to https://vercel.com/
3. Import your GitHub repo
4. Add `NEXT_PUBLIC_GEMINI_API_KEY` in environment
5. Deploy!

**Done!** Vercel will auto-deploy on every push.

---

## 📞 Need Help?

- 📖 Read docs/SETUP.md
- 🐛 Check troubleshooting section above
- 💬 Open issue on GitHub
- 📧 Contact developer

---

**Happy coding! 🎉**

For detailed info, see [README.md](README.md)
