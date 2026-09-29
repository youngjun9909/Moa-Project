import { css } from '@emotion/react';

export const fullBox = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding:34px clamp(20px,4vw,56px) 56px;
`;

export const headerBox = css`
  box-sizing: border-box;
  width: min(100%, 1120px);
  min-height: 84px;

  > h1 {
    color: #0a3140;
  }
`;

export const mainBox = css`
  box-sizing: border-box;
  width: min(100%, 1120px);
  height: 90%;
  padding: 20px 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr));
  gap: 18px;
  margin: 0 auto; 
  justify-items: center; 
`;

export const noticeBox = css`
  box-sizing: border-box;
  width: 100%;
  max-height: 270px;
  height: 100%;
  border:1px solid var(--moa-line);
  border-radius: var(--moa-radius-md);
  box-shadow: var(--moa-shadow-sm);
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 5px;


  > div:nth-child(1) {
    box-sizing: border-box;
    width: 100%;
    height: 15%;
    border-radius: 5px;
    background-color: var(--moa-surface-muted);
    padding: 5px 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    > h2 {
      box-sizing: border-box;
      margin: 0;
    }
  }

  > div:nth-child(2) {
    box-sizing: border-box;
    width: 100%;
    height: 70%;
    border-radius: 5px;
    background-color: var(--moa-surface-muted);
    padding: 5px 10px;
    display: flex;
    overflow-x: hidden;
    overflow-y: scroll;

    ::-webkit-scrollbar {
    display: none;
    }
  scrollbar-width: none;
  -ms-overflow-style: none;
    
    > p {
      margin: 0;
      box-sizing: border-box;
    }
  }

  > div:nth-child(3) {
    box-sizing: border-box;
    width: 100%;
    height: 10%;
    border-radius: 5px;
    background-color: var(--moa-surface-muted);
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    
    > p {
      margin: 0;
      box-sizing: border-box;
    }
  }
`;
