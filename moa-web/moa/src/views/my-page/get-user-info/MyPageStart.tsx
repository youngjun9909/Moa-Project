import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { POST_MY_PAGE } from "../../../apis";
import { AccountNav } from "../AccountNav";
import { IoShieldCheckmarkOutline, IoPersonOutline } from "react-icons/io5";
import "./style.css";

export default function MyPageStart() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const verify = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!password) { setError("비밀번호를 입력해주세요."); return; }
    if (!cookies.token) { navigate("/signIn"); return; }
    if (pending) return;
    setPending(true); setError("");
    try {
      const response = await axios.post(POST_MY_PAGE, { password }, { headers: { Authorization: `Bearer ${cookies.token}` } });
      if (response.data.data === true) navigate("/mypage/userInfo/user/true");
      else setError("비밀번호를 다시 확인해주세요.");
    } catch { setError("인증하지 못했어요. 비밀번호와 연결 상태를 확인해주세요."); }
    finally { setPending(false); }
  };
  return <main className="accountPage">
    <header className="mypageHeader"><span>MY MOA</span><h1>내 정보</h1><p>나의 취향과 프로필, 계정 정보를 한곳에서 관리하세요.</p></header>
    <AccountNav />
    <div className="accountSplit">
      <section className="accountIntro"><span className="accountIcon"><IoPersonOutline /></span><h2>나를 소개하는 공간</h2><p>프로필 사진과 닉네임부터<br />연락처까지 최신 정보로 관리해보세요.</p><div className="accountNote"><IoShieldCheckmarkOutline /><p>소중한 개인정보를 보호하기 위해<br />비밀번호를 한 번 더 확인해요.</p></div></section>
      <form className="accountCard" onSubmit={verify}>
        <h2>안전하게 내 정보 확인</h2><p className="accountDescription">현재 사용 중인 비밀번호를 입력해주세요.</p>
        <label htmlFor="mypagePassword">현재 비밀번호</label>
        <input id="mypagePassword" type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} placeholder="비밀번호 입력" aria-invalid={!!error} aria-describedby={error ? "account-error" : undefined} />
        {error && <p id="account-error" className="accountError" role="alert">{error}</p>}
        <button className="accountPrimary" disabled={pending}>{pending ? "확인 중…" : "내 정보 수정"}</button>
        <button type="button" className="accountTextButton" onClick={() => navigate("/mypage/password")}>비밀번호를 변경하고 싶어요</button>
      </form>
    </div>
    <section className="accountDanger"><div><strong>회원 탈퇴</strong><p>탈퇴 전 안내사항과 삭제 범위를 확인해주세요.</p></div><button onClick={() => navigate("/mypage/userInfo/MembershipWithdrawal")}>탈퇴 안내 보기</button></section>
  </main>;
}
