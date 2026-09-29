import { css } from "@emotion/react";

export const container = css`
  width: min(100%, 1100px);
  margin: 0 auto;
  padding: 48px clamp(20px, 5vw, 64px);
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const searchBar = css`
  width: 100%;
  min-height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 820px;
  padding: 0;
  margin: 0 auto;
`;

export const searchBarLine = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--moa-line);
  border-radius: 16px;
  padding: 8px 14px;
  background: var(--moa-surface);
  box-shadow: var(--moa-shadow-md);
  &:focus-within { border-color:var(--moa-primary); box-shadow:0 0 0 4px var(--moa-primary-soft); }
`;

export const searchBtn = css`
  font-size: 25px;
  margin: 0 8px 0 0;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  color: var(--moa-primary);
  cursor: pointer;
  &:active {
    color: rgb(250, 86, 37);
  }
`;

export const searchInput = css`
  width: 100%;
  min-height: 48px;
  border: none;
  outline: none;
  font-size: 16px;
  margin: 0;
  background: transparent;
`;

export const searchTitleList = css`
  width: min(100%, 820px);
  list-style: none;
  margin: 22px auto 0;
  padding: 0;

  > li {
    border-bottom: 1px solid var(--moa-line);
    margin: 0;
    padding: 0;
    transition: border-bottom 0.2s;
  }
  > li:hover {
    border-bottom: 1px solid var(--moa-primary);
    font-weight: 600;
  }

  > li > button {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    width:100%; min-height:48px; text-align:left; color:var(--moa-ink-subtle); padding:0 12px; border-radius:9px;
  }
  li > button:hover {
    color: rgb(0, 0, 0);
  }
`;

export const mainContainer = css`
  position: relative;
  width: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
`;

export const categoryBox = css`
  position: relative;
  background-color: #fff;
  width: min(calc(100% - 48px), 1440px);
  box-sizing: border-box;
  margin: 18px auto 0;
  border:1px solid var(--moa-line);
  border-radius: var(--moa-radius-lg);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  padding:20px 26px;
  box-shadow: var(--moa-shadow);
  @media (max-width:720px) { width:calc(100% - 24px); margin:12px auto 0; padding:14px 12px; }
`;
export const categoryHeader = css`
  display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:12px;
  strong { font-size:16px; color:var(--moa-ink); }
  p { margin:3px 0 0; color:var(--moa-muted); font-size:12px; }
`;
export const filterRows = css`
  display:grid; gap:10px; padding-top:2px;
`;
export const categoryCloseButton = css`
  width:34px; height:34px; display:grid; place-items:center; padding:0; border:1px solid var(--moa-line);
  border-radius:10px; background:var(--moa-surface); color:var(--moa-ink-subtle); font-size:20px; cursor:pointer;
  &:hover { color:var(--moa-primary-dark); border-color:var(--moa-primary); background:var(--moa-primary-soft); }
`;
export const filterToggleRow = css`
  width:min(calc(100% - 40px), 820px); margin:18px auto -30px; display:flex; justify-content:flex-end;
  position:relative; z-index:2;
  @media (max-width:720px) { width:calc(100% - 24px); margin:12px auto -22px; }
`;
export const filterToggleButton = css`
  min-height:38px; display:flex; align-items:center; gap:7px; padding:0 13px; border:1px solid var(--moa-chip-line);
  border-radius:10px; background:var(--moa-chip-bg); color:var(--moa-chip-ink); font-size:13px; font-weight:800; cursor:pointer;
  &:hover { background:var(--moa-chip-hover); border-color:var(--moa-primary); }
`;
export const ulStyle = css`
  list-style: none;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0px;
  padding: 0px;
`;
export const buttonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border: 1px solid var(--moa-chip-line);
  border-radius: 10px;
  font-size: 13px;
  min-height: 32px;
  margin: 0;
  padding: 0 10px;
  font-weight:700;
  background:var(--moa-chip-bg);
  color:var(--moa-chip-ink);
  cursor:pointer;
  transition:background 150ms ease, border-color 150ms ease, transform 150ms ease;
  &:hover { background:var(--moa-chip-hover); border-color:var(--moa-primary); transform:translateY(-1px); }
`;
export const categoryTitle = css`
  width: 100%;
  display: grid;
  grid-template-columns: 92px minmax(0, 1fr);
  align-items: start;
  gap:12px;
  margin:0;
  padding:10px 0;
  border-top:1px solid var(--moa-line);
  > p { min-height:32px; margin:0; display:flex; align-items:center; gap:7px; font-size:13px; font-weight:800; color:var(--moa-ink); }
  > p svg { color:var(--moa-primary); font-size:16px; }
  @media (max-width:720px) { grid-template-columns:1fr; gap:6px; }
`;
export const categorySearchBtn = css`
  min-width: 92px;
  margin: 4px;
  border: none;
  border-radius: 10px;
  background-color: var(--moa-primary);
  color: #fff;
  min-height:44px;
  padding: 0 16px;
  font-weight:800;
  box-sizing: border-box;
  &:hover {
    background-color: #e5673b;
  }
`;

export const buttonDiv = css`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
