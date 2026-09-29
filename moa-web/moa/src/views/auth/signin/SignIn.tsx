/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import * as s from "./style";
import logoImg from "../../../images/moaLogo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SignInResponseDto } from "../../../types";
import { useCookies } from "react-cookie";
import kakaoLogo from "../../../images/kakaoLogo.png";
import naverLogo from "../../../images/naverLogo.png";
import { SIGN_IN_API, SIGN_IN_SNS_API } from "../../../apis";

const ERROR_MESSAGES = {
  INVALID_ID: "영문, 숫자 8 ~ 14자 아이디를 입력 해 주세요.",
  INVALID_PASSWORD: "영문, 숫자, 특수기호 8~16자 비밀번호를 입력 해 주세요.",
  USER_NOT_FOUND: "아이디 또는 비밀번호를 확인해주세요.",
};

const idRegex = /^[a-zA-Z0-9]{8,14}$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,16}$/;

export default function SignIn() {
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [idError, setIdError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [, setCookies] = useCookies(["token"]);

  const navigate = useNavigate();

  const inputIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserId(value);

    if (value.trim()) {
      setIdError(false);
    }
  };

  const inputPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (value.trim()) {
      setPasswordError(false);
    }
  };

  const handleSignIn = async (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (e instanceof KeyboardEvent && e.key !== "Enter") return;
    e.preventDefault();

    if (!userId.trim() || !idRegex.test(userId)) {
      setErrorMessage(ERROR_MESSAGES.INVALID_ID);
      return;
    }

    if (!password.trim() || !passwordRegex.test(password)) {
      setErrorMessage(ERROR_MESSAGES.INVALID_PASSWORD);
      return;
    }

    if (userId && password && !idError && !passwordError) {
      try {
        const signinData = {
          userId,
          password,
        };

        const response = await axios.post(SIGN_IN_API, signinData);

        if (response.data) {
          signInSuccessResponse(response.data.data);
        }

        navigate("/main");
      } catch (error) {
        console.error(error);
        setErrorMessage(ERROR_MESSAGES.USER_NOT_FOUND);
      }
    }
  };

  const setToken = (token: string, exprTime: number) => {
    const expires = new Date(Date.now() + exprTime);
    setCookies("token", token, {
      path: "/",
      expires,
    });
  };

  const signInSuccessResponse = (data: SignInResponseDto) => {
    if (data) {
      const { token, exprTime, user } = data;
      setToken(token, exprTime);
    }
  };

  const onSnsButtonClickHandler = (sns: "kakao" | "naver") => {
    window.location.href = `${SIGN_IN_SNS_API}${sns}`;
  };

  return (
    <div css={s.fullBox}>
      <div css={s.authCard}>
        <div css={s.brandSection}>
          <button type="button" css={s.brandButton} onClick={() => navigate("/main")} aria-label="MOA 홈으로 이동">
            <img src={logoImg} alt="MOA" css={s.brandLogo} />
          </button>
          <h1>다시 만나서 반가워요</h1>
          <p>모임과 사람들을 계속 만나보세요.</p>
        </div>

        <form css={s.formSection}>
          <label css={s.fieldLabel} htmlFor="signin-id">아이디</label>
          <input id="signin-id" css={s.topInput(idError)} type="text" placeholder="아이디를 입력하세요" value={userId} onChange={inputIdChange} />
          <label css={s.fieldLabel} htmlFor="signin-password">비밀번호</label>
          <input id="signin-password" css={s.bottomInput(passwordError)} type="password" placeholder="비밀번호를 입력하세요" value={password} onChange={inputPasswordChange} />

          {errorMessage && <p css={s.errorMessage}>{errorMessage}</p>}

          <button css={s.signInBtn} onClick={handleSignIn}>로그인</button>
        </form>

        <div css={s.linkBox}>
          <a href="/findUserId" css={s.linkText}>아이디 찾기</a>
          <span aria-hidden="true" />
          <a href="/findPassword" css={s.linkText}>비밀번호 찾기</a>
          <span aria-hidden="true" />
          <a href="/signUp" css={s.linkText}>회원가입</a>
        </div>

        <div css={s.divider}><span>또는 간편 로그인</span></div>
        <div css={s.socialSection}>
        <button type="button" css={s.anotherSignInBox} className="naver" onClick={() => onSnsButtonClickHandler("naver")}>
          <div css={s.anotherLogoBox}>
            <img src={naverLogo} alt="네이버로고" className="naver" />
          </div>
          <span>Naver 계정으로 로그인</span>
        </button>
        <button type="button" css={s.anotherSignInBox} className="kakao" onClick={() => onSnsButtonClickHandler("kakao")}>
          <div css={s.anotherLogoBox}>
            <img src={kakaoLogo} alt="카카오로고" className="kakao" />
          </div>
          <span>Kakao 계정으로 로그인</span>
        </button>
        </div>
      </div>
    </div>
  );
}
