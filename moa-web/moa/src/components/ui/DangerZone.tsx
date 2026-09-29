/** @jsxImportSource @emotion/react */
import { ReactNode } from "react";
import { css } from "@emotion/react";

interface DangerZoneProps { title: string; description?: string; actions?: ReactNode; children?: ReactNode; }
const wrapStyle = css`padding:22px; border:1px solid var(--moa-danger-line); border-radius:var(--moa-radius-md); background:var(--moa-danger-soft);`;
const rowStyle = css`display:flex; align-items:center; justify-content:space-between; gap:18px; @media(max-width:620px){align-items:stretch; flex-direction:column;}`;
const titleStyle = css`margin:0; color:var(--moa-danger); font-size:18px;`;
const descriptionStyle = css`margin:7px 0 0; color:var(--moa-ink-subtle); font-size:14px; line-height:1.6;`;
export function DangerZone({ title, description, actions, children }: DangerZoneProps) {
  return <section css={wrapStyle} aria-label={title}><div css={rowStyle}><div><h2 css={titleStyle}>{title}</h2>{description && <p css={descriptionStyle}>{description}</p>}</div>{actions}</div>{children}</section>;
}
