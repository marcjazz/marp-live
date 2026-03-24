const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor-marp-XFd5gA5p.js","assets/vendor-mermaid-D_buJ-fQ.js"])))=>i.map(i=>d[i]);
import{_ as f}from"./vendor-mermaid-D_buJ-fQ.js";let c=null;async function u(){if(c)return c;try{const e=await f(()=>import("./vendor-marp-XFd5gA5p.js").then(r=>r.m),__vite__mapDeps([0,1]));return c=e.Marp||e.default||e,c}catch(e){throw console.error("Failed to load Marp Core:",e),new Error("Failed to load Marp Core")}}async function p(e){if(!e.includes("```mermaid"))return e;try{const r=await f(()=>import("./vendor-mermaid-D_buJ-fQ.js").then(s=>s.bb),[]);await r.default.initialize({startOnLoad:!1,theme:"default",securityLevel:"loose"});const t=/```mermaid\n([\s\S]*?)```/g;let n=e;const i=Array.from(e.matchAll(t));for(const s of i){const o=s[1];try{const a=Math.random().toString(36).substring(2,10),{svg:l}=await r.default.render(`mermaid-${Date.now()}-${a}`,o);n=n.replace(s[0],`<div class="mermaid-diagram">${l}</div>`)}catch(a){console.warn("Mermaid rendering error:",a)}}return n}catch(r){return console.warn("Failed to process mermaid blocks:",r),e}}function h(e){const r=/data-style="([\s\S]*?)"/g,t=new Set;let n;for(;(n=r.exec(e))!==null;){const o=n[1].trim();o&&t.add(o)}return t.size===0?"":`/* Custom styles from markdown frontmatter */
${Array.from(t)[0].replace(/([^{}@][^{}]*)\{([^{}]*)\}/g,(o,a,l)=>{const d=a.trim();return!d||d.startsWith("@")||d.includes("marpit")?o:`${d.split(",").map(v=>{const m=v.trim();return m==="section"?"div.marpit>svg>foreignObject>section":`div.marpit>svg>foreignObject>section ${m}`}).join(", ")} {${l}}`})}`}function g(e,r,t){const n=t==="dark"?"#1e1e1e":"#e0e0e0",i=t==="dark"?"#e0e0e0":"#333",s=h(e);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Marp Slides</title>
  <style>
    ${r}
    ${s}
    /* Basic styles for preview */
    body { background-color: ${n}; color: ${i}; margin: 0; padding: 2rem; }
    .mermaid-diagram { text-align: center; }
    
/* Enhance the visual of slides in the preview window */
    .marpit { display: flex; flex-direction: column; align-items: center; gap: 2rem; }
    .marpit > svg { box-shadow: 0 10px 30px rgba(0,0,0,0.2); border-radius: 8px; width: 100%; max-width: 1000px; height: auto; background-color: ${t==="dark"?"#000":"#fff"}; }

    ${t==="dark"?`
      div.marpit > svg > foreignObject > section { 
        filter: invert(1) hue-rotate(180deg) !important;
      }
      div.marpit > svg > foreignObject > section img,
      div.marpit > svg > foreignObject > section video,
      div.marpit > svg > foreignObject > section .mermaid-diagram,
      div.marpit > svg > foreignObject > section svg {
        filter: invert(1) hue-rotate(180deg) !important;
      }
    `:""}

    /* Presentation mode */
    body.presentation-mode { padding: 0; background-color: #000; overflow: hidden; }
    body.presentation-mode .marpit { display: block; height: 100vh; width: 100vw; gap: 0; }
    body.presentation-mode .marpit > svg { display: none; width: 100vw; height: 100vh; max-width: none; border-radius: 0; box-shadow: none; object-fit: contain; }
    body.presentation-mode .marpit > svg.active { display: block; }
  </style>
</head>
<body>
  ${e}
  <script>
    (function() {
      // Theme synchronization
      if ('${t}' === 'dark') {
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
  <\/script>
</body>
</html>`}function x(e,r="light"){return new Promise((t,n)=>{if(typeof requestIdleCallback>"u"){(async()=>{try{const i=await p(e),s=await u(),a=new s({html:!0,script:!1}).render(i);t(g(a.html,a.css,r))}catch(i){n(i)}})();return}requestIdleCallback(async()=>{try{const i=await p(e),s=await u(),a=new s({html:!0,script:!1}).render(i);t(g(a.html,a.css,r))}catch(i){console.error("Error during idle rendering:",i),n(i)}},{timeout:1e3})})}export{x as renderMarp};
