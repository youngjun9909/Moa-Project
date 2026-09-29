import { css } from "@emotion/react";

export const fullBox = css`
  width:100%; height:100dvh; padding:28px 20px; display:flex; flex-direction:column;
  align-items:center; justify-content:flex-start; overflow-y:auto;
`;
export const authCard = css`
  width:min(100%,460px); padding:32px; border:1px solid var(--moa-line); border-radius:24px;
  background:var(--moa-surface); box-shadow:var(--moa-shadow-md); margin:auto 0;
  @media (max-width:520px) { padding:24px 20px; border-radius:0; min-height:100%; }
`;
export const brandSection = css`
  display:flex; flex-direction:column; align-items:center; text-align:center; margin-bottom:26px;
  > h1 { margin:18px 0 6px; color:var(--moa-ink); font-size:24px; letter-spacing:-.04em; }
  > p { margin:0; color:var(--moa-muted); font-size:14px; }
`;
export const brandButton = css`padding:0; border:0; background:transparent; cursor:pointer;`;
export const brandLogo = css`display:block; width:154px; height:auto;`;
export const formSection = css`display:flex; flex-direction:column;`;
export const fieldLabel = css`margin:0 0 7px; color:var(--moa-ink-subtle); font-size:13px; font-weight:750;`;
const field = (hasError: boolean) => css`
  width:100%; height:50px; padding:0 13px; border-radius:11px; font-size:16px; color:var(--moa-ink); background:#fff;
  border:1px solid ${hasError ? "var(--moa-danger)" : "var(--moa-line-strong)"};
  &:focus { outline:none; border-color:${hasError ? "var(--moa-danger)" : "var(--moa-primary)"}; box-shadow:0 0 0 4px var(--moa-primary-soft); }
`;
export const topInput = (hasError: boolean) => css`${field(hasError)}; margin-bottom:14px;`;
export const bottomInput = (hasError: boolean) => css`${field(hasError)};`;
export const signInBtn = css`
  width:100%; min-height:48px; margin-top:22px; padding:0 16px; border:0; border-radius:11px;
  background:var(--moa-primary); color:#fff; font-size:16px; font-weight:800; cursor:pointer;
  &:hover, &:active { background:var(--moa-primary-dark); }
`;
export const linkBox = css`
  margin-top:18px; display:flex; align-items:center; justify-content:center; gap:12px;
  > span { width:1px; height:12px; background:var(--moa-line); }
`;
export const linkText = css`color:var(--moa-link); font-size:13px; font-weight:700; text-decoration:none; &:hover{text-decoration:underline;}`;
export const divider = css`
  display:flex; align-items:center; gap:12px; margin:25px 0 16px; color:var(--moa-muted); font-size:12px;
  &::before, &::after { content:""; height:1px; flex:1; background:var(--moa-line); }
`;
export const socialSection = css`display:grid; grid-template-columns:1fr 1fr; gap:10px; @media(max-width:420px){grid-template-columns:1fr;}`;
export const anotherSignInBox = css`
  width:100%; min-height:48px; display:flex; align-items:center; margin:0; padding:0; overflow:hidden;
  border:1px solid var(--moa-line-strong); border-radius:11px; background:var(--moa-surface-muted); color:var(--moa-ink); cursor:pointer;
  > span { flex:1; padding:0 8px; font-size:12px; font-weight:750; text-align:center; }
  &.naver:hover { background:#01c73c; border-color:#01c73c; color:#fff; }
  &.kakao:hover { background:#fee500; border-color:#e6cf00; }
`;
export const anotherLogoBox = css`
  width:52px; height:48px; border-right:1px solid var(--moa-line); display:flex; justify-content:center; align-items:center;
  .naver { width:30px; height:26px; } .kakao { width:27px; height:27px; }
`;
export const errorMessage = css`margin:9px 0 0; color:var(--moa-danger); font-size:13px;`;
export const innerBox = authCard;
export const img = css`height:100%; width:100%;`;
export const logoImg = css`width:30px; height:30px;`;
