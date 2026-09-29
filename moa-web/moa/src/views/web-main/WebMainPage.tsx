/** @jsxImportSource @emotion/react */
import React, { useMemo } from "react";
import * as s from './style';
import logoImg from "../../images/moaLo.png"
import mainVideo from "../../video/mainVideo.mp4";
import webAppMain from "../../images/webAppMain.png";
// import 'animate.css';
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function WebMainPage() {

  const videoElement = useMemo(
    () => (
      <video autoPlay muted loop playsInline css={s.backgroundVideo}>
        <source src={mainVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    ),
    []
  );

  const handleClickWepAppPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate('/main')
  }

  const navigate = useNavigate();

  return (
    <div css={s.fullBox}>
      <div css={s.videoContainer}>
        {videoElement}
        <div css={s.header}>
          <div css={s.headerTop}>
            <button type="button" css={s.logoBox} onClick={() => navigate('/')} aria-label="MOA 홈">
              <img src={logoImg} alt="로고" css={s.smallLogo} />
              <strong>MOA</strong>
            </button>
            <div>
              <button css={s.button1} onClick={handleClickWepAppPage}>모아 시작</button>
            </div>
          </div>

          <div css={s.headerBottom}>
            <div css={s.leftBox}>
              <div>
                <span css={s.eyebrow}>TOGETHER, BRIGHTER</span>
                <h1>좋아하는 일을<br />좋아하는 사람들과.</h1>
                <p>가까운 동네의 취미 모임부터 꾸준히 함께할 정기 모임까지,<br />MOA에서 가볍게 시작해보세요.</p>
              </div>
              <div>
                <button css={s.button2} onClick={handleClickWepAppPage}>
                  모임 둘러보기
                </button>
              </div>
            </div>
            <div css={s.rightBox}>
              <div>
              <img src={webAppMain} alt="MOA 모임 화면 미리보기" />
              </div>
            </div>
          </div>
          <footer css={s.footer}>
            <div>
              <p css={s.fontSt}>© 2026 MOA. 함께하는 취향 생활.</p>
            </div>
            <div>
              <a href="https://github.com/korea-iot-moa" target="_blank" rel="noreferrer" aria-label="MOA GitHub">
                <FaGithub css={s.iconSt}/>
              </a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
