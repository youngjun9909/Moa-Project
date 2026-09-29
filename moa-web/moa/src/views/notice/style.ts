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
  box-sizing: border-box;
  width: min(100%, 1120px);
  padding: 18px 0 26px;
  > span { color: var(--moa-primary); font-size: 12px; font-weight: 800; letter-spacing: .1em; }
  > h1 { margin: 7px 0 5px; color: var(--moa-text); font-size: clamp(27px, 3vw, 36px); }
  > p { margin: 0; color: var(--moa-text-muted); }
`;

export const mainBox = css`
  box-sizing: border-box;
  width: min(100%, 1120px);
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0 auto; 
`;

export const noticeBox = css`
  box-sizing: border-box;
  width: 100%;
  min-height: 156px;
  border:1px solid var(--moa-line);
  border-radius: var(--moa-radius-md);
  box-shadow: var(--moa-shadow-sm);
  display: flex;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  padding: 24px 26px;
  gap: 12px 24px;
  background: #fff;


  > div:nth-child(1) {
    box-sizing: border-box;
    width: 100%;
    grid-column: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    > h2 {
      margin: 0; color: var(--moa-text); font-size: 19px;
    }
  }

  > div:nth-child(2) {
    box-sizing: border-box;
    width: 100%;
    grid-column: 1 / -1;
    
    > p {
      margin: 0; color: var(--moa-text-muted); line-height: 1.7;
    }
  }

  > time { grid-column: 2; grid-row: 1; color: var(--moa-text-muted); font-size: 13px; }
  @media (max-width: 560px) { padding: 20px; > time { grid-column: 1; grid-row: 2; } > div:nth-child(2) { grid-row: 3; } }
`;
