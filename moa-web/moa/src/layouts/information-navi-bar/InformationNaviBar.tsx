/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as s from "./style";
import { useNavigate } from "react-router-dom";
import userImg from "../../images/userImg.png";
import { IoExtensionPuzzle, IoSearchSharp, IoHomeOutline, IoHeartOutline, IoCalendarOutline } from "react-icons/io5";
import { MdStickyNote2 } from "react-icons/md";
import { HiMenu } from "react-icons/hi";
import userAuthStore from "../../stores/auth.store";
import { useCookies } from "react-cookie";
import HamburgerMenu from "../../components/HamburgerMenu";
import { INFORMATION_IMG } from "../../apis";

export default function InformationNaviBar() {
  const { nickName, profileImage, isAuthenticated, logout } = userAuthStore();
  const [cookies] = useCookies(["token"]);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const [headerKeyword, setHeaderKeyword] = useState("");

  const navigator = useNavigate();

  useEffect(() => {
    if (!cookies.token) {
      logout();
      setMenuOpen(false);
    }
  }, [cookies.token, logout]);

  const handleClickButton = () => {
    navigator("/main/search");
    setMobileNavOpen(false);
  };

  const handleMenuClick = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleHeaderSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const keyword = headerKeyword.trim();
    if (!keyword) return;
    navigator(`/main/search/searchresult/${encodeURIComponent(keyword)}`);
  };

  return (
    <div css={[s.mainContainer, s.responsiveInfo]}>
      <aside css={s.serviceSidebar} aria-label="주요 메뉴" data-open={mobileNavOpen}>
        <div css={s.serviceBrand}>
          <strong>MOA</strong>
          <span>함께하는 취향 생활</span>
        </div>
        <nav css={s.serviceMenu} aria-label="서비스 탐색">
          <button css={s.serviceItem} onClick={() => { navigator("/main"); setMobileNavOpen(false); }}><IoHomeOutline /> 홈</button>
          <button css={s.serviceItem} onClick={handleClickButton}><IoExtensionPuzzle /> 카테고리</button>
          <p css={s.menuCaption}>내 활동</p>
          <button css={s.serviceItem} onClick={() => navigator("/mypage/participationStatus")}><IoCalendarOutline /> 참여 일정</button>
          <button css={s.serviceItem} onClick={() => navigator("/main")}><IoHeartOutline /> 관심 모임</button>
          <button css={s.serviceItem} onClick={() => navigator("/review/main")}><MdStickyNote2 /> 후기 게시판</button>
        </nav>
      </aside>
      <div css={s.infoNaviBar}>
        <div css={s.naviBox}>
          <button css={s.mobileMenuButton} onClick={() => setMobileNavOpen((open) => !open)} aria-label="서비스 메뉴 열기" aria-expanded={mobileNavOpen}><HiMenu /></button>
          <form css={s.globalSearch} onSubmit={handleHeaderSearch} role="search">
            <button type="submit" aria-label="모임 검색"><IoSearchSharp /></button>
            <input type="search" value={headerKeyword} onChange={(e) => setHeaderKeyword(e.target.value)} placeholder="관심사, 지역, 모임 이름으로 검색" aria-label="통합 모임 검색" />
          </form>
        </div>
        <div css={s.userInfoBox}>
          <button css={s.createGroupButton} onClick={() => navigator("/main/create-group")}>＋ 모임 만들기</button>
          {isAuthenticated ? (
            <button type="button" css={s.userBox} onClick={handleMenuClick} aria-label="사용자 메뉴 열기" aria-expanded={menuOpen}>
              <div css={s.userImgBox}>
                {!profileImage ? (
                  <img src={userImg} alt="userImage" css={s.userImg} />
                ) : (
                  <img
                    src={INFORMATION_IMG + profileImage}
                    alt="profileImage"
                    css={s.userImg}
                  />
                )}
              </div>
              <div css={s.userNameBox}>{nickName}</div>
              <HiMenu css={s.iconSt} />
            </button>
          ) : (
            <button type="button" onClick={() => navigator("/signIn")} css={s.signBtn}>
              로그인 & 회원가입
            </button>
          )}
        </div>
      </div>
      {menuOpen && <HamburgerMenu />}
    </div>
  );
}
