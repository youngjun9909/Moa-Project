import { css } from "@emotion/react";

export const LayerBox = css`
  width: 100%;
  height: auto;
  border: 1px solid gray; 
  margin-top: auto;
  visibility: hidden;
	position: absolute;
	opacity: 0;
  position: static;
	opacity: 1;
	visibility: visible;
`;

export const ReportBox = css`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;

export const btnBox = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  > button:nth-child(1) {
      height: 30px;
      width: 100%;
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
`;


export const ContentBox = css`
  text-align: start;
  width : 60%;
  height: 20px;
  text-align:center;
  font-size: 14px;
  border-radius: 2px;
  text-align: left; 
  resize: none; 
  box-sizing: border-box; 
`;

export const DateBox = css`
  width : 60%;
  height: 20px;
  text-align:center;
  font-size: 16px;
  border-radius: 7px;
`;

export const fullBox = css`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  gap: 10px;
`;

export const GenderChartBox = css`
  box-sizing: border-box;
  width: 50%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

export const voteBox = css`
  box-sizing: border-box;
  width: 50%;
  padding: 10px;
  display: flex;
  flex-direction: column;

  gap: 20px;

  > div:nth-child(1) {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
`;

export const voteSt = css`
  box-sizing: border-box;
  list-style: none;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  gap: 10px;
  padding: 10px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
`;

export const modalBox = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 20px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  > h2 {
    text-align: center;
  }
`;

export const voteContent = css`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
`;

export const createBtnBox = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
