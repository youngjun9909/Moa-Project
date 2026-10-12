import { css } from "@emotion/react";
import { field } from "../../../styles/theme";
export { userImgBox, userImg, modalContent } from "../manager-home/style";
export const fullBox = css`width:100%;padding:24px;border:1px solid var(--moa-line);border-radius:20px;background:white;`;
export const button = css`min-height:42px;padding:0 16px;border:1px solid var(--moa-danger-line);border-radius:11px;background:var(--moa-danger-soft);color:var(--moa-danger);font-size:14px;font-weight:750;cursor:pointer;`;
export const headerBox = css`display:flex;justify-content:flex-end;gap:12px;padding-bottom:20px;`;
export const list = css`display:grid;grid-template-columns:48px minmax(0,1fr) auto;gap:16px;align-items:center;padding:16px 0;border-bottom:1px solid var(--moa-line);@media(max-width:600px){grid-template-columns:48px minmax(0,1fr);>div:last-child{grid-column:1/-1;justify-self:end;}}`;
export const modalInner = css`display:flex;flex-direction:column;gap:18px;input{${field};}>div{display:flex;align-items:center;gap:10px;}`;
