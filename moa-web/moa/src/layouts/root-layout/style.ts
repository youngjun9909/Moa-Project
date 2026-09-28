import { css } from "@emotion/react";

export const fullDiv = css`
  box-sizing: border-box;
  margin: 0;
  padding: clamp(12px, 4vw, 48px);
  width: 100%;
  height: 100vh;
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
    height: auto;
    min-height: 100vh;
  }
`;
