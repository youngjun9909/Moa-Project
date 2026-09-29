import { css } from "@emotion/react";

export const fullBox = css`
  position: relative;
  width: 100%;
  min-height: 100%;
  padding:32px clamp(20px,4vw,48px) 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const header = css`
  width:min(100%,900px);
  min-height:80px;
  display: flex;
  flex-direction: column;

  > h1 {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    font-weight: bold;
    margin: 0;
  }

  > p {
    margin-left: 42px;
    color: #E50914;
  }
`;

export const mainBox = css`
  box-sizing: border-box;
  width:min(100%,900px);
  min-height:560px;
  background-color: var(--moa-surface);
  border:1px solid var(--moa-line);
  border-radius: var(--moa-radius-lg);
  box-shadow:var(--moa-shadow-sm);
  display: flex;
  flex-direction: column;
  padding: clamp(20px,4vw,40px);
  gap: 20px;
`;

export const mainHeader = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 10%;

  > div:nth-child(1) {
    background-color: #fff;
    padding: 10px 40px;
    border-radius: 11px;
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

    
    > select {
      width: 100%;
      padding: 10px 40px;
      border-radius: 11px;
      border: none;
      outline: none;
    }
`;

export const content = css`
  box-sizing: border-box;
  width: 100%;
  height: 40%;
  background-color: #fff;
  border-radius: 11px;

  > textArea {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    resize: none;
    border: none;
    border-radius: 11px;
    padding: 10px 15px;
    font-size: 18px;
  }
`;

export const imgFile = css`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: row;
  gap: 10px;

  > div:nth-child(1) {
    box-sizing: border-box;
    width: 60%;
    height: 100%;
    padding: 10px;
    background-color: #fff;
    border-radius: 11px;

    > img {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border-radius: 11px;
      border: none;
      object-fit: contain;
    }
  }

  > div:nth-child(2) {
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;

    > input {
      display: none;
    }

    > label {
      box-sizing: border-box;
      border: 1px solid black;
      width: 100%;
      padding: 10px;
      border-radius: 11px;
      background-color: #fff;
      border: 1px solid #fff;
      text-align: center;
      cursor: pointer;

      &:hover {
        border: 1px solid #000;
      }
    }
  }
`;

export const btnBox = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height:48px;
  width:100%;

  > button {
    min-width:140px;
    min-height:44px;
    padding: 0 18px;
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 11px;
    cursor: pointer;
  }

  > button:nth-child(1) {
    &:hover {
      border: 1px solid #FF7B54;
      color: #FF7B54;
    }
  }

  > button:nth-child(2) {
    &:hover {
      border: 1px solid #FCD572;
      color: #FCD572;
    }
  }
`;

export const backPage = css`
  cursor: pointer;
`;

export const modalBox = css`
  position: fixed;
  bottom: 50%;
  width:min(calc(100% - 32px),500px);
  height: 200px;
  background-color: #fff;
  border-radius: var(--moa-radius-lg);
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
    border-radius: 11px;
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
