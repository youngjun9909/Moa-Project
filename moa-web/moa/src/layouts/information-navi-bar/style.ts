import { css } from "@emotion/react";


export const infoNaviBar = css`
  box-sizing: border-box;
  padding: 12px 24px;
  height: var(--moa-header-height);
  width: calc(100% - var(--moa-sidebar-width));
  margin-left: var(--moa-sidebar-width);
  overflow: hidden;
  background-color: var(--moa-surface);
  border-bottom: 1px solid var(--moa-line);
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 0;
`;

export const serviceSidebar = css`
  position: absolute;
  inset: 0 auto 0 0;
  z-index: 5;
  width: var(--moa-sidebar-width);
  height: 100%;
  background: #fbfcfd;
  border-right: 1px solid var(--moa-line);
  display: flex;
  flex-direction: column;
`;

export const serviceBrand = css`
  height: var(--moa-header-height);
  border-bottom: 1px solid var(--moa-line);
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  > strong { color: var(--moa-ink); font-size: 19px; letter-spacing: -.03em; }
  > span { color: var(--moa-muted); font-size: 11px; margin-top: 2px; }
`;

export const serviceMenu = css`display:flex; flex-direction:column; gap:4px; padding:16px 12px;`;
export const menuCaption = css`margin:16px 10px 5px; color:var(--moa-muted); font-size:11px; font-weight:800; letter-spacing:.08em;`;
export const serviceItem = css`
  width:100%; min-height:44px; padding:0 12px; display:flex; align-items:center; gap:11px;
  border:0; border-radius:11px; background:transparent; color:var(--moa-ink-subtle); font-weight:700; text-align:left; cursor:pointer;
  > svg { font-size:19px; flex:0 0 auto; }
  &:hover { background:var(--moa-primary-soft); color:var(--moa-primary-dark); }
`;

export const globalSearch = css`
  width:min(48vw,520px); height:44px; display:flex; align-items:center; gap:10px; padding:0 15px;
  border:1px solid transparent; border-radius:12px; background:#f2f5f7; color:var(--moa-muted); cursor:pointer;
  &:hover { border-color:var(--moa-line-strong); background:#fff; }
`;

export const createGroupButton = css`
  min-height:44px; padding:0 16px; border:0; border-radius:11px; background:var(--moa-primary); color:#fff; font-weight:800; cursor:pointer;
  &:hover { background:var(--moa-primary-dark); }
`;

export const userInfoBox = css`
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  align-items: center;
`;

export const userImgBox = css`
  margin-right: 0;
  border: 2px solid #E7E7E7;
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  background-color: #E7E7E7;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

export const userImg = css`
  width: 100%;
  transition: transform 0.3s ease;
`;

export const userNameBox = css`
  color: var(--moa-ink);
  font-weight: 600;
  padding: 10px;
`;

export const userBox = css`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  background-color: var(--moa-surface-muted);
  margin: 0 10px;
  border-radius: 5px;
  cursor: pointer;
`;

export const innerInfoBox = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

export const logoutBtn = css`
    color: #0a3140 ;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  padding: 5px 10px;
  margin: 10px;
  border-radius: 5px;
  background-color: #cfcfcf;
  border: 1px solid #0a3140;
  cursor: pointer;
  &:hover{
    background-color: #afafaf;
    color: #fff;
    border: 1px solid #fff
  }
`;

export const signBtn = css`
  color: #0a3140 ;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  padding: 5px 10px;
  margin: 10px;
  border-radius: 5px;
  background-color: #E7E7E7;
  border: 1px solid #0a3140;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover{
    transform: scale(1.1);
  }
`;

export const naviBox = css`
  display: flex;
  align-items: center;
`;

export const naviDiv = css`
  box-sizing: border-box;
  flex-grow: 1;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

export const fontSt = css`
  margin: 0;
  margin-left: 15px;
  font-weight: 700;
  color: #0a3140;
  font-size: 16px;
`;

export const categoryBtn = css`
  background-color: rgba(0,0,0,0);
  border: none;
`
export const categoryBox = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  z-index: 2;
  margin: 90px;
`;

export const mainContainer = css`
  display: flex;
  flex-direction: column;
  height: var(--moa-header-height);
  position: relative;
`;

export const categoryBtnSpan = css`
  display: flex;
  align-items: center;
`

export const iconSt = css`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
`;

export const naviModal = css`
  width: 250px;
  max-Width: 360;
  position: absolute;  
  top: 100%;
  right: 5%;
  transform: translateX(0); 
  z-Index: 1;
  border-Radius: 10px;
  box-Shadow: 3;
  padding: 2;
`;

export const responsiveInfo = css`
  @media (max-width: 720px) {
    ${serviceSidebar} { display:none; }
    ${infoNaviBar} {
      width:100%;
      margin-left:0;
      height: auto;
      min-height: 64px;
      padding: 10px 12px;
      gap: 8px;
    }

    ${naviBox} {
      gap: 4px;
      overflow-x: auto;
    }

    ${globalSearch} { width:44px; padding:0; justify-content:center; > span { display:none; } }
    ${createGroupButton} { width:44px; padding:0; font-size:0; &::first-letter { font-size:20px; } }

    ${fontSt} {
      display: none;
    }

    ${naviDiv} {
      padding: 8px;
    }

    ${userBox} {
      margin: 0;
      padding: 6px;
    }

    ${userNameBox} {
      display: none;
    }
  }
`;
