import { css } from "@emotion/react";

export function buildPageNumbers(currentPage: number, totalPages: number) {
  const visibleCount = Math.min(5, totalPages);
  const half = Math.floor(visibleCount / 2);
  const maxStart = Math.max(1, totalPages - visibleCount + 1);
  const start = Math.min(Math.max(1, currentPage - half), maxStart);

  return Array.from({ length: visibleCount }, (_, index) => start + index);
}

export const container = css`
  width: min(calc(100% - 48px), 1440px);
  margin: 26px auto 64px;
  min-width: 0;
  box-sizing: border-box;
  @media (max-width:720px) { width:calc(100% - 24px); margin-top:24px; }
`;

export const resultLine = css`
  width: 100%;
  border-top: 1px solid var(--moa-line);
  margin: 18px 0 24px;
`;

export const mainBox = css`
  margin: 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width:100%;
`;

export const resultHeader = css`
  width:100%; display:flex; justify-content:space-between; align-items:flex-end; gap:24px;
  > div:first-of-type > p { margin:6px 0 0; color:var(--moa-muted); font-size:13px; }
  @media (max-width:720px) { align-items:flex-start; flex-direction:column; gap:16px; }
`;

export const titleLine = css`
  display:flex; align-items:center; gap:10px;
  > h3 { margin:0; font-size:25px; color:var(--moa-ink); letter-spacing:-.04em; }
  > span { display:grid; place-items:center; min-width:30px; height:24px; padding:0 8px; border-radius:999px; background:var(--moa-primary-soft); color:var(--moa-primary-dark); font-size:12px; font-weight:900; }
`;

export const selectCategory = css`
  display: flex;
  flex-direction: row;
  list-style: none;
  width: auto;
  gap:6px;
  justify-content: flex-start;
  margin: 12px 0 0;
  padding:0;
`;

export const categoryList = css`
  padding: 0px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  gap: 50px;
  font-size: 11px;
  margin-top: 30px;
  padding: 0;
`;

export const category = css`
  border-radius: 5px;
  background-color: #ff7b54;
  padding: 5px 10px;
  box-sizing: border-box;
  color: white;
  height: 25px;
  line-height: 13px;
  font-size: 13px;
`;
export const buttonContainer = css`
  width: 100%;
  align-items: flex-end;
`;

export const pagination = css`
  width:100%; display:flex; justify-content:center; align-items:center; gap:8px; margin-top:34px;
  > button { min-width:40px; height:40px; padding:0 10px; border:1px solid var(--moa-line); border-radius:10px; background:var(--moa-surface); color:var(--moa-ink-subtle); font-weight:800; cursor:pointer; }
  > button:hover:not(:disabled) { border-color:var(--moa-primary); color:var(--moa-primary-dark); background:var(--moa-primary-soft); }
  > button[aria-current="page"] { border-color:var(--moa-primary); color:#fff; background:var(--moa-primary); }
  > button:disabled { opacity:.38; cursor:not-allowed; }
`;

export const buttonDiv = css`
  margin:0;
  display: flex;
  flex-wrap:wrap;
  gap:6px;
  align-items: center;
  justify-content: flex-end;
`;

export const sortButton = css`
  min-height:36px; padding:0 13px; border:1px solid var(--moa-line); border-radius:10px; background:var(--moa-surface); color:var(--moa-ink-subtle); font-size:12px; font-weight:800; cursor:pointer;
  &:hover { border-color:var(--moa-primary); color:var(--moa-primary-dark); background:var(--moa-primary-soft); }
`;
export const activeSortButton = css`border-color:var(--moa-primary); background:var(--moa-primary); color:#fff; &:hover { background:var(--moa-primary-dark); color:#fff; }`;
export const resultContent = css`width:100%;`;
export const emptyState = css`
  width:100%; min-height:300px; box-sizing:border-box; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:46px 24px;
  border:1px solid var(--moa-line); border-radius:20px; background:linear-gradient(145deg, #fff 0%, var(--moa-surface-muted) 100%); box-shadow:var(--moa-shadow);
  > h2 { margin:18px 0 8px; color:var(--moa-ink); font-size:21px; letter-spacing:-.03em; }
  > p { margin:0 0 22px; color:var(--moa-muted); font-size:14px; }
`;
export const emptyIcon = css`width:64px; height:64px; display:grid; place-items:center; border-radius:20px; background:var(--moa-primary-soft); color:var(--moa-primary); font-size:30px; transform:rotate(-3deg);`;
export const emptyPrimaryAction = css`min-height:42px; display:flex; align-items:center; gap:7px; padding:0 17px; border:0; border-radius:11px; background:var(--moa-primary); color:#fff; font-weight:800; cursor:pointer; &:hover { background:var(--moa-primary-dark); }`;
export const emptySecondaryAction = css`min-height:42px; display:flex; align-items:center; gap:7px; padding:0 17px; border:1px solid var(--moa-primary); border-radius:11px; background:var(--moa-primary-soft); color:var(--moa-primary-dark); font-weight:800; cursor:pointer; &:hover { background:var(--moa-primary); color:#fff; }`;
export const loadingState = css`min-height:260px; display:flex; align-items:center; justify-content:center; gap:10px; color:var(--moa-muted); > span { width:18px; height:18px; border:2px solid var(--moa-line); border-top-color:var(--moa-primary); border-radius:50%; animation:spin .8s linear infinite; } @keyframes spin { to { transform:rotate(360deg); } }`;
