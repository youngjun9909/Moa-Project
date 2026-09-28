import { css } from "@emotion/react";

export const container = css`width: min(100%, 1120px); margin: 0 auto; padding: 24px clamp(16px, 4vw, 40px) 48px;`;
export const categoryList = css`width: 100%; display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 18px; list-style: none; margin: 0; padding: 0;`;
export const imgDiv = css`height: 150px; overflow: hidden; cursor: pointer; background: var(--moa-surface-muted); transition: transform 0.2s ease; &:hover { transform: scale(1.02); }`;
export const img = css`width: 100%; height: 100%; object-fit: cover;`;
export const groupLi = css`width: 100%; padding: 0 0 14px; border: 1px solid var(--moa-line); border-radius: 14px; overflow: hidden; background: var(--moa-surface); box-shadow: var(--moa-shadow); transition: transform 0.2s ease, box-shadow 0.2s ease; &:hover { transform: translateY(-3px); box-shadow: 0 14px 30px rgba(23, 42, 58, 0.12); }`;
export const line = css`border-top: 1px solid var(--moa-line); margin: 12px 14px 8px;`;
export const content = css`margin: 0; color: var(--moa-ink); font-size: 14px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`;
export const listDetail = css`display: flex; justify-content: space-between; gap: 8px; padding: 0 14px; color: var(--moa-muted); font-size: 12px;`;
export const category = css`border-radius: 999px; background: rgba(242, 189, 75, 0.18); padding: 4px 8px; color: #8b6110;`;
export const click = css`cursor: pointer; background: transparent; border: 0; color: var(--moa-primary); padding: 2px;`;
