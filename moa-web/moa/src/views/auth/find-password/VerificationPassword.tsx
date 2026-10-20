/** @jsxImportSource @emotion/react */
import * as s from "./style";
import * as logo from "../../../styles/LogoStyle";
import logoImg from "../../../images/moaLogo.png";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { RESET_PASSWORD_PUT_API } from "../../../apis";

const PASSWORD_RULE = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,16}$/;
const PASSWORD_RULE_TEXT = "비밀번호는 영문, 숫자, 특수문자를 모두 포함해 8~16자로 입력해주세요.";

type ResetPassword = {
  newPassword: string;
  confirmPassword: string;
};

export default function VerifyToken() {
  const [resetData, setResetData] = useState<ResetPassword>({
    newPassword: "",
    confirmPassword: "",
  });

  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);
  const [isPasswordSuccess, setIsPasswordSuccess] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const [cookies, setCookies, removeCookie] = useCookies(["PasswordResetToken"]);

  useEffect(() => {
    if (token) {
      setCookies("PasswordResetToken", token, { path: "/", maxAge: 1800 });
    }
  }, [token, setCookies]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target;
    setResetData({
      ...resetData,
      [element.name]: element.value,
    });
  };

  const handleResetPassword = async(e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
    if (e instanceof KeyboardEvent && e.key !== 'Enter') return;
      e.preventDefault();

    if (submitting) return;
    setErrorText("");

    if (!PASSWORD_RULE.test(resetData.newPassword)) {
      setIsPasswordMatch(true);
      setErrorText(PASSWORD_RULE_TEXT);
      return;
    }

    if (resetData.newPassword !== resetData.confirmPassword) {
      setIsPasswordMatch(false);
      return;
    }else {
      setIsPasswordMatch(true);
    }

    if (!cookies.PasswordResetToken) {
      setErrorText("인증 링크가 만료되었어요. 비밀번호 찾기를 다시 진행해주세요.");
      return;
    }

    setSubmitting(true);
    try {
      await axios.put(RESET_PASSWORD_PUT_API, {
          newPassword: resetData.newPassword,
        }, {
          headers: {
            Authorization: `Bearer ${cookies.PasswordResetToken}`,
          },
          withCredentials: true,
        })
        .then((response) => {
          if (!!response.data.result) {
            setIsPasswordSuccess(true);
            removeCookie("PasswordResetToken", { path: "/" });
            localStorage.setItem("PasswordResetTokenDeleted", Date.now().toString());
            
            setTimeout(() => {
              window.close();
            }, 5000);
          }
        });
    } catch (error) {
      console.error(error);
      setIsPasswordSuccess(false);
      const status = (error as { response?: { status?: number } }).response?.status;
      setErrorText(
        status === 401
          ? "인증 링크가 만료되었어요. 비밀번호 찾기를 다시 진행해주세요."
          : status === 400
          ? PASSWORD_RULE_TEXT
          : "비밀번호를 변경하지 못했어요. 잠시 후 다시 시도해주세요."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div css={s.fullBox}>
      <div css={s.innerBox}>
        <div css={logo.logoBox}>
          <img src={logoImg} alt="로고" css={logo.logo} />
        </div>
        {!isPasswordSuccess ? (
          <>
            <div css={s.mainBox2}>
              <h1>새 비밀번호 설정</h1>
              <p css={s.description}>안전한 새 비밀번호를 입력해주세요. 영문, 숫자, 특수문자를 모두 포함해 8~16자여야 해요.</p>
              <label css={s.fieldLabel} htmlFor="new-password">새 비밀번호</label>
              <input
                id="new-password"
                type="password"
                name="newPassword"
                autoComplete="new-password"
                value={resetData.newPassword}
                placeholder="새 비밀번호"
                onChange={handleInputChange}
                css={s.topInput}
              />
              <label css={s.fieldLabel} htmlFor="confirm-password">비밀번호 확인</label>
              <input
                id="confirm-password"
                type="password"
                name="confirmPassword"
                autoComplete="new-password"
                value={resetData.confirmPassword}
                placeholder="비밀번호 확인"
                onChange={handleInputChange}
                css={s.bottomInput}
              />
              <div aria-live="polite">
                {!isPasswordMatch && <p css={s.errorMessage}>비밀번호가 일치하지 않습니다.</p>}
                {errorText && <p css={s.errorMessage} role="alert">{errorText}</p>}
              </div>
            </div>
            <div css={s.bottomBox}>
              <button onClick={handleResetPassword} disabled={submitting}>{submitting ? "변경 중…" : "비밀번호 변경"}</button>
            </div>
          </>
        ) : (
          <>
          <div css={s.mailBox} aria-live="polite">
            <h1>비밀번호 변경 완료</h1>
            <h2>본 페이지로 이동해주세요.</h2>
          </div>
          </>
        )}
      </div>
    </div>
  );
}
