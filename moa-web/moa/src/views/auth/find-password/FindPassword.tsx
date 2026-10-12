/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as s from "./style";
import * as logo from "../../../styles/LogoStyle";
import { useNavigate } from "react-router-dom";
import logoImg from "../../../images/moaLogo.png";
import axios from "axios";
import { MAIL_SEND_API } from "../../../apis";
import { AccountNav } from "../../my-page/AccountNav";
import "../../my-page/get-user-info/style.css";

export default function FindPassword({ account = false }: { account?: boolean }) {
  const [data, setData] = useState({ userId:"", userName:"" });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const onStorage = (event: StorageEvent) => { if (event.key === "PasswordResetTokenDeleted") navigate("/signIn"); };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [navigate]);
  const send = async (event: React.FormEvent) => {
    event.preventDefault();
    if (pending) return;
    setPending(true); setError("");
    try {
      const response = await axios.post(MAIL_SEND_API, data);
      if (!response.data.result) throw new Error("mail failed");
      setSent(true);
    } catch { setError("메일을 보내지 못했어요. 아이디와 이름을 확인해주세요."); }
    finally { setPending(false); }
  };
  return <main css={account ? s.accountPage : s.fullBox}>
    {account && <><header className="mypageHeader"><span>ACCOUNT SECURITY</span><h1>비밀번호 변경</h1><p>본인 인증 메일을 통해 안전하게 새 비밀번호를 설정하세요.</p></header><AccountNav /></>}
    <section css={account ? s.accountCard : s.innerBox}>
      {!account && <button css={s.brandButton} onClick={() => navigate("/main")} aria-label="MOA 홈"><img src={logoImg} alt="MOA" css={logo.logo} /></button>}
      {sent ? <div css={s.mailBox} role="status" aria-live="polite"><h2>이메일을 확인해주세요</h2><p>가입한 이메일로 재설정 링크를 보냈어요.<br />메일의 링크에서 새 비밀번호를 설정해주세요.</p></div> :
        <form css={s.mainBox} onSubmit={send}>
          {account ? <h2>이메일로 본인 확인</h2> : <h1>비밀번호 찾기</h1>}
          <p css={s.description}>가입한 아이디와 이름을 입력하면 재설정 링크를 보내드려요.</p>
          <div><label css={s.fieldLabel} htmlFor="password-user-id">아이디</label><input id="password-user-id" name="userId" autoComplete="username" required placeholder="가입한 아이디" css={s.topInput} value={data.userId} onChange={e => setData({...data,userId:e.target.value})} /></div>
          <div><label css={s.fieldLabel} htmlFor="password-user-name">이름</label><input id="password-user-name" name="userName" autoComplete="name" required placeholder="가입한 이름" css={s.bottomInput} value={data.userName} onChange={e => setData({...data,userName:e.target.value})} /></div>
          {error && <p css={s.errorMessage} role="alert">{error}</p>}
          <div css={s.bottomBox}><button disabled={pending}>{pending ? "메일 전송 중…" : "인증 메일 보내기"}</button></div>
        </form>}
      <button css={s.backLink} onClick={() => navigate(account ? "/mypage/userInfo" : "/signIn")}>{account ? "내 정보로 돌아가기" : "로그인으로 돌아가기"}</button>
    </section>
  </main>;
}
