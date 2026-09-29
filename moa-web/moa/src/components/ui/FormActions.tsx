/** @jsxImportSource @emotion/react */
import { ReactNode } from "react";
import { css } from "@emotion/react";

interface FormActionsProps { primary: ReactNode; secondary?: ReactNode; note?: ReactNode; }
const wrapStyle = css`display:flex; align-items:center; justify-content:flex-end; flex-wrap:wrap; gap:10px; padding-top:8px; @media(max-width:520px){align-items:stretch; flex-direction:column-reverse; > * { width:100%; }}`;
const noteStyle = css`margin-right:auto; color:var(--moa-muted); font-size:13px; line-height:1.5;`;
export function FormActions({ primary, secondary, note }: FormActionsProps) {
  return <footer css={wrapStyle}>{note && <div css={noteStyle}>{note}</div>}{secondary}{primary}</footer>;
}
