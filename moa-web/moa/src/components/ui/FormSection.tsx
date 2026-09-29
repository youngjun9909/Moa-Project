/** @jsxImportSource @emotion/react */
import { ReactNode } from "react";
import { css } from "@emotion/react";
import { SectionCard } from "./SectionCard";

interface FormSectionProps { title: string; description?: string; children: ReactNode; }
const fieldsStyle = css`display:grid; gap:20px; min-width:0;`;
export function FormSection({ title, description, children }: FormSectionProps) {
  return <SectionCard title={title} description={description}><div css={fieldsStyle}>{children}</div></SectionCard>;
}
