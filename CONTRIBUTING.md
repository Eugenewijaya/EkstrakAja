# Contributing to EkstrakAja

Terima kasih telah tertarik untuk berkontribusi pada EkstrakAja! 🎉

## 📋 Code of Conduct

- Be respectful dan inclusive
- Welcome all contributions
- Focus on ideas, not individuals
- Report issues constructively

## 🚀 How to Contribute

### 1. Fork Repository

```bash
# Fork di GitHub, then
git clone https://github.com/YOUR_USERNAME/EkstrakAja.git
cd EkstrakAja
```

### 2. Create Feature Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b bugfix/your-bug-fix
```

### 3. Make Changes

- Follow existing code style
- Use TypeScript for type safety
- Keep commits clean and logical
- Write descriptive commit messages

### 4. Test Locally

```bash
npm run dev
# Test your changes at http://localhost:3000
```

### 5. Commit & Push

```bash
git add .
git commit -m "feat: Add your feature description"
git push origin feature/your-feature-name
```

### 6. Create Pull Request

- Go to GitHub repository
- Click "New Pull Request"
- Add description of changes
- Wait for review

## 📝 Commit Message Format

Follow conventional commits:

```
feat: Add new feature
fix: Fix bug description
docs: Update documentation
refactor: Refactor code structure
style: Format code
test: Add tests
chore: Update dependencies
```

## 🎨 Code Style Guidelines

### TypeScript/React

```typescript
// Use const for components
export function MyComponent() {
  // Use functional components
  return <div>Content</div>;
}

// Use proper typing
interface Props {
  title: string;
  count?: number;
}

// Use descriptive names
const handleButtonClick = () => {};
const [isLoading, setIsLoading] = useState(false);
```

### File Organization

```
components/          # Keep components modular & focused
├── UploadArea.tsx   # One component per file
├── ResultArea.tsx   # Named exports
└── ...

lib/                 # Utility functions & hooks
├── useExtraction.ts
├── useSheetGenerator.ts
└── constants.ts     # Centralize constants
```

### Tailwind CSS

```typescript
// Use Tailwind utilities
className="p-4 bg-slate-50 rounded-lg"

// Avoid arbitrary values when possible
// ✗ className="p-[16px]"
// ✓ className="p-4"

// Use responsive prefixes
className="md:grid-cols-2 lg:grid-cols-3"
```

## 🐛 Reporting Bugs

Create an issue dengan:

1. **Clear title** - Describe the bug
2. **Steps to reproduce** - How to trigger it
3. **Expected behavior** - What should happen
4. **Actual behavior** - What actually happens
5. **Screenshots** - If applicable
6. **Environment** - Node version, browser, etc

**Example:**
```
Title: Text extraction fails with non-ASCII characters

Steps:
1. Upload image with non-ASCII text
2. Click "Ekstrak Sekarang"
3. Error appears

Expected: Text extracted correctly
Actual: Error message shown
```

## 💡 Suggesting Features

Create an issue dengan:

1. **Clear description** - What feature to add
2. **Why needed** - Use case & benefit
3. **Examples** - How it would work
4. **Alternatives** - Other solutions considered

## 🧪 Testing Guidelines

### Manual Testing

Before submitting PR, test:

- [ ] Text extraction works
- [ ] Table extraction works
- [ ] Sheet generation works
- [ ] File downloads work
- [ ] All buttons functional
- [ ] Responsive on mobile
- [ ] No console errors

### Code Quality

- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Proper error handling
- [ ] User feedback (loading states, errors)

## 📚 Documentation

- Update README.md jika feature baru
- Add comments untuk complex logic
- Keep docs/ARCHITECTURE.md updated
- Update docs/SETUP.md jika ada perubahan setup

## 🔄 Review Process

1. Maintainer will review PR
2. May request changes
3. Once approved, merge to main
4. Feature deployed di next release

## 🎯 Priority Areas for Contribution

- [ ] Add unit tests
- [ ] Add E2E tests
- [ ] Optimize performance
- [ ] Improve error handling
- [ ] Add dark mode
- [ ] Add more sheet templates
- [ ] Localization (other languages)
- [ ] Accessibility improvements

## ✅ Checklist Before Submitting

- [ ] Code follows style guidelines
- [ ] Self-reviewed changes
- [ ] Tested locally
- [ ] No console errors/warnings
- [ ] Updated relevant documentation
- [ ] Commit messages are descriptive
- [ ] No breaking changes (or documented)

## 🤔 Questions?

- Check existing issues
- Read docs/ARCHITECTURE.md
- Create a discussion issue
- Reach out to maintainers

## 📜 License

By contributing, you agree your code will be under the MIT License.

---

**Happy contributing! 🚀**
