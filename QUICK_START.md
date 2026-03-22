# Marp Live - Quick Start Guide

## Installation

```bash
cd /home/marco/Projects/personal/marp-live
pnpm install
```

## Development

```bash
pnpm dev
```

Open http://localhost:5173 in your browser. The editor will auto-reload on file changes.

## Building for Production

```bash
pnpm build
pnpm preview
```

This creates an optimized bundle in `dist/` ready for deployment.

## Commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start dev server (auto-reload on port 5173) |
| `pnpm build` | Build production bundle to `dist/` |
| `pnpm preview` | Preview production build locally |
| `pnpm test --run` | Run all tests once |
| `pnpm test` | Run tests in watch mode |
| `pnpm lint` | Check code style |
| `pnpm type-check` | Check TypeScript types |

## Features

✅ **Live Markdown Editor** - Edit slides in real-time  
✅ **Instant Preview** - See changes instantly  
✅ **Mermaid Diagrams** - Render flowcharts and diagrams  
✅ **Themes** - Toggle between light/dark modes  
✅ **Export** - Download slides as HTML  
✅ **Responsive** - Works on desktop and mobile  

## Example Markdown

```markdown
# Title Slide

---

## Slide 2

- Bullet point 1
- Bullet point 2

---

## Diagram Example

\`\`\`mermaid
graph LR
    A[Start] --> B[Process] --> C[End]
\`\`\`

---

## Code Block

\`\`\`javascript
const greeting = 'Hello, Slides!';
console.log(greeting);
\`\`\`
```

## Project Structure

```
src/
  ├── App.svelte                 # Main app with theme & layout
  ├── components/
  │   ├── Editor.svelte          # Markdown editor
  │   └── Preview.svelte         # Slide preview (iframe)
  ├── lib/
  │   ├── marp.ts                # Rendering engine
  │   └── __tests__/
  │       └── marp.test.ts       # Unit tests
  ├── main.ts                    # Entry point
  └── styles.css                 # Global styles

index.html                        # HTML template
package.json                      # Dependencies
vite.config.ts                    # Build config
tsconfig.json                     # TypeScript config
AGENTS.md                         # Development guidelines
```

## Architecture

1. **Editor Component** - Textarea with markdown syntax
2. **Marp Engine** - Converts markdown → HTML slides
3. **Mermaid Support** - Processes diagram blocks before rendering
4. **Preview iframe** - Sandboxed rendering for security
5. **Theme System** - CSS-based light/dark mode

## Debugging

**Dev server won't start?**
```bash
rm -rf node_modules
pnpm install
pnpm dev
```

**Build errors?**
```bash
pnpm type-check    # Check for TypeScript errors
pnpm lint           # Check code style
```

**Tests failing?**
```bash
pnpm test --run     # Run once to see full output
```

## Performance Notes

- Marp Core (3.5 MB) and Mermaid (300 KB) are code-split
- Editor updates are reactive via Svelte stores
- Preview renders in iframe to prevent layout thrashing
- CSS-in-JS for dynamic theming

## Browser Support

Modern browsers with ES2020 support:
- Chrome 91+
- Firefox 89+
- Safari 14+
- Edge 91+

## License

MIT
