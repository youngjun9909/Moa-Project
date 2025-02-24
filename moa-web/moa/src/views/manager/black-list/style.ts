import { css } from "@emotion/react";


export const fullBox = css`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0 20px;
`;

export const button = css`
  font-family: "IBM Plex Sans", sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  background-color: #CA3232;
  width: 150px;
  padding: 8px 10px;
  margin: 5px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: space-evenly;

  &:hover {
    background-color: #E50914;
  }

  &:focus {
    color: #fff;
    outline: 3px solid #E50914;
  }
`;

export const userImgBox = css`
  margin-right: 0;
  border: 2px solid #dbdbdb;
  box-sizing: border-box;
  width: 60px;
  height: 60px;
  background-color: #ffffff;
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

export const headerBox = css`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  padding: 20px 0;
`;


export const list = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
  
  > div:nth-child(1) {
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  > div:nth-child(2) {
    flex: 5;
  }

  > div:nth-child(3) {
    flex: 4;
    display: flex;
    justify-content: flex-end;
  }
`;

export const modalContent =css`
  position: absolute;
  background: white;
  top: 40%;
  right: 40%;
  padding: 20px;
  width: 300px;
  height: 150px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
`;

export const modalInner = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;

  > div:nth-child(1) {
    display: flex;
    justify-content: center;
  }

  > div:nth-child(2) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;

    > input {
      border-radius: 5px;
      border: 1px solid black;
      height: 25px;
      padding: 0 10px;
    }
  }

  > div:nth-child(3) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`;