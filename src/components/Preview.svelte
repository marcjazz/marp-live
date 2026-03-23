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

  function handleFullscreenChange(): void {
    if (document.fullscreenElement === iframeElement) {
      if (iframeElement.contentWindow) {
        iframeElement.contentWindow.postMessage({ type: 'enter-fullscreen' }, '*');
      }
    } else {
      if (iframeElement.contentWindow) {
        iframeElement.contentWindow.postMessage({ type: 'exit-fullscreen' }, '*');
      }
    }
  }

  function handleMessage(event: MessageEvent): void {
    if (event.data && event.data.type === 'exit-fullscreen-request') {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  onMount(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('message', handleMessage);

    const unsubscribe = markdown.subscribe((content) => {
      scheduleUpdate(content);
    });

    return () => {
      unsubscribe();
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('message', handleMessage);
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
      🖥️
    </button>
  </div>
  <iframe
    bind:this={iframeElement}
    title="Slide Preview"
    class="preview-iframe"
    sandbox="allow-scripts allow-same-origin"
    allowfullscreen
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
    padding: 0.35rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: transform 0.2s, opacity 0.2s;
    opacity: 0.8;
  }

  .btn-present:hover {
    opacity: 1;
    transform: scale(1.1);
  }

  .preview-iframe {
    flex: 1;
    border: none;
    background-color: transparent;
  }
</style>
