import { css } from "@emotion/react";

export const createPage = css`width:min(100%,1080px); margin:0 auto; padding:34px clamp(20px,4vw,48px) 64px;`;
export const createHeader = css`
  display:flex; justify-content:space-between; align-items:flex-end; gap:24px; margin-bottom:24px;
  > div > span { color:var(--moa-primary-dark); font-size:12px; font-weight:900; letter-spacing:.12em; }
  h1 { margin:7px 0 6px; font-size:clamp(27px,4vw,38px); letter-spacing:-.05em; color:var(--moa-ink); }
  p { margin:0; color:var(--moa-muted); }
  @media(max-width:720px){align-items:flex-start; flex-direction:column;}
`;
export const stepIndicator = css`
  display:flex; gap:8px; margin:0; padding:0; list-style:none;
  li { min-height:38px; display:flex; align-items:center; gap:7px; padding:0 12px; border:1px solid var(--moa-line); border-radius:999px; color:var(--moa-muted); font-size:12px; font-weight:800; }
  li[data-active="true"] { background:var(--moa-primary); border-color:var(--moa-primary); color:#fff; }
`;

export const Container = css`
  width:100%; padding:0; margin:0;
  > h4 { margin:0 0 9px; color:var(--moa-ink); font-size:14px; }
`;

export const formSection = css`
  width:100%; margin:0; padding:24px; border:1px solid var(--moa-chip-line); border-radius:16px;
  background:linear-gradient(90deg,var(--moa-primary) 0 68px,transparent 68px) top/100% 3px no-repeat,var(--moa-surface);
  box-shadow:0 8px 24px rgba(33,49,66,.045);
  > h2 { margin:0 0 8px; color:var(--moa-ink); font-size:18px; font-weight:900; letter-spacing:-.03em; }
  @media(max-width:620px){padding:20px 16px;}
`;
export const sectionDescription = css`margin:0 0 20px; color:var(--moa-muted); font-size:13px; line-height:1.6;`;
export const fieldGroup = css`
  min-width:0; margin-top:20px;
  &:first-of-type{margin-top:0;}
  > h4, > label { display:block; margin:0 0 9px; color:var(--moa-ink); font-size:14px; font-weight:800; }
`;
export const placeGrid = css`display:grid; grid-template-columns:minmax(240px,.7fr) minmax(320px,1.3fr); gap:24px; align-items:end; @media(max-width:760px){grid-template-columns:1fr; gap:2px;}`;
export const twoColumnFields = css`display:grid; grid-template-columns:1fr 1fr; gap:18px; @media(max-width:680px){grid-template-columns:1fr; gap:2px;}`;
export const addressInputRow = css`display:grid; grid-template-columns:minmax(0,1fr) auto; gap:9px; @media(max-width:520px){grid-template-columns:1fr;}`;
export const addressSearchButton = css`
  min-width:104px; min-height:48px; padding:0 16px; border:1px solid var(--moa-primary); border-radius:11px;
  background:var(--moa-primary); color:#fff; font-weight:800; cursor:pointer;
  &:hover{background:var(--moa-primary-dark); border-color:var(--moa-primary-dark);}
`;
export const detailAddressInput = css`
  width:100%; min-height:46px; margin-top:9px; padding:0 15px; border:1px solid var(--moa-line-strong); border-radius:11px; background:#fff; font-size:15px;
  &:focus{outline:3px solid var(--moa-primary-soft); border-color:var(--moa-primary);}
`;

export const AllBox = css`
  display: flex;
  justify-content: flex-start; 
  align-items: center; 
  gap: 10px; 
  flex-wrap: wrap; 
  margin-bottom: 0;
`;

export const Tab = css`
  font-family: "IBM Plex Sans", sans-serif;
  color: #000;
  cursor: pointer;
  font-size: 13px;
  background-color: var(--moa-chip-bg);
  min-width:96px;
  padding: 10px 14px;
  border:1px solid var(--moa-chip-line);
  border-radius: 11px;
  display: flex;
  justify-content: space-evenly;
  box-sizing: border-box;
  transition: none;

  &:hover {
    background-color: #f7e2d5;
  }

  &:focus {
    color: #fff;
    outline: none;
  }
`;

export const activeTab = css`
  background-color: var(--moa-primary);
  color: #fff;
  padding: 10px 12px; /* Tab과 동일하게 설정 */
  min-width:96px;
  font-size: 13px;
  border: none;
  outline: none;
  box-sizing: border-box;
  border-radius: 11px;
  transition: none;
`;

export const bottomBox = css`
  display: flex;
  align-items: end;
`;

export const DateContainer = css`
  display: flex;
  justify-content: center;
`;
export const DateBox = css`
  width:min(100%,320px);
  height:48px;
  text-align: center;
  border:1px solid var(--moa-line-strong); border-radius:11px; padding:0 13px;
`;

export const TitleInput = css`
  width: 100%;
  min-height: 48px;
  font-size: 16px;
  font-weight: 500;
  border:1px solid var(--moa-line-strong);
  border-radius: 11px;
  padding-left: 15px;
`;

export const ContentBox = css`
  width: 100%;
  height: 180px;
  font-size: 16px;
  font-weight: 500;
  border:1px solid var(--moa-line-strong);
  border-radius: 11px;
  text-align: left;
  resize: none;
  display: block;
  box-sizing: border-box;
  padding: 10px 15px;
`;
//  nth-of-type()
export const CreatorBox = css`
  margin:0;
  width:100%;
  padding:0;
  border:0;
  background:transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:stretch;
  gap:18px;
  `;

export const CreatorBox_1 = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > div {
    margin: 25px;
  }
`;

export const BottomButtonContainer = css`
  display: flex;
  justify-content:flex-end;
  gap:10px;
  padding-top:12px;
  width: 100%;
  margin:0;
`;

export const ImgInput = css`
  width: 50vh;
  height: 20px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 11px;
`;

export const MoveButton = css`
  font-family: "IBM Plex Sans", sans-serif;
  color: #000;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  background-color: var(--moa-primary);
  color:#fff;
  min-width: 140px;
  padding: 10px 12px;
  margin:0;
  border: none;
  border-radius:11px;
  display: flex;
  justify-content: space-evenly;

  &:hover {
    background-color: var(--moa-primary-dark);
  }

  &:focus {
    color: #fff;
    outline: 3px solid #dae2ed;
  }
`;

export const secondaryButton = css`
  min-width:110px; min-height:44px; padding:0 16px; border:1px solid var(--moa-line-strong); border-radius:11px;
  background:#fff; color:var(--moa-ink-subtle); font-weight:800; cursor:pointer;
  &:hover { border-color:var(--moa-primary); color:var(--moa-primary-dark); background:var(--moa-primary-soft); }
`;
export const previewImage = css`width:100%; max-height:300px; aspect-ratio:16/7; object-fit:cover; border-radius:14px; border:1px solid var(--moa-line);`;
export const fileButton = css`display:inline-flex; min-height:42px; align-items:center; padding:0 15px; border:1px solid var(--moa-chip-line); border-radius:11px; background:var(--moa-chip-bg); color:var(--moa-chip-ink); font-weight:800; cursor:pointer;`;
export const hiddenFileInput = css`position:absolute; width:1px; height:1px; overflow:hidden; opacity:0;`;
export const imageUpload = css`display:grid; grid-template-columns:minmax(0,1fr) 220px; gap:20px; align-items:center; @media(max-width:680px){grid-template-columns:1fr;}`;
export const uploadAction = css`display:flex; flex-direction:column; align-items:flex-start; gap:10px; span{color:var(--moa-muted); font-size:12px; line-height:1.5;}`;
