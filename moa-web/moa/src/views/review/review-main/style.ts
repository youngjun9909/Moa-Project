import { css } from "@emotion/react";

export const fullBox = css`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding:34px clamp(20px,4vw,56px) 56px;
`;

export const header = css`
  width: min(100%, 1120px);
  margin-bottom: 24px;

  > div {
    min-height: 108px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div { > span { color: var(--moa-primary); font-size: 12px; font-weight: 800; letter-spacing: .1em; }
      > h1 { margin: 7px 0 4px; color: var(--moa-text); font-size: clamp(27px, 3vw, 36px); }
      > p { margin: 0; color: var(--moa-text-muted); }
    }

    > button {
    min-width: 112px;
    min-height: 44px;
    padding: 0 20px;
    border-radius: 12px;
    background: var(--moa-primary);
    border: 1px solid var(--moa-primary);
    color: #fff;
    font-weight: 700;
    cursor: pointer;

    &:hover {
      transform: translateY(-1px);
      box-shadow: var(--moa-shadow-sm);
    }

  }
  }
  
`;

export const mainBox = css`
  width: min(100%, 1120px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const reviewGrid = css`
  width: 100%; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px;
  @media (max-width: 820px) { grid-template-columns: 1fr; }
`;

export const reviewBox = css`
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  padding: 0;
`;

export const reviewHeader = css`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 4px 9px;
  gap: 10px;

  > p, > time { margin: 0; color: var(--moa-text-muted); font-size: 13px; }
`;

export const reviewMain = css`
  box-sizing: border-box;
  background-color: #fff;
  border:1px solid var(--moa-line);
  border-radius: var(--moa-radius-md);
  width: 100%;
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  gap: 16px;
  padding: 14px;
  box-shadow: var(--moa-shadow-sm);
  @media (max-width: 520px) { grid-template-columns: 1fr; }
`;

export const imgBox  = css`
  box-sizing: border-box;
  width: 100%;
  aspect-ratio: 4 / 3;

  > div {
    background-color: #fff;
    width: 100%;
    height: 100%;
    border-radius: 5px;

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 12px;
    }
  }
`;

export const contentBox = css`
  box-sizing: border-box;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  > div:nth-child(1) {
    box-sizing: border-box;
    width: 100%;
    background-color: var(--moa-surface-muted);
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 5px 10px;

    > p {
      margin: 0; font-weight: 800; color: var(--moa-text);
    }
  }
  
  > div:nth-child(2) {
    box-sizing: border-box;
    width: 100%;
    min-height: 92px;
    border-radius: 5px;
    display: flex;
    padding: 5px 10px;

    > p {
      margin: 0;
      word-wrap: break-word; 
      word-break: break-word; 
      white-space: pre-wrap; color: var(--moa-text); line-height: 1.7;
    }
  }
`;
export const loadMore = css`
  margin-top: 28px; min-width: 132px; min-height: 44px; padding: 0 22px; border-radius: 12px;
  border: 1px solid var(--moa-primary); background: #fff; color: var(--moa-primary); font-weight: 800; cursor: pointer;
  &:hover:not(:disabled) { background: var(--moa-primary-soft); }
  &:disabled { opacity: .6; cursor: wait; }
`;
