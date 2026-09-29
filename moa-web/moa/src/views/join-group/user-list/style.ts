import { css } from "@emotion/react";
export const mainBox = css`width:100%;padding:24px;border:1px solid var(--moa-line);border-radius:var(--moa-radius-lg);background:var(--moa-surface);box-shadow:var(--moa-shadow-sm);`;
export const ulBox = css`display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;list-style:none;margin:0;padding:0;@media(max-width:680px){grid-template-columns:1fr;}`;
export const listItem = css`min-width:0;display:grid;grid-template-columns:54px minmax(0,1fr) auto;align-items:center;gap:12px;padding:14px;border:1px solid var(--moa-line);border-radius:14px;background:var(--moa-surface-muted);p{margin:0;font-weight:800;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}button{min-height:38px;padding:0 12px;border:1px solid var(--moa-danger-line);border-radius:10px;background:var(--moa-danger-soft);color:var(--moa-danger);font-weight:750;cursor:pointer;}`;
export const userImgBox = css`width:50px;height:50px;border:1px solid var(--moa-line);border-radius:50%;overflow:hidden;background:#fff;`;
export const userImg = css`width:100%;height:100%;object-fit:cover;`;
