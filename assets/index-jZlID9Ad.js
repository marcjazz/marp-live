const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Preview-DJcKMGOI.js","assets/vendor-mermaid-D_buJ-fQ.js","assets/Preview-CdUdtT9f.css","assets/marp-DMG_NCqY.js"])))=>i.map(i=>d[i]);
var he=Object.defineProperty;var me=(e,t,n)=>t in e?he(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Y=(e,t,n)=>me(e,typeof t!="symbol"?t+"":t,n);import{_ as ne}from"./vendor-mermaid-D_buJ-fQ.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();function w(){}function le(e){return e()}function re(){return Object.create(null)}function x(e){e.forEach(le)}function ue(e){return typeof e=="function"}function X(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function ge(e){return Object.keys(e).length===0}function _e(e,...t){if(e==null){for(const r of t)r(void 0);return w}const n=e.subscribe(...t);return n.unsubscribe?()=>n.unsubscribe():n}function Ue(e){let t;return _e(e,n=>t=n)(),t}function h(e,t){e.appendChild(t)}function H(e,t,n){e.insertBefore(t,n||null)}function N(e){e.parentNode&&e.parentNode.removeChild(e)}function b(e){return document.createElement(e)}function U(e){return document.createTextNode(e)}function A(){return U(" ")}function be(){return U("")}function B(e,t,n,r){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)}function d(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function we(e){return Array.from(e.childNodes)}function ye(e,t){t=""+t,e.data!==t&&(e.data=t)}function oe(e,t){e.value=t??""}function se(e,t){return new e(t)}let I;function F(e){I=e}function ve(){if(!I)throw new Error("Function called outside component initialization");return I}function $e(e){ve().$$.on_mount.push(e)}const S=[],G=[];let O=[];const ie=[],ke=Promise.resolve();let J=!1;function Ee(){J||(J=!0,ke.then(ae))}function Q(e){O.push(e)}const K=new Set;let L=0;function ae(){if(L!==0)return;const e=I;do{try{for(;L<S.length;){const t=S[L];L++,F(t),xe(t.$$)}}catch(t){throw S.length=0,L=0,t}for(F(null),S.length=0,L=0;G.length;)G.pop()();for(let t=0;t<O.length;t+=1){const n=O[t];K.has(n)||(K.add(n),n())}O.length=0}while(S.length);for(;ie.length;)ie.pop()();J=!1,K.clear(),F(e)}function xe(e){if(e.fragment!==null){e.update(),x(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(Q)}}function Ce(e){const t=[],n=[];O.forEach(r=>e.indexOf(r)===-1?t.push(r):n.push(r)),n.forEach(r=>r()),O=t}const j=new Set;let E;function ce(){E={r:0,c:[],p:E}}function fe(){E.r||x(E.c),E=E.p}function P(e,t){e&&e.i&&(j.delete(e),e.i(t))}function T(e,t,n,r){if(e&&e.o){if(j.has(e))return;j.add(e),E.c.push(()=>{j.delete(e),r&&(n&&e.d(1),r())}),e.o(t)}else r&&r()}function W(e){e&&e.c()}function D(e,t,n){const{fragment:r,after_update:o}=e.$$;r&&r.m(t,n),Q(()=>{const s=e.$$.on_mount.map(le).filter(ue);e.$$.on_destroy?e.$$.on_destroy.push(...s):x(s),e.$$.on_mount=[]}),o.forEach(Q)}function z(e,t){const n=e.$$;n.fragment!==null&&(Ce(n.after_update),x(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function Le(e,t){e.$$.dirty[0]===-1&&(S.push(e),Ee(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function de(e,t,n,r,o,s,i=null,c=[-1]){const u=I;F(e);const l=e.$$={fragment:null,ctx:[],props:s,update:w,not_equal:o,bound:re(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(u?u.$$.context:[])),callbacks:re(),dirty:c,skip_bound:!1,root:t.target||u.$$.root};i&&i(l.root);let a=!1;if(l.ctx=n?n(e,t.props||{},(f,v,...m)=>{const g=m.length?m[0]:v;return l.ctx&&o(l.ctx[f],l.ctx[f]=g)&&(!l.skip_bound&&l.bound[f]&&l.bound[f](g),a&&Le(e,f)),v}):[],l.update(),a=!0,x(l.before_update),l.fragment=r?r(l.ctx):!1,t.target){if(t.hydrate){const f=we(t.target);l.fragment&&l.fragment.l(f),f.forEach(N)}else l.fragment&&l.fragment.c();t.intro&&P(e.$$.fragment),D(e,t.target,t.anchor),ae()}F(u)}class pe{constructor(){Y(this,"$$");Y(this,"$$set")}$destroy(){z(this,1),this.$destroy=w}$on(t,n){if(!ue(n))return w;const r=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return r.push(n),()=>{const o=r.indexOf(n);o!==-1&&r.splice(o,1)}}$set(t){this.$$set&&!ge(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const Me="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(Me);function Se(e){let t,n,r,o,s,i,c;return{c(){t=b("div"),n=b("div"),r=b("button"),r.textContent="➕ Slide",o=A(),s=b("textarea"),d(r,"class","btn-small svelte-1giybg7"),d(r,"title","Insert slide break"),d(n,"class","editor-toolbar svelte-1giybg7"),d(s,"class","editor svelte-1giybg7"),d(s,"placeholder","Enter Markdown here..."),d(s,"spellcheck","false"),d(t,"class","editor-panel svelte-1giybg7")},m(u,l){H(u,t,l),h(t,n),h(n,r),h(t,o),h(t,s),e[5](s),oe(s,e[0]),i||(c=[B(r,"click",e[3]),B(s,"input",e[6]),B(s,"input",e[2])],i=!0)},p(u,[l]){l&1&&oe(s,u[0])},i:w,o:w,d(u){u&&N(t),e[5](null),i=!1,x(c)}}}function Oe(e,t,n){let{markdown:r}=t,o="",s;r.subscribe(a=>{n(0,o=a)});function i(a){const f=a.target;n(0,o=f.value),r.set(o)}function c(){const a=s,f=a.selectionStart,v=a.selectionEnd,m=o.substring(0,f)+`
---
`+o.substring(v);n(0,o=m),r.set(o),setTimeout(()=>{a.selectionStart=a.selectionEnd=f+5,a.focus()},0)}function u(a){G[a?"unshift":"push"](()=>{s=a,n(1,s)})}function l(){o=this.value,n(0,o)}return e.$$set=a=>{"markdown"in a&&n(4,r=a.markdown)},[o,s,i,c,r,u,l]}class Pe extends pe{constructor(t){super(),de(this,t,Oe,Se,X,{markdown:4})}}const M=[];function Ae(e,t=w){let n;const r=new Set;function o(c){if(X(e,c)&&(e=c,n)){const u=!M.length;for(const l of r)l[1](),M.push(l,e);if(u){for(let l=0;l<M.length;l+=2)M[l][0](M[l+1]);M.length=0}}}function s(c){o(c(e))}function i(c,u=w){const l=[c,u];return r.add(l),r.size===1&&(n=t(o,s)||w),c(e),()=>{r.delete(l),r.size===0&&n&&(n(),n=null)}}return{set:o,update:s,subscribe:i}}function Be(e){let t;return{c(){t=b("div"),t.textContent="Loading preview...",d(t,"class","preview-loading svelte-v6g04s")},m(n,r){H(n,t,r)},p:w,i:w,o:w,d(n){n&&N(t)}}}function Fe(e){let t,n,r;var o=e[0];function s(i,c){return{props:{markdown:i[2],theme:i[1]}}}return o&&(t=se(o,s(e))),{c(){t&&W(t.$$.fragment),n=be()},m(i,c){t&&D(t,i,c),H(i,n,c),r=!0},p(i,c){if(c&1&&o!==(o=i[0])){if(t){ce();const u=t;T(u.$$.fragment,1,0,()=>{z(u,1)}),fe()}o?(t=se(o,s(i)),W(t.$$.fragment),P(t.$$.fragment,1),D(t,n.parentNode,n)):t=null}else if(o){const u={};c&2&&(u.theme=i[1]),t.$set(u)}},i(i){r||(t&&P(t.$$.fragment,i),r=!0)},o(i){t&&T(t.$$.fragment,i),r=!1},d(i){i&&N(n),t&&z(t,i)}}}function Te(e){let t,n,r,o,s,i,c,u=e[1]==="light"?"☀️":"🌙",l,a,f,v,m,g,R,_,y,C,V,Z;g=new Pe({props:{markdown:e[2]}});const ee=[Fe,Be],$=[];function te(p,k){return p[0]?0:1}return _=te(e),y=$[_]=ee[_](e),{c(){t=b("div"),n=b("header"),r=b("h1"),r.textContent="Marp Live",o=A(),s=b("div"),i=b("button"),c=U("Theme: "),l=U(u),a=A(),f=b("button"),f.textContent="📥 Export HTML",v=A(),m=b("div"),W(g.$$.fragment),R=A(),y.c(),d(r,"class","svelte-v6g04s"),d(i,"class","btn-theme svelte-v6g04s"),d(f,"class","btn-download svelte-v6g04s"),d(s,"class","controls svelte-v6g04s"),d(n,"class","header svelte-v6g04s"),d(m,"class","main svelte-v6g04s"),d(t,"class","container svelte-v6g04s"),d(t,"data-theme",e[1])},m(p,k){H(p,t,k),h(t,n),h(n,r),h(n,o),h(n,s),h(s,i),h(i,c),h(i,l),h(s,a),h(s,f),h(t,v),h(t,m),D(g,m,null),h(m,R),$[_].m(m,null),C=!0,V||(Z=[B(i,"click",e[3]),B(f,"click",e[4])],V=!0)},p(p,[k]){(!C||k&2)&&u!==(u=p[1]==="light"?"☀️":"🌙")&&ye(l,u);let q=_;_=te(p),_===q?$[_].p(p,k):(ce(),T($[q],1,1,()=>{$[q]=null}),fe(),y=$[_],y?y.p(p,k):(y=$[_]=ee[_](p),y.c()),P(y,1),y.m(m,null)),(!C||k&2)&&d(t,"data-theme",p[1])},i(p){C||(P(g.$$.fragment,p),P(y),C=!0)},o(p){T(g.$$.fragment,p),T(y),C=!1},d(p){p&&N(t),z(g),$[_].d(),V=!1,x(Z)}}}function Ie(e,t,n){let r=null;$e(async()=>{const l=await ne(()=>import("./Preview-DJcKMGOI.js"),__vite__mapDeps([0,1,2]));n(0,r=l.default)});let s=Ae(`---
marp: true
theme: default
class: lead
paginate: true
backgroundColor: #f0f4f8
backgroundImage: url('https://marp.app/assets/hero-background.svg')
style: |
  section {
    --h1-color: #0284c7;
    --h2-color: #0369a1;
    --h3-color: #0c4a6e;
    --color-foreground: #1e293b;
    font-family: 'Inter', -apple-system, sans-serif;
  }
  h1 {
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
`),i="light";function c(){n(1,i=i==="light"?"dark":"light")}async function u(){let l="";s.subscribe(a=>{l=a})();try{const{renderMarp:a}=await ne(async()=>{const{renderMarp:R}=await import("./marp-DMG_NCqY.js");return{renderMarp:R}},__vite__mapDeps([3,1])),f=await a(l,i),v=new Blob([f],{type:"text/html"}),m=URL.createObjectURL(v),g=document.createElement("a");g.href=m,g.download="slides.html",g.click(),URL.revokeObjectURL(m)}catch(a){console.error("Export failed:",a),alert("Failed to export slides.")}}return[r,i,s,c,u]}class Ne extends pe{constructor(t){super(),de(this,t,Ie,Te,X,{})}}new Ne({target:document.getElementById("app")});export{pe as S,ye as a,H as b,h as c,N as d,b as e,A as f,d as g,Ue as h,de as i,G as j,B as l,w as n,$e as o,X as s,U as t};
