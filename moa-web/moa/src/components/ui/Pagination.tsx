/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface PaginationProps { page: number; totalPages: number; onChange: (page: number) => void; siblingCount?: number; }
const navStyle = css`display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 7px; margin-top: 30px;`;
const buttonStyle = css`
  min-width: 40px; height: 40px; padding: 0 11px;
  border: 1px solid var(--moa-line); border-radius: 11px;
  background: var(--moa-surface); color: var(--moa-ink-subtle); font-weight: 750; cursor: pointer;
  &:hover:not(:disabled) { border-color: var(--moa-primary); color: var(--moa-primary-dark); background: var(--moa-primary-soft); }
  &[aria-current="page"] { border-color: var(--moa-primary); background: var(--moa-primary); color: #fff; }
  &:disabled { opacity: .38; cursor: not-allowed; }
`;

export function Pagination({ page, totalPages, onChange, siblingCount = 2 }: PaginationProps) {
  if (totalPages <= 1) return null;
  const start = Math.max(1, Math.min(page - siblingCount, totalPages - siblingCount * 2));
  const end = Math.min(totalPages, Math.max(page + siblingCount, siblingCount * 2 + 1));
  const pages = Array.from({ length: end - start + 1 }, (_, index) => start + index);
  return (
    <nav css={navStyle} aria-label="페이지 이동">
      <button css={buttonStyle} type="button" aria-label="이전 페이지" disabled={page <= 1} onClick={() => page > 1 && onChange(page - 1)}>이전</button>
      {pages.map(item => <button key={item} css={buttonStyle} type="button" aria-label={`${item}페이지`} aria-current={item === page ? "page" : undefined} onClick={() => item !== page && onChange(item)}>{item}</button>)}
      <button css={buttonStyle} type="button" aria-label="다음 페이지" disabled={page >= totalPages} onClick={() => page < totalPages && onChange(page + 1)}>다음</button>
    </nav>
  );
}
