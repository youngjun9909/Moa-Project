import { css } from "@emotion/react";
import { chip } from "../../../styles/theme";
export const Tab = css`${chip};cursor:pointer;`;
export const ulSt = css`display:flex;flex-direction:column;gap:16px;padding:0;margin:0;list-style:none;`;
export const listSt = css`width:100%;display:flex;flex-direction:column;gap:16px;padding:24px;border:1px solid var(--moa-line);border-radius:16px;background:white;box-shadow:var(--moa-shadow-sm);`;
export const listTop = css`display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;>div:last-child{display:flex;gap:10px;}`;
export const listBottom = css`padding:16px;border-radius:11px;background:var(--moa-surface-muted);line-height:1.7;overflow-wrap:anywhere;`;
export const btnBox = css`display:flex;gap:8px;button{min-height:42px;min-width:72px;padding:0 14px;border:1px solid var(--moa-chip-line);border-radius:11px;background:var(--moa-chip-bg);color:var(--moa-chip-ink);font-weight:750;cursor:pointer;}button:last-child{border-color:var(--moa-danger-line);background:var(--moa-danger-soft);color:var(--moa-danger);}`;
