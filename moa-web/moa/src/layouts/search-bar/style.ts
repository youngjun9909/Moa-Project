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
  width: auto;
  min-height: 300px;
  box-sizing: border-box;
  margin: 20px clamp(20px, 4vw, 56px) 0;
  border:1px solid var(--moa-line);
  border-radius: var(--moa-radius-lg);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  padding:24px;
  box-shadow: var(--moa-shadow-md);
  @media (max-width:720px) { margin:12px; padding:18px 14px; }
`;
export const ulStyle = css`
  list-style: none;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 0px;
  padding: 0px;
`;
export const buttonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border: 1px solid var(--moa-line);
  border-radius: 10px;
  font-size: 13px;
  min-height: 40px;
  margin: 4px;
  padding: 0 13px;
  font-weight:700;
`;
export const categoryTitle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 0 12px;
  > p { margin:0 0 8px; font-weight:800; color:var(--moa-ink); }
`;
export const categorySearchBtn = css`
  min-width: 92px;
  margin: 10px;
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
