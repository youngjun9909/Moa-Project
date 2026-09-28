import { css } from "@emotion/react";

export const container = css`width: min(100%, 1120px); margin: 0 auto; padding: 28px clamp(16px, 4vw, 40px) 48px;`;
export const mainBox = css`width: 100%; display: flex; flex-direction: column; align-items: flex-start;`;
export const selectCategry = css`display: flex; list-style: none; width: 150px; justify-content: space-around;`;
export const line = css`width: 100%; border-top: 1px solid var(--moa-line); margin: 10px 0;`;
export const groupList = css`display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 18px; width: 100%; list-style: none; padding: 0; margin: 14px 0 26px;`;
export const groupLi = css`display: block; width: 100%; padding: 0 0 14px; border: 1px solid var(--moa-line); border-radius: 14px; overflow: hidden; background: var(--moa-surface); box-shadow: var(--moa-shadow);`;
export const listDetail = css`display: flex; flex-direction: row; justify-content: space-between; gap: 8px; padding: 0 14px; color: var(--moa-muted); font-size: 12px;`;
export const content = css`margin: 0; color: var(--moa-ink); font-weight: 700;`;
export const marginPaddingDel = css`margin: 0; padding: 0 14px;`;
export const click = css`cursor: pointer; background: transparent; border: 0; color: var(--moa-primary);`;
export const imgDiv = css`display: flex; align-items: center; width: 100%; height: 150px; overflow: hidden; cursor: pointer;`;
export const img = css`width: 100%; height: 100%; object-fit: cover;`;
