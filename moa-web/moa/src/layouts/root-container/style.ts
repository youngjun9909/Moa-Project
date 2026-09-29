import { css } from "@emotion/react";

export const mainContainer = css`
  width: calc(100% - var(--moa-rail-width));
  height: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  position: relative;
  min-width: 0;
  background: var(--moa-surface);

  @media (max-width: 720px) {
    width: 100%;
    height: calc(100dvh - 68px);
  }

  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;
