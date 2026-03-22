import { renderMarp } from './src/lib/marp';

async function run() {
  const md = `---
marp: true
---
# Hello World
`;
  const html = await renderMarp(md, 'light');
  console.log(html);
}

run().catch(console.error);
