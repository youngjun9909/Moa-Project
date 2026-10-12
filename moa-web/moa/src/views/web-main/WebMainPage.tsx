/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import * as s from "./style";
import logoImg from "../../images/moaLo.png";
import mainVideo from "../../video/mainVideo.mp4";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AppPreview } from "./AppPreview";

export default function WebMainPage() {
  const navigate = useNavigate();
  const [videoReady, setVideoReady] = useState(false);
  return <div css={s.fullBox}>
    <div css={s.videoContainer}>
      <video autoPlay muted loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1} css={s.backgroundVideo} data-ready={videoReady} onPlaying={() => setVideoReady(true)} onError={() => setVideoReady(false)}><source src={mainVideo} type="video/mp4" /></video>
      <div css={s.header}>
        <header css={s.headerTop}><button css={s.logoBox} onClick={() => navigate("/")} aria-label="MOA 홈"><img src={logoImg} alt="" css={s.smallLogo} /><strong>MOA</strong></button><button css={s.button1} onClick={() => navigate("/main")}>MOA 시작하기 ↗</button></header>
        <main css={s.headerBottom}>
          <div css={s.leftBox}><span css={s.eyebrow}>A LITTLE MORE TOGETHER</span><h1>취향이 모이고,<br />우리의 일상이<br /><em>조금 더 즐겁게.</em></h1><p>가벼운 주말 약속부터 꾸준히 함께할 취미까지.<br />찾고, 만나고, 이야기를 나누는 우리들의 공간.</p><button css={s.button2} onClick={() => navigate("/main")}>나에게 맞는 모임 찾기 <span>→</span></button><div css={s.featureRow}><span>취향별 모임 탐색</span><span>한눈에 보는 일정</span><span>함께 나누는 후기</span></div></div>
          <div css={s.rightBox}><div css={s.previewLabel}><span>YOUR EVERYDAY COMMUNITY</span><span>웹앱 미리보기 · 예시 모임</span></div><AppPreview /><p css={s.previewFootnote}>탐색부터 모임 관리까지, 한 화면에서 편하게.</p></div>
        </main>
        <footer css={s.footer}><p>© 2026 MOA. 함께하는 취향 생활.</p><a href="https://github.com/korea-iot-moa" target="_blank" rel="noreferrer" aria-label="MOA GitHub"><FaGithub /></a></footer>
      </div>
    </div>
  </div>;
}
