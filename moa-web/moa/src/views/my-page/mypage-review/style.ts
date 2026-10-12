import { css } from "@emotion/react";
export const fullBox = css`width:min(100%,1240px); margin:0 auto; padding:36px clamp(20px,4vw,56px) 64px;`;
export const summary = css`display:flex; gap:12px; align-items:center; padding:0 0 20px; margin-bottom:24px; border-bottom:1px solid var(--moa-line); strong{font-size:20px;} span{font-size:13px;color:var(--moa-primary-dark);}`;
export const notice = css`padding:16px; background:var(--moa-chip-bg); border-radius:12px; color:var(--moa-chip-ink);`;
export const mainBox = css`display:grid;gap:20px;`;
export const reviewBox = css`display:grid;grid-template-columns:220px minmax(0,1fr);border:1px solid var(--moa-line);border-radius:20px;overflow:hidden;background:white;box-shadow:var(--moa-shadow-sm);@media(max-width:700px){grid-template-columns:1fr;}`;
export const cover = css`width:100%;height:100%;min-height:220px;max-height:320px;object-fit:cover;background:var(--moa-surface-muted); &[data-fallback="true"]{object-fit:contain;padding:32px;} @media(max-width:700px){height:180px;min-height:0;}`;
export const contentBox = css`padding:24px;min-width:0; h2{margin:12px 0;font-size:22px;letter-spacing:-.035em;} >p{margin:0;line-height:1.85;font-size:15px;white-space:pre-wrap;overflow-wrap:anywhere;color:var(--moa-ink-subtle);}`;
export const meta = css`display:flex;justify-content:space-between;align-items:center;gap:12px;>span{font-size:12px;color:var(--moa-muted);}`;
