/**
 * Lightweight Mermaid configuration
 * Lazy-load mermaid only when needed for diagrams
 */

export const configureMermaid = async (): Promise<void> => {
  const mermaid = await import('mermaid');
  
  // Configure for lightweight rendering
  await mermaid.default.initialize({
    startOnLoad: false,
    theme: 'default',
    securityLevel: 'loose',
    flowchart: {
      htmlLabels: true,
      useMaxWidth: true,
    },
  });
};
