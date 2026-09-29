/** @jsxImportSource @emotion/react */
import { ReactNode } from "react";
import { css, keyframes } from "@emotion/react";
import { EmptyState } from "./EmptyState";

type AsyncStatus = "idle" | "loading" | "success" | "empty" | "error";
interface StateCopy { title: string; description?: string; action?: ReactNode; }
interface AsyncStateProps { status: AsyncStatus; empty: StateCopy; error: StateCopy; children: ReactNode; loadingLabel?: string; }
const spin = keyframes`to { transform: rotate(360deg); }`;
const loadingStyle = css`min-height: 220px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; color:var(--moa-muted);`;
const spinnerStyle = css`width:34px; height:34px; border:3px solid var(--moa-line); border-top-color:var(--moa-primary); border-radius:50%; animation:${spin} .8s linear infinite;`;

export function AsyncState({ status, empty, error, children, loadingLabel = "내용을 불러오는 중이에요" }: AsyncStateProps) {
  if (status === "loading" || status === "idle") return <div css={loadingStyle} role="status" aria-label="로딩 중"><span css={spinnerStyle} aria-hidden="true" /><span>{loadingLabel}</span></div>;
  if (status === "empty") return <div role="status" aria-label="빈 결과"><EmptyState {...empty} /></div>;
  if (status === "error") return <div role="alert" aria-label="요청 오류"><EmptyState {...error} tone="error" /></div>;
  return <>{children}</>;
}
