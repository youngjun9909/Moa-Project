/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { NavLink } from "react-router-dom";
const style = css`
  display:flex; flex-wrap:wrap; gap:8px; margin:0 0 28px; padding-bottom:20px; border-bottom:1px solid var(--moa-line);
  a { min-height:42px; display:inline-flex; align-items:center; padding:0 16px; border:1px solid var(--moa-chip-line); border-radius:11px; color:var(--moa-chip-ink); text-decoration:none; font-size:14px; font-weight:750; }
  a:hover { background:var(--moa-chip-bg); }
  a.active { background:var(--moa-primary); border-color:var(--moa-primary); color:white; }
`;
export function AccountNav() {
  return <nav css={style} aria-label="내 계정 메뉴">
    <NavLink to="/mypage/userInfo">내 정보</NavLink>
    <NavLink to="/mypage/password">비밀번호 변경</NavLink>
    <NavLink to="/mypage/participationStatus">참여 일정</NavLink>
    <NavLink to="/review/myPage">내 후기 관리</NavLink>
  </nav>;
}
