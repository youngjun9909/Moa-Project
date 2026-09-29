import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./style.css";
import axios from "axios";
import { POST_MY_PAGE } from "../../../apis";

function MyPageStart() {
  const navigator = useNavigate();
  const [cookies] = useCookies(["token"]);
  const [formData, setFormData] = useState({ password: "" });
  const [errorMg, setErrorMg] = useState<String>("");
  const [appearMg, setAppearMg] = useState<boolean>(false);

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target;
    setFormData({ ...formData, [element.name]: element.value });
  };

  const fetchData = async () => {
    if (!cookies.token) {
      navigator("/signIn");
    }
    try {
      const response = await axios.post(
        POST_MY_PAGE,
        { password: formData.password },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      const booleanResult = response.data.data;

      if (booleanResult === true) {
        navigator(`/mypage/userInfo/user/${booleanResult}`);
      } else {
        setErrorMg("비밀번호를 다시 입력해주세요");
        setAppearMg(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonGetInfo = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    if ("key" in e && e.key !== "Enter") return;
    if (!formData.password) {
      alert("비밀번호를 입력해주세요.");
      navigator("/mypage/userInfo");
    }
    fetchData();
  };

  const handleButtonDeleteInfo = () => {
    navigator("/mypage/userInfo/MembershipWithdrawal");
  };

  return (
    <div>
        <header className="mypageHeader"><span>MY MOA</span><h1>내 정보</h1><p>계정 정보를 안전하게 확인하고 수정할 수 있어요.</p></header>
      <div className="mypageBox">
            <h2 className="mypagesubTitle">
              비밀번호 인증 후 내 정보 수정이 가능합니다.
            </h2>
        <div className="passowordBox">
              <label className="mypagesubTitle" htmlFor="mypagePassword">비밀번호를 입력해주세요.</label>
              <input
                id="mypagePassword"
            type="password"
            className="passwordCheckInput"
            name="password"
            value={formData.password || ""}
            placeholder="비밀번호를 입력해주세요"
            onChange={handleChangePassword}
            onKeyDown={handleButtonGetInfo}
          />
          <span className="errorMassage">{appearMg ? errorMg : ""}</span>
          <button className="infoUpdateBtn" onClick={handleButtonGetInfo}>
            내 정보 수정
          </button>
        </div>
            <div className="accountDanger"><div><strong>회원 탈퇴</strong><p>탈퇴 전 안내사항과 삭제 범위를 꼭 확인해주세요.</p></div><button className="deleteUserIdBtn" onClick={handleButtonDeleteInfo}>탈퇴 안내 보기</button></div>
      </div>
    </div>
  );
}

export default MyPageStart;
