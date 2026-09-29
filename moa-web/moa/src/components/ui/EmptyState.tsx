/** @jsxImportSource @emotion/react */
import { ReactNode } from "react";
import { css } from "@emotion/react";

interface EmptyStateProps { title: string; description?: string; action?: ReactNode; }
const wrap = css`min-height:240px; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:36px; border:1px dashed var(--moa-line-strong); border-radius:var(--moa-radius-lg); background:var(--moa-surface-muted);`;
export function EmptyState({ title, description, action }: EmptyStateProps) {
  return <section css={wrap} aria-label={title}><h2>{title}</h2>{description && <p>{description}</p>}{action}</section>;
}

