# Marp Live - Markdown Slide Editor

A lightweight MVP for creating presentations with Markdown, built with Svelte, Vite, and Marp Core.

## Features

- **Live Editor**: Edit Markdown in a split-screen editor
- **Real-time Preview**: See slide changes instantly in an iframe
- **Mermaid Support**: Render diagrams directly from code blocks
- **Theme Support**: Light and dark themes
- **Export**: Download presentations as HTML
- **Responsive**: Adapts to different screen sizes

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server (port 5173)
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test
```

## Project Layout

```
src/
├── App.svelte           # Main app with layout & theme toggle
├── components/
│   ├── Editor.svelte    # Markdown editor component
│   └── Preview.svelte   # Slide preview (iframe)
├── lib/
│   └── marp.ts          # Marp rendering engine
├── main.ts              # Entry point
└── styles.css           # Global styles

index.html               # HTML template
vite.config.ts           # Vite config
tsconfig.json            # TypeScript config
package.json             # Dependencies
AGENTS.md                # Coding guidelines for agents
```

## Development

For detailed coding guidelines, build commands, and best practices, see [AGENTS.md](./AGENTS.md).

### Common Commands

```bash
pnpm dev              # Start dev server
pnpm lint             # Lint code
pnpm type-check       # Check types
pnpm test             # Run tests
pnpm test:ui          # Test UI dashboard
```

### Writing Slides

Use standard Markdown with `---` for slide breaks:

```markdown
# Title Slide

---

## Slide 2

- Bullet point
- Another point

---

## Mermaid Diagram

\`\`\`mermaid
graph LR
    A[Start] --> B[End]
\`\`\`
```

## Tech Stack

- **Svelte 4**: Lightweight UI framework
- **Vite 5**: Lightning-fast build tool
- **TypeScript**: Type-safe development
- **Marp Core**: Markdown presentation engine
- **Mermaid**: Diagram rendering
- **Shiki**: Syntax highlighting
- **Vitest**: Unit testing
- **ESLint**: Code linting

## Notes

- Slides render in a sandboxed iframe for security
- Mermaid diagrams are processed before Marp rendering
- Theme applies globally via `data-theme` attribute
- All styles are scoped to prevent conflicts

## License

MIT
