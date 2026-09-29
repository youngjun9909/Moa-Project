/** @jsxImportSource @emotion/react */
import { ElementType, ReactNode } from "react";
import { css } from "@emotion/react";

interface SectionCardProps {
  as?: ElementType;
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

const cardStyle = css`
  min-width: 0;
  padding: clamp(20px, 3vw, 30px);
  border: 1px solid var(--moa-line);
  border-radius: var(--moa-radius-lg);
  background: var(--moa-surface);
  box-shadow: var(--moa-shadow-sm);
`;
const headerStyle = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 22px;
  @media (max-width: 620px) { flex-direction: column; }
`;
const titleStyle = css`margin: 0; font-size: 20px; line-height: 1.35; letter-spacing: -.03em;`;
const descriptionStyle = css`margin: 6px 0 0; color: var(--moa-muted); font-size: 14px; line-height: 1.6;`;

export function SectionCard({ as: Component = "section", title, description, actions, children, className }: SectionCardProps) {
  return (
    <Component css={cardStyle} className={className}>
      {(title || description || actions) && (
        <header css={headerStyle}>
          <div>{title && <h2 css={titleStyle}>{title}</h2>}{description && <p css={descriptionStyle}>{description}</p>}</div>
          {actions && <div>{actions}</div>}
        </header>
      )}
      {children}
    </Component>
  );
}
