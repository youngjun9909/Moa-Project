import { css } from "@emotion/react";

export const page = css`
  width: min(100%, 1320px);
  margin: 0 auto;
  padding: 32px clamp(20px, 4vw, 56px) 56px;
`;

export const panel = css`
  background: var(--moa-surface);
  border: 1px solid var(--moa-line);
  border-radius: var(--moa-radius-lg);
  padding: clamp(20px, 3vw, 32px);
`;

export const card = css`
  background: var(--moa-surface);
  border: 1px solid var(--moa-line);
  border-radius: var(--moa-radius-md);
  box-shadow: var(--moa-shadow-sm);
  transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
  &:hover { transform: translateY(-2px); box-shadow: var(--moa-shadow-md); border-color: var(--moa-line-strong); }
`;

export const field = css`
  width: 100%;
  min-height: 48px;
  border: 1px solid var(--moa-line-strong);
  border-radius: var(--moa-radius-sm);
  background: var(--moa-surface);
  color: var(--moa-ink);
  padding: 0 14px;
  font-size: 16px;
  transition: border-color 160ms ease, box-shadow 160ms ease;
  &:focus { border-color: var(--moa-primary); box-shadow: 0 0 0 4px var(--moa-primary-soft); outline: none; }
`;

export const chip = css`
  min-height: 40px;
  padding: 0 14px;
  border: 1px solid var(--moa-chip-line);
  border-radius: 11px;
  background: var(--moa-chip-bg);
  color: var(--moa-chip-ink);
  font-weight: 700;
  &:hover { background:var(--moa-chip-hover); border-color:var(--moa-primary); }
`;

export const sectionTitle = css`
  margin: 0;
  color: var(--moa-ink);
  font-size: clamp(20px, 2vw, 26px);
  line-height: 1.3;
  letter-spacing: -0.03em;
`;

export const responsiveGrid = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
  gap: 18px;
`;

export const visuallyHidden = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
