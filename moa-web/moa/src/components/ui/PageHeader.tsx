/** @jsxImportSource @emotion/react */
import { ReactNode } from "react";
import { css } from "@emotion/react";

interface PageHeaderProps { eyebrow?: string; title: string; description?: string; actions?: ReactNode; }

const wrap = css`display:flex; align-items:flex-end; justify-content:space-between; gap:24px; margin-bottom:28px; @media(max-width:720px){align-items:flex-start; flex-direction:column;}`;
const eyebrowStyle = css`margin:0 0 7px; color:var(--moa-primary-dark); font-size:12px; font-weight:850; letter-spacing:.1em;`;
const titleStyle = css`margin:0; color:var(--moa-ink); font-size:clamp(27px,3vw,38px); line-height:1.2; letter-spacing:-.045em;`;
const descStyle = css`margin:9px 0 0; color:var(--moa-muted); font-size:15px; line-height:1.65;`;

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return <header css={wrap}><div>{eyebrow && <p css={eyebrowStyle}>{eyebrow}</p>}<h1 css={titleStyle}>{title}</h1>{description && <p css={descStyle}>{description}</p>}</div>{actions && <div>{actions}</div>}</header>;
}

