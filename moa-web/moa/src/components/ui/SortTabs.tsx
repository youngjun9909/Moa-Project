/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export interface SortOption<T extends string = string> { value: T; label: string; }
interface SortTabsProps<T extends string = string> { value: T; options: SortOption<T>[]; onChange: (value: T) => void; label?: string; }

const wrapStyle = css`display: inline-flex; align-items: center; gap: 4px; padding: 4px; border-radius: 12px; background: var(--moa-surface-muted); border: 1px solid var(--moa-line);`;
const buttonStyle = css`
  min-height: 36px;
  padding: 0 13px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: var(--moa-ink-subtle);
  font-size: 14px;
  font-weight: 750;
  cursor: pointer;
  transition: background 150ms ease, color 150ms ease, box-shadow 150ms ease;
  &[aria-pressed="true"] { background: var(--moa-surface); color: var(--moa-primary-dark); box-shadow: var(--moa-shadow-sm); }
  &:hover { color: var(--moa-primary-dark); }
`;

export function SortTabs<T extends string>({ value, options, onChange, label = "정렬 방식" }: SortTabsProps<T>) {
  return <div css={wrapStyle} role="group" aria-label={label}>{options.map(option => <button key={option.value} css={buttonStyle} type="button" aria-pressed={value === option.value} onClick={() => onChange(option.value)}>{option.label}</button>)}</div>;
}
