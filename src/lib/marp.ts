/**
 * Render Markdown to HTML slides using a non-blocking strategy
 * Uses requestIdleCallback to prevent main thread blocking
 */

type MarpCore = typeof import('@marp-team/marp-core').default;
type MermaidModule = typeof import('mermaid');

let marpClass: MarpCore | null = null;

async function getMarpClass(): Promise<MarpCore> {
  if (marpClass) return marpClass;
  try {
    const marpModule = await import('@marp-team/marp-core');
    marpClass = (marpModule.Marp || marpModule.default || marpModule) as MarpCore;
    return marpClass;
  } catch (error) {
    console.error('Failed to load Marp Core:', error);
    throw new Error('Failed to load Marp Core');
  }
}

async function processMermaidBlocks(markdown: string): Promise<string> {
    if (!markdown.includes('```mermaid')) {
      return markdown;
    }

    try {
        const mermaid = (await import('mermaid')) as MermaidModule;

        await mermaid.default.initialize({
            startOnLoad: false,
            theme: 'default',
            securityLevel: 'loose',
        });

        const mermaidBlockRegex = /```mermaid\n([\s\S]*?)```/g;
        let processed = markdown;

        const matches = Array.from(markdown.matchAll(mermaidBlockRegex));

        for (const match of matches) {
            const mermaidCode = match[1];
            try {
                // Remove decimal point from Math.random() as it causes invalid selector error in mermaid
                const randomId = Math.random().toString(36).substring(2, 10);
                const { svg } = await mermaid.default.render(`mermaid-${Date.now()}-${randomId}`, mermaidCode);
                processed = processed.replace(match[0], `<div class="mermaid-diagram">${svg}</div>`);
            } catch (error) {
                console.warn('Mermaid rendering error:', error);
            }
        }
        return processed;
    } catch (error) {
        console.warn('Failed to process mermaid blocks:', error);
        return markdown;
    }
}

/**
 * Extract custom styles from Marp's data-style attributes
 * Marp stores frontmatter styles in data-style but doesn't inject them when script: false
 */
function extractCustomStyles(htmlContent: string): string {
    // Match data-style attribute - handle multiline content
    const styleRegex = /data-style="([\s\S]*?)"/g;
    const styles: Set<string> = new Set(); // Use Set to dedupe
    let match;
    
    while ((match = styleRegex.exec(htmlContent)) !== null) {
        const style = match[1].trim();
        if (style) {
            styles.add(style);
        }
    }
    
    if (styles.size === 0) {
        return '';
    }
    
    // Get unique styles (first one only since they're all the same per slide deck)
    const uniqueStyles = Array.from(styles)[0];
    
    // Scope selectors to match Marp's specificity: div.marpit>svg>foreignObject>section
    const scopedStyles = uniqueStyles.replace(
        /([^{}@][^{}]*)\{([^{}]*)\}/g,
        (fullMatch, selector, properties) => {
            const trimmedSelector = selector.trim();
            // Skip @rules, empty selectors, or already scoped
            if (!trimmedSelector || trimmedSelector.startsWith('@') || trimmedSelector.includes('marpit')) {
                return fullMatch;
            }
            
            // Handle multiple selectors (comma-separated)
            const scopedSelectors = trimmedSelector.split(',').map((s: string) => {
                const sel = s.trim();
                if (sel === 'section') {
                    return `div.marpit>svg>foreignObject>section`;
                }
                return `div.marpit>svg>foreignObject>section ${sel}`;
            }).join(', ');
            
            return `${scopedSelectors} {${properties}}`;
        }
    );
    
    return `/* Custom styles from markdown frontmatter */\n${scopedStyles}`;
}

function wrapInHtmlDocument(htmlContent: string, cssContent: string, theme: 'light' | 'dark'): string {
    const bgColor = theme === 'dark' ? '#1e1e1e' : '#e0e0e0';
    const textColor = theme === 'dark' ? '#e0e0e0' : '#333';
    const customStyles = extractCustomStyles(htmlContent);

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Marp Slides</title>
  <style>
    ${cssContent}
    ${customStyles}
    /* Basic styles for preview */
    body { background-color: ${bgColor}; color: ${textColor}; margin: 0; padding: 2rem; }
    .mermaid-diagram { text-align: center; }
    
/* Enhance the visual of slides in the preview window */
    .marpit { display: flex; flex-direction: column; align-items: center; gap: 2rem; }
    .marpit > svg { box-shadow: 0 10px 30px rgba(0,0,0,0.2); border-radius: 8px; width: 100%; max-width: 1000px; height: auto; background-color: ${theme === 'dark' ? '#000' : '#fff'}; }

    ${theme === 'dark' ? `
      div.marpit > svg > foreignObject > section { 
        filter: invert(1) hue-rotate(180deg) !important;
      }
      div.marpit > svg > foreignObject > section img,
      div.marpit > svg > foreignObject > section video,
      div.marpit > svg > foreignObject > section .mermaid-diagram,
      div.marpit > svg > foreignObject > section svg {
        filter: invert(1) hue-rotate(180deg) !important;
      }
    ` : ''}

    /* Presentation mode */
    body.presentation-mode { padding: 0; background-color: #000; overflow: hidden; }
    body.presentation-mode .marpit { display: block; height: 100vh; width: 100vw; gap: 0; }
    body.presentation-mode .marpit > svg { display: none; width: 100vw; height: 100vh; max-width: none; border-radius: 0; box-shadow: none; object-fit: contain; }
    body.presentation-mode .marpit > svg.active { display: block; }
  </style>
</head>
<body>
  ${htmlContent}
  <script>
    (function() {
      // Theme synchronization
      if ('${theme}' === 'dark') {
        document.querySelectorAll('section').forEach(s => s.classList.add('invert'));
      }

      let currentSlideIndex = 0;
      let svgs = [];
      let isPresentation = false;

      function updateSlides() {
        svgs.forEach((svg, index) => {
          if (index === currentSlideIndex) {
            svg.classList.add('active');
          } else {
            svg.classList.remove('active');
          }
        });
      }

      window.addEventListener('message', (e) => {
        if (e.data && e.data.type === 'enter-fullscreen') {
          isPresentation = true;
          document.body.classList.add('presentation-mode');
          svgs = document.querySelectorAll('.marpit > svg');
          
          let minDistance = Infinity;
          svgs.forEach((svg, index) => {
            const rect = svg.getBoundingClientRect();
            const distance = Math.abs(rect.top);
            if (distance < minDistance) {
              minDistance = distance;
              currentSlideIndex = index;
            }
          });
          updateSlides();
        } else if (e.data && e.data.type === 'exit-fullscreen') {
          isPresentation = false;
          document.body.classList.remove('presentation-mode');
          svgs.forEach(svg => svg.classList.remove('active'));
          if (svgs[currentSlideIndex]) {
             svgs[currentSlideIndex].scrollIntoView({ behavior: 'auto', block: 'center' });
          }
        }
      });

      document.addEventListener('keydown', (e) => {
        if (!isPresentation) return;
        
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') {
          e.preventDefault();
          currentSlideIndex = Math.min(currentSlideIndex + 1, svgs.length - 1);
          updateSlides();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
          e.preventDefault();
          currentSlideIndex = Math.max(currentSlideIndex - 1, 0);
          updateSlides();
        } else if (e.key === 'Home') {
          e.preventDefault();
          currentSlideIndex = 0;
          updateSlides();
        } else if (e.key === 'End') {
          e.preventDefault();
          currentSlideIndex = svgs.length - 1;
          updateSlides();
        } else if (e.key === 'Escape') {
          // Tell parent to exit fullscreen just in case
          window.parent.postMessage({ type: 'exit-fullscreen-request' }, '*');
        }
      });
      
      document.addEventListener('click', (e) => {
         if (!isPresentation) return;
         if (e.clientX < window.innerWidth * 0.2) {
             currentSlideIndex = Math.max(currentSlideIndex - 1, 0);
         } else {
             currentSlideIndex = Math.min(currentSlideIndex + 1, svgs.length - 1);
         }
         updateSlides();
      });
    })();
  </script>
</body>
</html>`;
}

/**
 * Render slides during idle time to avoid blocking the main thread
 */
export function renderMarp(
  markdown: string,
  theme: 'light' | 'dark' = 'light'
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof requestIdleCallback === 'undefined') {
        // Fallback for environments that don't support requestIdleCallback (like tests)
        (async () => {
            try {
                const processedMarkdown = await processMermaidBlocks(markdown);
                const Marp = await getMarpClass();
                const marp = new Marp({ html: true, script: false });
                const result = marp.render(processedMarkdown);
                resolve(wrapInHtmlDocument(result.html, result.css, theme));
            } catch (e) {
                reject(e);
            }
        })();
        return;
    }

    requestIdleCallback(async () => {
      try {
        const processedMarkdown = await processMermaidBlocks(markdown);
        const Marp = await getMarpClass();
        const marp = new Marp({ html: true, script: false });
        const result = marp.render(processedMarkdown);
        resolve(wrapInHtmlDocument(result.html, result.css, theme));
      } catch (error) {
        console.error('Error during idle rendering:', error);
        reject(error);
      }
    }, { timeout: 1000 }); // Timeout of 1 second
  });
}
