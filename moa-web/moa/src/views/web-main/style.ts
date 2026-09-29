import { css } from "@emotion/react";

export const fullBox = css`
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;

  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export const videoContainer = css`
  position: relative;
  width: 100%;
  min-height: 100dvh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

export const backgroundVideo = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0; opacity:.16; filter:saturate(.65);
`;

export const header = css`
  box-sizing: border-box;
  width:min(100% - 40px,1180px); min-height:100dvh;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const headerTop = css`
  width: 100%;
  height: 86px;
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const headerBottom = css`
  width: 100%;
  flex:1;
  z-index: 1;
  padding: clamp(36px,7vw,88px) 0; display:grid; grid-template-columns:minmax(0,1fr) minmax(360px,.9fr); gap:clamp(30px,6vw,80px); align-items:center;
  @media(max-width:840px){grid-template-columns:1fr; text-align:center;}
`;

export const leftBox = css`
  width: 100%;
  display: flex;
  flex-direction: column;

  > div:nth-child(1) {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    > p {
      margin: 22px 0 0; font-size:17px; line-height:1.8; color:var(--moa-text-muted); text-align:left;
    }
    > h1 { margin:14px 0 0; color:var(--moa-text); font-size:clamp(42px,6vw,72px); line-height:1.12; letter-spacing:-.06em; }
  }

  > div:nth-child(2) {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`;

export const rightBox = css`
  width: 100%; height:auto; margin:0; border-radius:24px;
  overflow: hidden;

  > div {
    width: auto;
    height: auto;
    width:100%;

    > img {
    box-sizing: border-box;
    object-fit: contain;
    object-position: center; 
    width: 100%;
    height: auto; border-radius:20px; box-shadow:var(--moa-shadow-lg); border:1px solid rgba(255,255,255,.8);
  }
  }
  
`;

export const smallLogo = css`
  height: 50px; width:66px; object-fit:contain;
`;


export const logoBox = css`
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer; border:0; background:transparent; padding:0;

  > strong { color:var(--moa-text); font-size:20px; }

`;

export const button1 = css`
  padding: 10px 30px;
  background-color: #FF7B54;
  border: none;
  border-radius: 12px;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--moa-primary-dark);
  }
`;

export const button2 = css`
  min-width: 170px;
  min-height: 45px;
  margin-top: 30px;
  width: auto;
  padding: 10px 30px;
  background-color: #FF7B54;
  border: none;
  border-radius: 13px;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--moa-primary-dark);
  }
`;


export const footer = css`
  color: var(--moa-text-muted);
  width: 100%;
  min-height: 74px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  > div:nth-child(1) {
    display: flex;
    align-items: flex-end;
  }

  > div:nth-child(2) {
    display: flex;
    align-items: flex-end;
  }
`;

export const fontSt = css`
  color: var(--moa-text-muted);
`;

export const iconSt = css`
  color: var(--moa-text); width:32px; height:32px;
`;

export const eyebrow = css`color:var(--moa-primary); font-size:13px; font-weight:900; letter-spacing:.16em;`;
