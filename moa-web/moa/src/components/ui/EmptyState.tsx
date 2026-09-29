/** @jsxImportSource @emotion/react */
import { ReactNode } from "react";
import { css } from "@emotion/react";

interface EmptyStateProps { title: string; description?: string; action?: ReactNode; icon?: ReactNode; tone?: "neutral" | "error"; }
const wrap = css`min-height:240px; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:36px; border:1px dashed var(--moa-line-strong); border-radius:var(--moa-radius-lg); background:var(--moa-surface-muted); h2{margin:0; font-size:21px; letter-spacing:-.03em;} p{max-width:520px; margin:9px 0 0; color:var(--moa-muted); line-height:1.65;} [data-empty-action]{margin-top:20px;}`;
const iconStyle = css`display:grid; place-items:center; width:52px; height:52px; margin-bottom:16px; border-radius:16px; background:var(--moa-primary-soft); color:var(--moa-primary-dark); font-size:25px;`;
export function EmptyState({ title, description, action, icon, tone = "neutral" }: EmptyStateProps) {
  return <section css={wrap} aria-label={title} data-tone={tone}>{icon && <div css={iconStyle} aria-hidden="true">{icon}</div>}<h2>{title}</h2>{description && <p>{description}</p>}{action && <div data-empty-action>{action}</div>}</section>;
}
