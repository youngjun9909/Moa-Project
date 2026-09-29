import { css } from "@emotion/react";

export const page = css`width:min(100%, 1440px); margin:0 auto; padding:clamp(24px,4vw,44px) clamp(18px,4vw,56px) 64px;`;
export const eyebrow = css`margin:0 0 7px; color:var(--moa-primary-dark); font-size:12px; font-weight:850; letter-spacing:.1em;`;
export const grid = css`
  display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:22px 18px; margin-top:24px;
  @media(max-width:1120px){grid-template-columns:repeat(3,minmax(0,1fr));}
  @media(max-width:820px){grid-template-columns:repeat(2,minmax(0,1fr));}
  @media(max-width:520px){grid-template-columns:1fr;}
`;
export const card = css`min-width:0; overflow:hidden; border:1px solid var(--moa-line); border-radius:var(--moa-radius-md); background:var(--moa-surface); box-shadow:var(--moa-shadow-sm); transition:transform 160ms ease,box-shadow 160ms ease,border-color 160ms ease; &:hover{transform:translateY(-3px); box-shadow:var(--moa-shadow-md); border-color:var(--moa-line-strong);}`;
export const imageButton = css`position:relative; display:block; width:100%; height:172px; padding:0; border:0; background:var(--moa-surface-muted); cursor:pointer; overflow:hidden;`;
export const image = css`width:100%; height:100%; display:block; object-fit:cover; transition:transform 220ms ease; ${imageButton}:hover &{transform:scale(1.035);}`;
export const badge = css`position:absolute; left:12px; top:12px; padding:5px 9px; border-radius:999px; background:rgba(255,255,255,.92); color:var(--moa-chip-ink); font-size:11px; font-weight:800; box-shadow:var(--moa-shadow-sm);`;
export const body = css`padding:15px 15px 16px;`;
export const titleRow = css`display:flex; align-items:flex-start; gap:10px;`;
export const titleButton = css`min-width:0; flex:1; padding:0; border:0; background:transparent; color:var(--moa-ink); text-align:left; font-size:16px; font-weight:800; line-height:1.4; cursor:pointer; display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:2; overflow:hidden;`;
export const heart = css`flex:0 0 auto; display:grid; place-items:center; width:36px; height:36px; padding:0; border:1px solid var(--moa-line); border-radius:11px; background:var(--moa-surface); color:var(--moa-primary); cursor:pointer; &:hover{background:var(--moa-primary-soft); border-color:var(--moa-primary);}`;
export const meta = css`display:grid; gap:7px; margin-top:13px; color:var(--moa-muted); font-size:12px;`;
export const metaRow = css`display:flex; align-items:center; gap:7px; min-width:0; span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}`;
