import { css } from '@emotion/react';

export const fullBox = css`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding:34px clamp(20px,4vw,56px) 56px;
`;

export const headerBox = css`
  width: min(100%, 1120px);
  padding: 18px 0 26px;
  > span { color: var(--moa-primary); font-size:12px; font-weight:800; letter-spacing:.1em; }
  > h1 { margin:7px 0 5px; color:var(--moa-text); font-size:clamp(27px,3vw,36px); }
  > p { margin:0; color:var(--moa-text-muted); }
`;

export const mainBox = css`
  box-sizing: border-box;
  width: min(100%, 1120px);
  display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:18px;
  @media(max-width:860px){grid-template-columns:1fr;}
`;

export const reviewBox = css`
  box-sizing: border-box;
  width: 100%;
  min-width:0;
  display: flex;
  flex-direction: column;
`;


export const reviewMain = css`
  box-sizing: border-box;
  background-color: var(--moa-surface-muted);
  border:1px solid var(--moa-line);
  border-radius: var(--moa-radius-md);
  width: 100%;
  display:grid; grid-template-columns:150px minmax(0,1fr); gap:16px; padding:14px; background:#fff; box-shadow:var(--moa-shadow-sm);
  @media(max-width:520px){grid-template-columns:1fr;}
`;

export const imgBox  = css`
  box-sizing: border-box;
  width:100%; aspect-ratio:4/3;
  border-radius: 0 0 5px 5px;

  > div {
    background-color: #fff;
    width: 100%;
    height: 100%;
    border-radius: 5px;

    > img {
      border-radius: 5px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export const contentBox = css`
  box-sizing: border-box;
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const groupInfoBox = css`
  box-sizing: border-box;
  width: 100%;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  
  > div {
    box-sizing: border-box;
    width: 100%;
    min-height: 34px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    margin: 0;
    border-bottom: 1px solid var(--moa-line);
  }
`;

export const iconSt = css`
  width: 30px;
  height: 30px;
  `;


  export const answerInfoBox = css`
    box-sizing: border-box;
    width: 100%;
    border-radius: 5px;
    background-color: #fff;
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-end;
    justify-content: space-between;

    > div:nth-child(1) {
      box-sizing: border-box;
      width: auto;
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      padding: 10px;
      
      > button {
        min-width: 84px;
        min-height: 36px;
        border: 1px  solid #f44336;
        border-radius: 5px;
        background-color: #fff;
        color: #f44336;
        font-weight: bold;
        cursor: pointer;

        &:hover {
          background-color: #f44336;
          color: #fff;
        }
      }
    }

    > div:nth-child(2) {
      box-sizing: border-box;
      width: auto;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      padding: 10px;

      > div {
        box-sizing: border-box;
        width: 100%;
        padding: 10px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        border-bottom: 1px dashed #0a3140 ;
      }

      > div:nth-child(1) {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;

        p {
          font-size: 14px;

        }
      }

      > div:nth-child(2) {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;
      }
    }
  `;

export const fontSt = (num: number) => css`
  font-size: 14px;
  font-weight: bold;
  color: ${num === 0 ? '#f44336' : num === 1 ? '#7BD04A' : '#000'};
`;
