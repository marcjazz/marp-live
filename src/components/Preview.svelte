<script lang="ts">
  import type { Writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';

  export let markdown: Writable<string>;
  export let theme: 'light' | 'dark';

  let iframeContent: string = '';
  let iframeElement: HTMLIFrameElement;
  let updateTimeout: ReturnType<typeof setTimeout>;
  let isLoading = false;

  async function updatePreview(content: string): Promise<void> {
    isLoading = true;
    try {
      const { renderMarp } = await import('$lib/marp');
      const html = await renderMarp(content, theme);
      iframeContent = html;
      if (iframeElement) {
        iframeElement.srcdoc = html;
      }
    } catch (error) {
      console.error('Error rendering slides:', error);
      iframeContent = `<html><body><p>Error rendering slides: ${error}</p></body></html>`;
      if (iframeElement) {
        iframeElement.srcdoc = iframeContent;
      }
    } finally {
      isLoading = false;
    }
  }

  function scheduleUpdate(content: string, delay: number = 300): void {
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => {
      updatePreview(content);
    }, delay);
  }

  function enterFullscreen(): void {
    if (iframeElement && iframeElement.requestFullscreen) {
      iframeElement.requestFullscreen();
    }
  }

  onMount(() => {
    const unsubscribe = markdown.subscribe((content) => {
      scheduleUpdate(content);
    });

    return () => {
      unsubscribe();
      clearTimeout(updateTimeout);
    };
  });

  // Reactive statement for theme changes
  $: if (theme) {
    // Re-render with a small delay to avoid race conditions
    scheduleUpdate(get(markdown), 50);
  }
</script>

<div class="preview-panel">
  <div class="preview-header">
    <span class="label">Preview {isLoading ? '(updating...)' : ''}</span>
    <button class="btn-present" on:click={enterFullscreen} title="Present Fullscreen">
      🖥️ Present
    </button>
  </div>
  <iframe
    bind:this={iframeElement}
    title="Slide Preview"
    class="preview-iframe"
    sandbox="allow-scripts allow-same-origin"
  />
</div>

<style lang="css">
  .preview-panel {
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #fff;
    overflow: hidden;
  }

  :global([data-theme='dark']) .preview-panel {
    background-color: #1e1e1e;
  }

  .preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0.75rem;
    background-color: #f9f9f9;
    border-bottom: 1px solid #eee;
    flex-shrink: 0;
    font-size: 0.9rem;
    font-weight: 500;
    color: #666;
  }

  :global([data-theme='dark']) .preview-header {
    background-color: #252525;
    border-bottom-color: #333;
    color: #aaa;
  }

  .label {
    display: inline-block;
  }

  .btn-present {
    padding: 0.35rem 0.75rem;
    font-size: 0.85rem;
    background-color: #0284c7;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
    font-weight: bold;
  }

  .btn-present:hover {
    background-color: #0369a1;
  }

  .preview-iframe {
    flex: 1;
    border: none;
    background-color: transparent;
  }
</style>
