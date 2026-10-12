import { css } from "@emotion/react";
export const AllBox = css`width:100%;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:24px;@media(max-width:960px){grid-template-columns:1fr;}`;
export const GenderChartBox = css`min-width:0;padding:24px;border:1px solid var(--moa-line);border-radius:20px;background:white;display:flex;flex-direction:column;align-items:center;h1{font-size:22px;letter-spacing:-.035em;}`;
export const QuarterBox = GenderChartBox;
export const QuartChartName = css`text-align:center;font-size:22px;`;

