<script lang="ts">
  import Editor from '$components/Editor.svelte';
  import { writable } from 'svelte/store';
  import type { Writable } from 'svelte/store';
  import type { ComponentType } from 'svelte';
  import './styles.css';

  // Lazy-load Preview component
  import { onMount } from 'svelte';
  let PreviewComponent: ComponentType | null = null;

  onMount(async () => {
    const module = await import('$components/Preview.svelte');
    PreviewComponent = module.default;
  });

  // Store for reactive markdown content
  let markdown: Writable<string> = writable(`---
marp: true
theme: default
class: lead
paginate: true
backgroundColor: #f0f4f8
backgroundImage: url('https://marp.app/assets/hero-background.svg')
style: |
  section {
    font-family: 'Inter', -apple-system, sans-serif;
  }
  h1 {
    color: #0284c7;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  }
  .highlight {
    color: #e11d48;
    font-weight: bold;
  }
---

# 🚀 **Marp Live Experience**

Create *mind-blowing* presentations directly in your browser.

![bg right:40% 80%](https://marp.app/assets/marp.svg)

---

## 🎨 **Unleash Your Creativity**

- **Real-time Preview:** See your slides instantly as you type.
- **Markdown Power:** Focus on content, not formatting.
- **Beautiful Themes:** Use built-in themes or create your own with CSS.

---

## 📊 **Mermaid Diagrams Built-in**

Visualize your architecture, workflows, and logic with \`mermaid\`.

\`\`\`mermaid
graph TD
    A[Markdown] -->|Marp Core| B(HTML slides)
    B --> C{Preview}
    C -->|Happy| D[Export & Present]
    C -->|Need tweaks| A
\`\`\`

---

<!-- _class: invert -->

# 🌙 **Dark Mode Support**

Seamlessly switch themes for the perfect vibe.

> "A well-designed presentation is the best way to share your vision."

---

## 💻 **Code Blocks that Pop**

\`\`\`js
// Render slides seamlessly
async function renderMarp(markdown) {
  const marp = new Marp({ html: true });
  const { html, css } = marp.render(markdown);
  return { html, css };
}
\`\`\`

*Syntax highlighting included!*

---

# 🎯 **Ready to present?**

Start writing your markdown on the left.
Your audience is waiting!
`);

  let theme: 'light' | 'dark' = 'light';

  function toggleTheme(): void {
    theme = theme === 'light' ? 'dark' : 'light';
  }

  async function downloadHTML(): Promise<void> {
    // Get current markdown content
    let markdownContent = '';
    markdown.subscribe((value) => {
      markdownContent = value;
    })();

    try {
      const { renderMarp } = await import('$lib/marp');
      const html = await renderMarp(markdownContent, theme);
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'slides.html';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export slides.');
    }
  }
</script>

<div class="container" data-theme={theme}>
  <header class="header">
    <h1>Marp Live</h1>
    <div class="controls">
      <button on:click={toggleTheme} class="btn-theme">
        Theme: {theme === 'light' ? '☀️' : '🌙'}
      </button>
      <button on:click={downloadHTML} class="btn-download">
        📥 Export HTML
      </button>
    </div>
  </header>

  <div class="main">
    <Editor {markdown} />
    {#if PreviewComponent}
      <svelte:component this={PreviewComponent} {markdown} {theme} />
    {:else}
      <div class="preview-loading">Loading preview...</div>
    {/if}
  </div>
</div>

<style lang="css">
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, sans-serif;
  }

  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #fff;
    color: #333;
  }

  .container[data-theme='dark'] {
    background-color: #1e1e1e;
    color: #e0e0e0;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
    flex-shrink: 0;
  }

  .container[data-theme='dark'] .header {
    background-color: #2a2a2a;
    border-bottom-color: #444;
  }

  .header h1 {
    margin: 0;
    font-size: 1.5rem;
  }

  .controls {
    display: flex;
    gap: 0.75rem;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 0.95rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    background-color: #fff;
    color: #333;
    transition: all 0.2s;
  }

  button:hover {
    background-color: #f0f0f0;
    border-color: #999;
  }

  .container[data-theme='dark'] button {
    background-color: #333;
    color: #e0e0e0;
    border-color: #555;
  }

  .container[data-theme='dark'] button:hover {
    background-color: #444;
    border-color: #777;
  }

  .main {
    display: flex;
    flex: 1;
    gap: 1px;
    overflow: hidden;
  }

  .preview-loading {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
  }

  :global([data-theme='dark']) .preview-loading {
    color: #666;
  }
</style>
