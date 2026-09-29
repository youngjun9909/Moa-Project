/** @jsxImportSource @emotion/react */
import { ButtonHTMLAttributes } from "react";
import { css } from "@emotion/react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { variant?: ButtonVariant; }

const buttonStyle = css`
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 16px;
  border: 1px solid transparent;
  border-radius: var(--moa-radius-sm);
  font-weight: 750;
  cursor: pointer;
  transition: transform 150ms ease, background 150ms ease, border-color 150ms ease;
  &:hover:not(:disabled) { transform: translateY(-1px); }
  &:disabled { opacity: .5; cursor: not-allowed; }
  &[data-variant="primary"] { background: var(--moa-primary); color: #fff; box-shadow: 0 7px 16px rgba(242, 105, 73, .2); }
  &[data-variant="primary"]:hover:not(:disabled) { background: var(--moa-primary-dark); }
  &[data-variant="secondary"] { background: var(--moa-surface); color: var(--moa-ink); border-color: var(--moa-line-strong); }
  &[data-variant="ghost"] { background: transparent; color: var(--moa-ink-subtle); }
  &[data-variant="destructive"] { background: var(--moa-danger-soft); color: var(--moa-danger); border-color: var(--moa-danger-line); }
`;

export function Button({ variant = "primary", type = "button", ...props }: ButtonProps) {
  return <button css={buttonStyle} type={type} data-variant={variant} {...props} />;
}

