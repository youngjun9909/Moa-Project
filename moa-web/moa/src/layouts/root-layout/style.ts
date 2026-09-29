import { css } from "@emotion/react";

export const fullDiv = css`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: row;
  background-color: var(--moa-bg);
  overflow: hidden;
  

  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;

  @media (max-width: 720px) {
    padding: 0;
    height: 100dvh;
    flex-direction: column;
  }
`;
