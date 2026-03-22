<script lang="ts">
  import type { Writable } from 'svelte/store';

  export let markdown: Writable<string>;

  let content: string = '';
  let editorElement: HTMLTextAreaElement;

  markdown.subscribe((value) => {
    content = value;
  });

  function handleInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    content = target.value;
    markdown.set(content);
  }

  function insertSlideBreak(): void {
    const textarea = editorElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newContent =
      content.substring(0, start) + '\n---\n' + content.substring(end);
    content = newContent;
    markdown.set(content);
    // Restore cursor position
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + 5;
      textarea.focus();
    }, 0);
  }
</script>

<div class="editor-panel">
  <div class="editor-toolbar">
    <button class="btn-small" on:click={insertSlideBreak} title="Insert slide break">
      ➕ Slide
    </button>
  </div>
  <textarea
    bind:this={editorElement}
    bind:value={content}
    on:input={handleInput}
    class="editor"
    placeholder="Enter Markdown here..."
    spellcheck="false"
  />
</div>

<style lang="css">
  .editor-panel {
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #fff;
    border-right: 1px solid #ddd;
    overflow: hidden;
  }

  :global([data-theme='dark']) .editor-panel {
    background-color: #1e1e1e;
    border-right-color: #444;
  }

  .editor-toolbar {
    display: flex;
    gap: 0.5rem;
    padding: 0.75rem;
    background-color: #f9f9f9;
    border-bottom: 1px solid #eee;
    flex-shrink: 0;
  }

  :global([data-theme='dark']) .editor-toolbar {
    background-color: #252525;
    border-bottom-color: #333;
  }

  .btn-small {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
    border: 1px solid #ddd;
    border-radius: 3px;
    cursor: pointer;
    background-color: #fff;
    color: #333;
    transition: all 0.2s;
  }

  .btn-small:hover {
    background-color: #f0f0f0;
  }

  :global([data-theme='dark']) .btn-small {
    background-color: #333;
    color: #e0e0e0;
    border-color: #555;
  }

  :global([data-theme='dark']) .btn-small:hover {
    background-color: #444;
  }

  .editor {
    flex: 1;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 13px;
    line-height: 1.6;
    padding: 1rem;
    border: none;
    resize: none;
    background-color: #fff;
    color: #333;
    outline: none;
  }

  :global([data-theme='dark']) .editor {
    background-color: #1e1e1e;
    color: #e0e0e0;
    caret-color: #0ea5e9;
  }

  .editor::placeholder {
    color: #999;
  }

  :global([data-theme='dark']) .editor::placeholder {
    color: #666;
  }
</style>
