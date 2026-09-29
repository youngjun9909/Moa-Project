import { css } from "@emotion/react";

export const box = css`
  box-sizing: border-box;
  display: flex; 
  flex-direction :column ;
  padding: 0;
  gap: 10px;
`;

export const modalContainer = css`
  text-align: center;
  margin-top: 50px;
`;

export const boxContainer = css`
  position: relative; 
  display: flex; 
  flex-direction: row ;
  align-items: center;
  gap: 10px;
`;

export const openModalButton = css`
  padding: 5px 10px; 
  font-size: 16px;
  font-family: "IBM Plex Sans", sans-serif;
  color: #000;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  background-color:rgb(237, 152, 52);
  width: 100px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: space-evenly;

  &:hover {
    background-color: #B0B8C4;
  }

  &:focus {
    color: #000;
    outline: 3px solid #DAE2ED;
  }
`;  

export const modalOverlay= css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  padding :20px;
`;

export const modalContent =css`
  position: absolute;
  background: white;
  top: 40%;
  right: 40%;
  padding: 20px;
  width: 300px;
  height: 300px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
`;

export const closeModalButton = css`
  margin-top: 20px;
  padding: 0px 0px 0px 0px; 
  font-size: 16px;
  font-family: "IBM Plex Sans", sans-serif;
  color: #000;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  width: 20%;
  padding: 8px 10px;
  margin: 5px;
  border: none;
  border-radius: 7px;
  text-align: center;
  &:hover {
    background-color: #B0B8C4;
  }
  &:focus {
    color: #fff;
    outline: 3px solid #DAE2ED;
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
  width: 100%;
  min-height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0 4px;
  color: var(--moa-muted);
`;

export const mainBox = css`

`;

export const ulBox = css`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(70px, 1fr));
  gap: 10px;
  overflow-y: auto;
  padding: 0;
  margin: 0 0 18px;
  border-radius: var(--moa-radius-md);
  list-style: none;
`;

export const listItem = css`
  width: 100%;
  min-height: 84px;
  background-color: #fff;
  border: 1px solid var(--moa-line);
  border-radius: 14px;
  box-shadow: var(--moa-shadow-sm);
  display: flex;
  flex-direction: row;

  > div {
    height: 100%;
  }

  > div:nth-child(1) {
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > div:nth-child(2) {
    box-sizing: border-box;
    flex: 5;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 10px;

    > p {
      font-size: 18px;
      font-weight: bold;
    }
  }

  > div:nth-child(3) {
    flex: 3;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    > button {
      width: 100px;
      min-height: 38px;
      background-color: #fff;
      color: var(--moa-ink-subtle);
      border: 1px solid var(--moa-line-strong);
      border-radius: 10px;
      cursor: pointer;

      &:hover {
        color: #fff;
        border: 1px solid #CA3232;
        background-color: #CA3232;
      }
    }
  }
`;

export const btnBox = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  gap: 10px;

  > button {
    width: 100px;
    min-height: 38px;
    font-size: 14px;
    text-align: center;
    background-color: #fff;
    color: var(--moa-ink-subtle);
    border: 1px solid var(--moa-line-strong);
    border-radius: 10px;
    cursor: pointer;

      &:hover {
        color: #fff;
        border: 1px solid #CA3232;
        background-color: #CA3232;
      }
  }
`;

export const userLabel = css`
  font-size: 18px;
  margin: 12px 0;
  padding: 0;
  color: var(--moa-ink);
`;

export const modalHeader = css`
  padding: 10px 0;
  text-align: center;
`;

export const optionBox = css`
  padding: 10px 0;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  > input {
    display: none;
  }

  > label {
    border: 1px solid black;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    
    &:hover {
      background-color: #FF7B54;
      color: #fff;
      border: 1px solid #FF7B54;
    }

  }

  > input:checked + label {
    background-color: #FF7B54;
    color: #fff;
    border: 1px solid #FF7B54;
  }
`;

export const modalBottom = css`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export const modalInner = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;
