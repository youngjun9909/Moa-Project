/** @jsxImportSource @emotion/react */
import { cloneElement, ReactElement, useId } from "react";
import { css } from "@emotion/react";

interface FormFieldProps { label: string; error?: string; hint?: string; required?: boolean; children: ReactElement<any>; }
const wrap = css`display:flex; flex-direction:column; gap:7px; width:100%;`;
const labelStyle = css`font-size:14px; font-weight:750; color:var(--moa-ink);`;
const help = css`margin:0; font-size:12px; color:var(--moa-muted);`;
const errorStyle = css`margin:0; font-size:12px; color:var(--moa-danger); font-weight:650;`;

export function FormField({ label, error, hint, required, children }: FormFieldProps) {
  const fallbackId = useId();
  const id = children.props.id || `field-${fallbackId.replace(/:/g, "")}`;
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  const mergedDescription = [children.props["aria-describedby"], describedBy].filter(Boolean).join(" ") || undefined;
  const control = cloneElement(children, {
    id,
    required: required ?? children.props.required,
    "aria-invalid": error ? "true" : children.props["aria-invalid"],
    "aria-describedby": mergedDescription,
  });
  return <div css={wrap}><label css={labelStyle} htmlFor={id}>{label}{required ? " *" : ""}</label>{control}{hint && <p css={help} id={`${id}-hint`}>{hint}</p>}{error && <p css={errorStyle} id={`${id}-error`} role="alert">{error}</p>}</div>;
}
