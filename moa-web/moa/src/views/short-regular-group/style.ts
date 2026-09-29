import { css } from "@emotion/react";

export const container = css`
  width: min(100%, 1320px);
  margin: 0 auto;
  padding: 34px clamp(20px, 4vw, 56px) 56px;
`;

export const resultLine = css`
  width: 100%;
  border: 1px solid #eee;
  margin-top: 10px;
`;
export const mainBox = css`
  margin: 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const selectCategry = css`
  display: flex;
  flex-direction: row;
  list-style: none;
  width: 150px;
  justify-content: space-around;
`;

export const line = css`
  border: 1px solid #ddd;
  margin: 10px 0px;
`;

export const groupList = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
  gap: 18px;
  list-style: none;
  width:100%;
  padding:0;
`;

export const groupLi = css`
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 0px;
  margin: 0;
  border:1px solid var(--moa-line);
  border-radius:var(--moa-radius-md);
  overflow:hidden;
  background:var(--moa-surface);
  box-shadow:var(--moa-shadow-sm);
`;

export const listDetail = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 13px;
  padding:0 14px;
`;

export const content = css`
  margin: 0px;
`;

export const buttonDiv = css`
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  > div > button {
    background-color: rgba(0, 0, 0, 0);
    border: none;
  }
  > div > button:hover {
    color: rgb(100, 100, 100);
  }
  > div > span {
    margin: 0px 5px;
  }
`;
