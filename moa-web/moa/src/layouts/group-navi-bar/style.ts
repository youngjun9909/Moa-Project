import { css } from "@emotion/react";

export const fullBox = css`
  box-sizing: border-box;
  border-radius: 0;
  height: 100%;
  width: var(--moa-rail-width);
  overflow: hidden;
  background-color: var(--moa-surface-muted);
  border-right: 1px solid var(--moa-line);
  display: flex;
  flex-direction: column;
  min-width: var(--moa-rail-width);
  min-height: 0;
`;

export const headerBox = css`
  box-sizing: border-box;
  width: 100%;
  height: var(--moa-header-height);
  display: flex;
  padding: 10px 0;
  align-items: center;
  justify-content: center;
`;

export const logoImage = css`
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
  object-fit: cover;
  border-radius: 13px;

`;

export const imageBox = css`
  box-sizing: border-box;
  padding: 5px;
  width: 48px;
  min-width: 48px;
  height: 48px;
  min-height: 48px;
  border-radius: 15px;
  overflow: hidden;
  background-color: var(--moa-surface);
  border: 1px solid var(--moa-line);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  

  & > img {
    width: 100%;
  }

  & > h1 {
    margin: 0;
    font-size: 10px;
  }

  & > p {
    font-size: 12px;
    font-weight: 600;
    color: #333;
    text-align: center;
    margin: 0;
    width: 100%; 
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 18px rgba(23, 42, 58, 0.15);
  }
`;

export const middleBox = css`
  box-sizing: border-box;
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px 0;
  border-top: 1px solid var(--moa-line);
  min-height: 0;
  overflow-x: hidden;
  overflow-y: scroll; 
  scrollbar-width: none; 
  -ms-overflow-style: none; 

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const bottomBox = css`
  width: 100%;
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--moa-line);
`;

export const createBox = css`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const createIcon = css`
  font-size: 38px;
  color: var(--moa-primary);
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const responsiveFullBox = css`
  @media (max-width: 720px) {
    width: 100%;
    height: 68px;
    min-height: 68px;
    flex-direction: row;
    border-radius: 0;
    order: 2;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
    border-right: 0;
    border-top: 1px solid var(--moa-line);

    ${headerBox}, ${bottomBox} {
      width: auto;
      height: 68px;
      padding: 8px;
      border: 0;
    }

    ${middleBox} {
      flex-direction: row;
      overflow-x: auto;
      overflow-y: hidden;
      padding: 8px;
    }

    ${imageBox} {
      width: 48px;
      min-width: 48px;
      height: 48px;
      min-height: 48px;
      margin: 0 4px !important;
    }
  }
`;
