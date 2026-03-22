import { renderMarp } from './src/lib/marp';

async function run() {
  const md = `---
marp: true
---
# Hello World
---
# Slide 2
`;
  const html = await renderMarp(md, 'light');
  console.log(html);
}

run().catch(console.error);
