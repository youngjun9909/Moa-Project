/** @jsxImportSource @emotion/react */
import { ReactNode } from "react";
import { css } from "@emotion/react";

interface ResultToolbarProps {
  title: string;
  description?: string;
  count?: number;
  filters?: ReactNode;
  actions?: ReactNode;
}

const toolbarStyle = css`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  gap: 18px;
  padding: 4px 0 20px;
  border-bottom: 1px solid var(--moa-line);
  @media (max-width: 720px) { grid-template-columns: 1fr; align-items: start; }
`;
const titleRowStyle = css`display: flex; align-items: baseline; flex-wrap: wrap; gap: 10px;`;
const titleStyle = css`margin: 0; color: var(--moa-ink); font-size: clamp(23px, 2.4vw, 30px); letter-spacing: -.04em;`;
const countStyle = css`color: var(--moa-primary-dark); font-size: 14px; font-weight: 800;`;
const descriptionStyle = css`margin: 7px 0 0; color: var(--moa-muted); font-size: 14px; line-height: 1.6;`;
const controlsStyle = css`display: flex; align-items: center; justify-content: flex-end; flex-wrap: wrap; gap: 12px; @media(max-width:720px){justify-content:flex-start;}`;

export function ResultToolbar({ title, description, count, filters, actions }: ResultToolbarProps) {
  return (
    <section css={toolbarStyle} aria-label={`${title} 목록 도구`}>
      <div>
        <div css={titleRowStyle}><h1 css={titleStyle}>{title}</h1>{typeof count === "number" && <span css={countStyle}>{count}개의 모임</span>}</div>
        {description && <p css={descriptionStyle}>{description}</p>}
      </div>
      {(filters || actions) && <div css={controlsStyle}>{filters}{actions}</div>}
    </section>
  );
}
