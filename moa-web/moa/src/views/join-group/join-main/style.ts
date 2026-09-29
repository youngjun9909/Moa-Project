import { css } from "@emotion/react";
export const mainBox = css`width:100%;display:grid;gap:18px;`;
export const groupImgBox = css`width:100%;height:clamp(230px,34vw,380px);border-radius:var(--moa-radius-lg);overflow:hidden;background:var(--moa-surface-muted);border:1px solid var(--moa-line);>img{width:100%;height:100%;object-fit:cover;}.default{object-fit:contain;padding:48px;}`;
export const groupInfoBox = css`display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.15fr);gap:18px;@media(max-width:820px){grid-template-columns:1fr;}`;
export const groupDetailBox = css`min-height:310px;padding:24px;border:1px solid var(--moa-line);border-radius:var(--moa-radius-lg);background:var(--moa-surface);box-shadow:var(--moa-shadow-sm);>div{display:grid;gap:4px;}`;
export const infoPart = css`display:grid;grid-template-columns:100px minmax(0,1fr);gap:12px;padding:13px 0;border-bottom:1px solid var(--moa-line);p{margin:0;min-width:0;overflow-wrap:anywhere;}p:first-of-type{color:var(--moa-muted);font-size:13px;font-weight:750;}p:last-of-type{color:var(--moa-ink);font-weight:700;}`;
export const mapBox = css`min-height:310px;padding:10px;border:1px solid var(--moa-line);border-radius:var(--moa-radius-lg);background:var(--moa-surface);overflow:hidden;>div{width:100%;height:100%;display:grid;place-items:center;color:var(--moa-muted);}`;
