import { css } from "@emotion/react";

export const fullBox = css`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding:32px clamp(20px,4vw,56px) 56px;
`;

export const header = css`
  width: min(100%, 1120px);
  min-height: 88px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const backPage = css`
  cursor: pointer;
  font-size: 30px;
`;

export const imageBox  = css`
  box-sizing: border-box;
  width: min(100%, 1120px);
  height: clamp(280px,42vw,480px);
  background-color: var(--moa-surface-muted);
  border-radius: var(--moa-radius-lg);
  padding: 0;
  overflow:hidden;

  > img{
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const tapBox = css`
  width: min(100%, 1120px);
  min-height: 78px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  
`;

export const tabBtn = (isActive: boolean) => css`
  box-sizing: border-box;
  min-width: 100px;
  height: 48px;
  font-size: 16px;
  background-color: #fff;
  border: none;
  border-bottom: ${isActive ? "3px solid var(--moa-primary)" : "3px solid transparent"};
  cursor: pointer;
`;

export const contentBox = css`
  box-sizing: border-box;
  width: min(100%, 1120px);
  min-height: 500px;
  height: auto;
  background-color: var(--moa-surface-muted);
  border:1px solid var(--moa-line);
  border-radius: var(--moa-radius-lg);
  padding: 16px;

  > div {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
  }
`;

export const categoryBox = css`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: var(--moa-surface-muted);

  > span {
    width: auto;
    min-width: 80px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    transition: transform 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }

  > span:nth-child(1) {
    background-color: #FF7B54;
    color: #fff;
  }
  > span:nth-child(2) {
    background-color: #FCD572;
    color: #fff;
  }
  > span:nth-child(3) {
    background-color: #0a3140;
    color: #fff;
  }
`;

export const content = css`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 20px;

  > h2 {
    margin-bottom: 20px;
  }

`;

export const supplies = css`
  box-sizing: border-box;
  width: min(100%, 1120px);
  height: 200px;
  margin: 50px 0;
  background-color: var(--moa-surface-muted);
  border:1px solid var(--moa-line);
  border-radius: var(--moa-radius-lg);
  padding: 16px;

  > div {
    box-sizing: border-box;
    background-color: #fff;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    padding: 20px;

    > h2 {
      margin-bottom: 20px;
    }
  }
`;

export const mapBox = css`
  box-sizing: border-box;
  width: min(100%, 1120px);
  height: 300px;
  background-color: var(--moa-surface-muted);
  border-radius: var(--moa-radius-lg);
  box-sizing: border-box;
  padding: 10px;

  > div {
    width: 100%;
    height: 100%;
  }
`;

export const joinBox = css`
  width: min(100%, 1120px);
  height: 200px;
  display: flex;
  align-items: center;
  
  > button {
    width: 100%;
    height: 50px;
    font-size: 20px;
    background-color: var(--moa-primary);
    color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 10px;

    &:hover {
      background-color: var(--moa-primary-dark);
    }
  }
`;

export const modalBox = css`
  position: fixed;
  bottom: 50%;
  width: 500px;
  height: 200px;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 1002;

  > button {
    width: 200px;
    height: 30px;
    background-color: #fff;
    border: 1px solid #FF7B54;
    border-radius: 5px;
    color: #FF7B54;
    padding: 10px;
    display: flex;
    align-items: center;
    font-weight: bold;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background-color: #FF7B54;
      color: #fff;
    }
  }
`;
