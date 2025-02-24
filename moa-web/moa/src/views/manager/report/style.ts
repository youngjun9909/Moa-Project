import { css } from "@emotion/react";

export const ReportBox = css`
  width: 100%;
  height: auto;
  border: 1px solid gray; 
`;

export const layerBox = css`
  box-sizing: border-box;
  width: 100%;
  height: auto;
  min-height: 500px;
  border: 1px solid black;
  border-radius: 5px;
  margin-top: auto;
  visibility: hidden;
	position: absolute;
	opacity: 0;
  position: static;
	opacity: 1;
	visibility: visible;
  padding: 10px 20px;
  
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

export const tab = css`
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
    background-color:rgb(80, 82, 85);
  }

  &:focus {
    color: #fff;
    outline: 3px solid rgb(58, 59, 61);
  }
`;


export const headerBox = css`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 10px 10px;
`;

export const header = css`
  box-sizing: border-box;
  width: 100%;
  padding: 10px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  > div:nth-child(1) {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
  }

  > div:nth-child(2) {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;

    > button:nth-child(1) {
      height: 30px;
      width: 100px;
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

    > button:nth-child(2) {
      height: 30px;
      width: 100px;
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
      
  }
`;

export const ulSt = css`
  display: flex;
  flex-direction: column;
  gap: 20px;

  > li {
    list-style: none;
  }
`;

export const toggleBtn = css`
  font-size: 30px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.3);
  }
`;

export const reportDetail = css`
  box-sizing: border-box;
  width: 100%;
  height: 150px;
  padding: 10px;
  background-color: #eee;
  border-radius: 5px;
`;

export const bottomBox = css`
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  height: 300px;
  display: flex;
    justify-content: center;
    align-items: center;
  > img {
    width: 100%;
    height: 250px;
    box-sizing: border-box;
    object-fit: contain;
  }
`;