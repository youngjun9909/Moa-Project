import { css } from "@emotion/react";


export const Tab = css`
  font-family: "IBM Plex Sans", sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  background-color:rgb(128, 132, 138);
  width: 20%;
  padding: 10px 12px;
  margin: 10px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: space-evenly;

  &:hover {
    background-color: #B0B8C4;
  }

  &:focus {
    color: #fff;
    outline: 3px solid #DAE2ED;
  }
`;

export const ulSt = css`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const listSt = css`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 10px;
  background-color: #eee;
  border-radius: 5px;
  padding: 10px;
`;

export const listTop = css`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  

  > div:nth-child(1) {
    flex: 4;
  }
  > div:nth-child(2) {
    flex: 3;
  }
  > div:nth-child(3) {
    flex: 5;
    display: flex;
    justify-content: flex-end;
    gap: 20px;
  }
`;

export const listBottom = css`
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
`;

export const btnBox = css`
  box-sizing: border-box;
  display: flex;
  gap: 10px;
  
  > button:nth-child(2) {
      height: 30px;
      width: 60px;
      background-color: #fff;
      border: 1px solid #CA3232;
      color: #CA3232;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: #E50914;
        border: 1px solid #E50914;
        color: #fff;
      }
    }

    > button:nth-child(1) {
      height: 30px;
      width: 60px;
      background-color: #fff;
      border-radius: 5px;
      border: 1px solid #2C3E50;
      color: #2C3E50;
      cursor: pointer;

      &:hover {
        background-color: #2C3E50;
        border: 1px solid #2C3E50;
        color: #fff;
      }
    }
`;