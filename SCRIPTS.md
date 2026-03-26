# Available NPM Scripts

## Development

### `npm run dev`
Runs the development server with hot module replacement (HMR).

```bash
npm run dev
# Starts at http://localhost:3000
# Auto-reloads on file changes
```

## Building

### `npm run build`
Creates an optimized production build.

```bash
npm run build
# Generates .next folder
# Analyzes bundle size
# Prepares for deployment
```

### `npm start`
Runs the production server (requires build first).

```bash
npm run build
npm start
# Starts at http://localhost:3000
# Uses optimized production code
```

## Code Quality

### `npm run lint`
Runs ESLint to check code quality.

```bash
npm run lint
# Shows linting errors/warnings
# Helps maintain code standards
```

## Project Scripts Reference

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `next dev` | Development server |
| `build` | `next build` | Production build |
| `start` | `next start` | Production server |
| `lint` | `next lint` | Code linting |

## Tips

### Running on Different Port

```bash
npm run dev -- -p 3001
# Runs on port 3001 instead of 3000
```

### Environment Variables

```bash
# Development uses .env.local
npm run dev

# Production uses .env.production (if exists)
npm start
```

### Debugging

```bash
# Run with debug output
DEBUG=* npm run dev

# Node inspector
node --inspect-brk node_modules/.bin/next dev
```

---

For more info, check:
- `npm run --help` - View all available scripts
- `docs/SETUP.md` - Full setup guide
- `README.md` - General information
