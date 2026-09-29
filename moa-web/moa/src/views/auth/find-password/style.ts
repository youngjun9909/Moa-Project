import { css } from '@emotion/react';

export const fullBox = css`
  width: 100%;
  min-height: 100dvh;
  padding:28px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const innerBox = css`
  box-sizing: border-box;
  width:min(100%,460px);
  min-height:0;
  padding:32px;
  border:1px solid var(--moa-line);
  border-radius:24px;
  background:#fff;
  box-shadow:var(--moa-shadow-md);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const mainBox = css`
  width: 100%;
  height:auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  > h1 { margin:18px 0 6px; color:var(--moa-ink); font-size:24px; letter-spacing:-.04em; }

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

export const topInput = css`
  width: 100%;
  height: 50px;
  font-size: 17px;
  padding:0 13px;
  border-radius: 11px;
  border: 1px solid var(--moa-chip-line);

  &:focus {
    outline: none;
    border: 1px solid var(--moa-primary);
    z-index: 1;
    transition: border 0.5s ease;
  }
`;

export const bottomInput = css`
  width: 100%;
  height: 50px;
  font-size: 17px;
  padding:0 13px;
  border-radius: 11px;
  border: 1px solid var(--moa-chip-line);
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border: 1px solid var(--moa-primary);
    z-index: 1;
    transition: border 0.5s ease;
  }
`;

export const bottomBox = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  > button {
    width: 100%;
    min-height: 48px;
    padding: 0 5px;
    font-size: 17px;
    border-radius: 11px;
    border: none;
    background-color: var(--moa-primary);
    color: #fff;
    cursor: pointer;

    &:hover, :active{
    background-color: var(--moa-primary-dark);
    border: none;
    outline: none;
  }
  }
`;

export const mailBox = css`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: var(--moa-radius-lg);
  border:1px solid var(--moa-line);
  box-shadow: var(--moa-shadow-sm);

  > h2 {
    margin: 0;
  }
`;

export const errorMessage = css`
  margin:8px 0 0; color:var(--moa-danger); font-size:13px;
`;

export const description = css`margin:0 0 24px; color:var(--moa-muted); font-size:14px; line-height:1.6; text-align:center;`;
export const fieldLabel = css`width:100%; margin:0 0 7px; color:var(--moa-ink-subtle); font-size:13px; font-weight:750;`;

export const mainBox2 = css`
  width: 100%;
  min-height:0;
  display: flex;
  flex-direction: column;
  align-items: center;

  > h1 { margin:18px 0 6px; color:var(--moa-ink); font-size:24px; letter-spacing:-.04em; }
`;
