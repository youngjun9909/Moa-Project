import { css } from "@emotion/react";
export const fullBox = css`width:100%;min-height:100dvh;background:white;`;
export const videoContainer = css`position:relative;isolation:isolate;min-height:100dvh;overflow:hidden;background:white;`;
export const backgroundVideo = css`
  position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-1;pointer-events:none;
  /* Invert the black matte, then multiply it into the white backing. */
  mix-blend-mode:multiply;background:white;filter:invert(1) saturate(.3);opacity:0;
  &[data-ready="true"]{opacity:.22;}
  @media(prefers-reduced-motion:reduce){display:none;}
`;
export const header = css`position:relative;width:min(100% - 64px,1440px);min-height:100dvh;margin:auto;display:flex;flex-direction:column;@media(max-width:600px){width:calc(100% - 36px);}`;
export const headerTop = css`display:flex;align-items:center;justify-content:space-between;min-height:86px;gap:16px;border-bottom:1px solid var(--moa-line);`;
export const headerBottom = css`flex:1;display:grid;grid-template-columns:minmax(0,.78fr) minmax(0,1.22fr);align-items:center;gap:clamp(32px,5vw,72px);padding:64px 0 72px;@media(max-width:1080px){grid-template-columns:1fr;gap:42px;padding:44px 0;}`;
export const leftBox = css`
  h1{font-size:clamp(38px,4.1vw,62px);letter-spacing:-.065em;line-height:1.22;margin:18px 0 22px;font-weight:850;}
  em{font-style:normal;color:var(--moa-primary);}
  p{color:var(--moa-ink-subtle);font-size:15px;line-height:1.9;margin:0;}
`;
export const rightBox = css`width:100%;min-width:0;`;
export const smallLogo = css`width:52px;height:44px;object-fit:contain;`;
export const logoBox = css`display:flex;gap:6px;align-items:center;border:0;background:none;padding:0;cursor:pointer;strong{font-size:22px;letter-spacing:-.03em;}`;
export const button1 = css`min-height:42px;padding:0 18px;border:1px solid var(--moa-chip-line);border-radius:11px;background:white;color:var(--moa-primary-dark);font-size:14px;font-weight:750;cursor:pointer;&:hover{background:var(--moa-chip-bg);}`;
export const button2 = css`display:flex;align-items:center;gap:24px;min-height:50px;padding:0 24px;margin-top:30px;border:0;border-radius:12px;background:var(--moa-primary);color:white;font-size:15px;font-weight:800;box-shadow:0 8px 20px var(--moa-primary-soft);cursor:pointer;&:hover{background:var(--moa-primary-dark);}span{font-size:22px;}`;
export const featureRow = css`display:flex;flex-wrap:wrap;gap:12px;margin-top:22px;font-size:11px;color:var(--moa-muted);span+span{border-left:1px solid var(--moa-line);padding-left:12px;}`;
export const previewLabel = css`display:flex;justify-content:space-between;gap:12px;margin:0 4px 13px;font-size:10px;color:var(--moa-muted);span:first-of-type{letter-spacing:.1em;font-weight:800;color:var(--moa-primary-dark);}@media(max-width:440px){flex-direction:column;gap:4px;}`;
export const previewFootnote = css`text-align:center;font-size:12px;color:var(--moa-muted);margin:18px 0 0;`;
export const footer = css`min-height:68px;border-top:1px solid var(--moa-line);display:flex;align-items:center;justify-content:space-between;gap:12px;color:var(--moa-muted);font-size:12px;a{color:var(--moa-ink-subtle);font-size:22px;}`;
export const eyebrow = css`color:var(--moa-primary-dark);font-size:11px;font-weight:850;letter-spacing:.15em;`;
