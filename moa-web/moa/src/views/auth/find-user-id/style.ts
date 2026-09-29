import { css } from "@emotion/react";

export const findUserIdContainer = css`
  width:100%; min-height:100dvh; padding:28px 20px; display:grid; place-items:center; overflow:auto;
`

export const findUserIdTitle = css`
  margin:18px 0 6px; color:var(--moa-ink); font-size:24px; letter-spacing:-.04em;
`
export const authDescription = css`margin:0 0 24px; color:var(--moa-muted); font-size:14px; text-align:center; line-height:1.6;`;
export const fieldLabel = css`margin:0 0 7px; color:var(--moa-ink-subtle); font-size:13px; font-weight:750;`;
export const inputBox = css`
  margin:auto;
  width:min(100%,460px);
  padding:32px;
  background:var(--moa-surface);
  border:1px solid var(--moa-line);
  border-radius:24px;
  box-shadow:var(--moa-shadow-md);
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const findUserIdForm = css`
  display: flex;
  flex-direction: column;
  width:100%;
`

export const findUserIdInput1 = css`
  height: 50px;
  width: 100%;
  border-radius: 11px;
  padding: 0 13px;
  box-sizing: border-box;
  border: 1px solid var(--moa-line-strong);
  font-size: 15px;
  margin-bottom: 14px;
  outline: none;
` 

export const findUserIdInput2 = css`
  height: 50px;
  width: 100%;
  padding: 0 13px;
  box-sizing: border-box;
  border: 1px solid var(--moa-line-strong);
  border-radius: 11px;
  font-size: 15px;
  margin-bottom:0;
  outline: none;
`  

export const findUserIdBtn = css`
  min-height: 48px;
  border: none;
  border-radius: 11px;
  margin-top: 22px;
  color: #fff;
  background-color: var(--moa-primary);
  font-weight:800;
  transition: background-color 0.05s;
  &:hover {
    background-color: var(--moa-primary-dark);
  }
`
export const findUserIdImg = css`
  width: 200px;
`

// FindUserIdResult
export const findUserIdResultBox = css`
  margin:auto;
  width:min(100%,520px);
  padding:32px;
  border:1px solid var(--moa-line);
  border-radius:24px;
  background:#fff;
  box-shadow:var(--moa-shadow-md);
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const findUserIdResultUl = css`
  list-style: none;
  font-size: 20px;
  li {
    margin-bottom: 10px;
  }
`

export const findUserIdResultline = css`
  width: 100%;
  border-top: 1px solid var(--moa-line);
  margin: 24px 0;
`

export const findUserIdResultBtn = css`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 11px;
  color: #fff;
  background-color: var(--moa-primary);
  cursor: pointer;
  transition: background-color 0.5s;
  &:hover {
    background-color: var(--moa-primary-dark);
  }
`
