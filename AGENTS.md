# Marp Live - Agent Guidelines

This document provides build/test commands, code style guidelines, and best practices for agentic coding in the marp-live repository.

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Build & Development Commands

### Development
```bash
pnpm dev          # Start Vite dev server (auto-reload on port 5173)
```

### Production
```bash
pnpm build        # Build optimized production bundle to dist/
pnpm preview      # Preview production build locally
```

### Testing & Quality
```bash
pnpm test         # Run all tests (Vitest)
pnpm test:ui      # Run tests with UI dashboard
pnpm lint         # Lint TypeScript and Svelte files
pnpm type-check   # Check TypeScript types without emitting
```

### Running Single Tests
```bash
# Run specific test file
pnpm test src/lib/__tests__/marp.test.ts

# Run tests matching pattern
pnpm test -t "renderMarp"

# Run tests in watch mode
pnpm test --watch

# Run with UI for interactive debugging
pnpm test:ui
```

## Project Structure

```
src/
  ├── App.svelte              # Root component with layout & theme
  ├── main.ts                 # Entry point
  ├── styles.css              # Global styles
  ├── components/
  │   ├── Editor.svelte       # Markdown editor (textarea)
  │   └── Preview.svelte      # Slide preview (iframe)
  └── lib/
      └── marp.ts             # Marp rendering logic
index.html                     # HTML entry point
vite.config.ts                 # Vite configuration
tsconfig.json                  # TypeScript configuration
package.json                   # Dependencies & scripts
```

## Code Style Guidelines

### TypeScript

**File Naming**: Use kebab-case for files (`marp.ts`, `editor.svelte`). Use camelCase for imports/exports.

```ts
// ✓ Good
export function renderMarp(markdown: string): Promise<string> { }

// ✗ Avoid
export function RenderMarp(markdown: String): any { }
```

**Type Annotations**: Always use explicit types. Leverage strict mode.

```ts
// ✓ Good
function processMarkdown(content: string, theme: 'light' | 'dark'): string {
  return content;
}

// ✗ Avoid - implicit types
function processMarkdown(content, theme) {
  return content;
}
```

**Error Handling**: Use try-catch with proper error context. Never silently fail.

```ts
// ✓ Good
async function renderMarp(markdown: string): Promise<string> {
  try {
    const result = await marp.render(markdown);
    return result;
  } catch (error) {
    console.error('Error rendering slides:', error);
    throw new Error(`Marp rendering failed: ${String(error)}`);
  }
}

// ✗ Avoid - silent failures
async function renderMarp(markdown: string): Promise<string> {
  try {
    return await marp.render(markdown);
  } catch { }
  return '';
}
```

**Naming Conventions**:
- Functions: `camelCase` (e.g., `renderMarp`, `processMermaidBlocks`)
- Constants: `SCREAMING_SNAKE_CASE` (e.g., `MAX_CONTENT_LENGTH`)
- Private functions: Prefix with `_` or use `#` (e.g., `_escapeHtml()`)
- Booleans: Prefix with `is`, `has`, `can` (e.g., `isLoading`, `hasError`)

### Svelte Components

**File Naming**: PascalCase (e.g., `Editor.svelte`, `Preview.svelte`)

**Component Props**: Always declare with `export let` and type them.

```svelte
<script lang="ts">
  // ✓ Good
  export let markdown: Writable<string>;
  export let theme: 'light' | 'dark' = 'light';

  // ✗ Avoid
  export let data; // Missing type
</script>
```

**Reactive Blocks**: Use `$:` for dependencies, not imperative code.

```svelte
<script lang="ts">
  let count = 0;
  let doubled = 0;

  // ✓ Good - reactive
  $: doubled = count * 2;

  // ✗ Avoid - imperative updates
  function updateCount() {
    count++;
    doubled = count * 2; // Stale after store updates
  }
</script>
```

**Store Subscriptions**: Use `subscribe()` for reactive updates.

```ts
// ✓ Good
markdown.subscribe((content) => {
  updatePreview(content);
});

// ✓ Also good - auto-unsubscribe
let value: string;
const unsubscribe = markdown.subscribe(v => { value = v; });
onDestroy(() => unsubscribe());
```

**Event Handlers**: Type events explicitly.

```svelte
<script lang="ts">
  function handleInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    const value = target.value;
    markdown.set(value);
  }

  // ✗ Avoid - implicit any
  function handleInput(event) {
    const value = event.target.value;
  }
</script>

<textarea on:input={handleInput} />
```

### Imports & Exports

**Module Imports**: Use explicit paths and named imports.

```ts
// ✓ Good
import { renderMarp } from '$lib/marp';
import type { Writable } from 'svelte/store';

// ✗ Avoid - wildcard or implicit defaults
import * as marp from '$lib/marp';
import marp from '$lib/marp'; // No default export
```

**Path Aliases**: Use configured aliases from `tsconfig.json` and `vite.config.ts`.

```ts
// ✓ Good - uses alias
import { renderMarp } from '$lib/marp';
import Preview from '$components/Preview.svelte';

// ✗ Avoid - relative paths in src root
import { renderMarp } from '../../lib/marp';
```

### CSS & Styling

**Scope**: Always scope styles to component or use global namespace (prefix with `.container-`, `.app-`, etc).

```svelte
<style lang="css">
  /* ✓ Good - scoped */
  .editor-panel {
    display: flex;
  }

  /* ✗ Avoid - global styles without prefix */
  button {
    padding: 1rem;
  }
</style>
```

**Theme Support**: Use CSS custom properties for theme switching.

```svelte
<style lang="css">
  .container {
    background-color: #fff;
    color: #333;
  }

  .container[data-theme='dark'] {
    background-color: #1e1e1e;
    color: #e0e0e0;
  }
</style>
```

**Responsive Design**: Mobile-first approach.

```css
/* ✓ Good */
.editor { flex: 1; }

@media (max-width: 768px) {
  .editor { width: 100%; }
}

/* ✗ Avoid - desktop-first */
.editor { width: 50%; }

@media (max-width: 768px) {
  .editor { width: 100%; }
}
```

## Comments & Documentation

**Function Documentation**: Use JSDoc for public APIs.

```ts
/**
 * Render Markdown to HTML slides using Marp Core
 * Supports Mermaid diagrams and syntax highlighting
 *
 * @param markdown - The Markdown content to render
 * @param theme - Theme name ('light' or 'dark')
 * @returns Promise<string> - HTML document as string
 * @throws Error if rendering fails
 */
export async function renderMarp(
  markdown: string,
  theme: 'light' | 'dark' = 'light'
): Promise<string> { }
```

**Inline Comments**: Use sparingly; code should be self-documenting.

```ts
// ✓ Good - explains "why", not "what"
// Process mermaid first to avoid conflicts with Marp's SVG handling
const processed = await processMermaidBlocks(markdown);

// ✗ Avoid - obvious from code
// Set the markdown content
markdown.set(content);
```

## Testing Guidelines

**Test File Location**: Co-locate tests with source files using `.test.ts` suffix.

```
src/
  ├── lib/
  │   ├── marp.ts
  │   └── __tests__/
  │       └── marp.test.ts
```

**Test Structure**: Use descriptive test names.

```ts
describe('renderMarp', () => {
  it('should render markdown slides to HTML', async () => {
    const html = await renderMarp('# Title');
    expect(html).toContain('<h1>');
  });

  it('should support mermaid diagrams', async () => {
    const markdown = '```mermaid\ngraph LR\n```';
    const html = await renderMarp(markdown);
    expect(html).toContain('mermaid');
  });
});
```

## Performance Considerations

- **Debounce Updates**: Editor changes trigger re-renders; use debouncing for large documents.
- **Lazy Load**: Mermaid and Shiki are heavy; lazy-load if needed.
- **Iframe Isolation**: Preview renders in iframe to prevent XSS and layout thrashing.
- **Memoization**: Cache compiled Marp instances for repeated renders.

## Security

- **Sanitization**: Marp handles HTML sanitization; disable `html: true` if untrusted content.
- **Iframe Sandbox**: Use `sandbox` attribute on preview iframe (no `allow-same-origin`).
- **No Code Exposure**: Never output source code or internals to end-user.

## Common Patterns

### Reactive Store Updates
```ts
import { writable } from 'svelte/store';

let markdown = writable<string>('');

// Update store
markdown.set(newContent);

// Subscribe
markdown.subscribe(content => { });
```

### Svelte Component Communication
```svelte
<script lang="ts">
  import type { Writable } from 'svelte/store';

  // Parent passes store
  export let markdown: Writable<string>;

  // Child components use it reactively
  $: content = $markdown;
</script>
```

### Async Rendering
```ts
// Always handle promises in Svelte
{#await renderPromise then html}
  <Preview {html} />
{:catch error}
  <Error {error} />
{/await}
```

## Troubleshooting

**TypeScript Errors After Install**: Run `pnpm install` and restart IDE.

**Hot Module Reload (HMR) Issues**: Check `vite.config.ts` middleware setup. Ensure no file watchers blocked.

**Marp Rendering Issues**: Verify markdown syntax; check browser console for mermaid errors.

**Theme Not Updating**: Ensure reactive dependency on `theme` prop in components.

## Git Workflow

- Create feature branches from `main` (e.g., `feature/mermaid-support`)
- Keep commits atomic; one feature per PR
- Include tests for new functionality
- Run `pnpm lint && pnpm type-check` before committing
