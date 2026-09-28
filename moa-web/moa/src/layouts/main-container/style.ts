import { css } from "@emotion/react";

export const mainContainer = css`
  box-sizing: border-box;
  padding: 0;
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--moa-surface);
  border-radius: 0 var(--moa-radius) var(--moa-radius) 0;
  min-width: 0;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;

  @media (max-width: 720px) {
    border-radius: 0;
  }
`;
