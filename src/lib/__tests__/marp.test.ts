import { describe, it, expect } from 'vitest';
import { renderMarp } from '../marp';

describe('renderMarp', () => {
  it('should render basic markdown to HTML', async () => {
    const markdown = '# Hello World';
    const html = await renderMarp(markdown);
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('Hello World');
  });

  it('should render slide breaks', async () => {
    const markdown = '# Slide 1\n\n---\n\n# Slide 2';
    const html = await renderMarp(markdown);
    expect(html).toContain('Slide 1');
    expect(html).toContain('Slide 2');
  });

  it('should handle code blocks', async () => {
    const markdown = '```typescript\nconst x = 42;\n```';
    const html = await renderMarp(markdown);
    expect(html).toContain('const');
    expect(html).toContain('42');
  });

  it('should support dark theme', async () => {
    const markdown = '# Test';
    const html = await renderMarp(markdown, 'dark');
    expect(html).toContain('#1e1e1e');
  });

  it('should support light theme', async () => {
    const markdown = '# Test';
    const html = await renderMarp(markdown, 'light');
    expect(html).toContain('#fff');
  });

  it('should handle empty markdown', async () => {
    const html = await renderMarp('');
    expect(html).toBeTruthy();
    expect(html).toContain('<!DOCTYPE html>');
  });
});
