import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { User } from "../../../types";
import userImg from "../../../images/userImg.png";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import {
  GET_USER_INFO_IMG_API,
  PUT_USER_INFO_API,
  GET_DUPLICATION_NICK_NAME_API,
  GET_USER_INFO_API,
} from "../../../apis";
import { AccountNav } from "../AccountNav";
import "./style.css";
import userAuthStore from "../../../stores/auth.store";

const GetUserInfo = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userProfileImg, setUserProfileImg] = useState<any>(null);
  const savedUser = useRef<User | null>(null);
  const [initialNickName, setInitialNickName] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const saveLock = useRef(false);
  const latestNickname = useRef("");

  const [duplicatoinNickName, setDuplicationNickName] =
    useState<boolean>(false);
  const [duplicatoinNickNameMs, setDuplicationNickNameMs] =
    useState<string>("");

  useEffect(() => {
    fetchUserInfo();
  }, [navigate]);

  const fetchUserInfo = async () => {
    if (!cookies.token) {
      alert("로그인이 필요합니다.");
      navigate("/signIn");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(GET_USER_INFO_API, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      const updateUser = response.data.data;
      savedUser.current = updateUser;
      setUserInfo(updateUser);
      setUserProfileImg(
        updateUser.profileImage ? `${GET_USER_INFO_IMG_API}${updateUser.profileImage}` : null
      );
      setInitialNickName(response.data.data.nickName);
      latestNickname.current = updateUser.nickName;

      userAuthStore.getState().login({
        userId: updateUser.userId,
        nickName: updateUser.nickName,
        profileImage: updateUser.profileImage,
      });
    } catch (error) {
      console.error(error);
      navigate("/mypage/userInfo");
    } finally {
      setLoading(false);
    }
  };

  const updateUserInfo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (saveLock.current) return;
    const editableFields = ["userName", "nickName", "region", "phoneNumber", "email", "profileImage"] as const;
    const isChanged = userInfo && savedUser.current && editableFields.some(key =>
      (userInfo[key] ?? "") !== (savedUser.current![key] ?? "")
    );
    if (!isChanged) {
      setSaveMessage("수정된 내용이 없습니다.");
      return;
    }

    if (!userInfo) {
      setSaveMessage("수정할 사용자 정보가 없습니다.");
      return;
    }
    if (!duplicatoinNickName && userInfo.nickName !== initialNickName) {
      setSaveMessage("닉네임 중복 확인을 완료해주세요.");
      return;
    }
    if (!window.confirm("변경사항을 저장할까요?")) return;
    saveLock.current = true;
    setSaving(true);
    setSaveMessage("");
    try {
      const formData = new FormData();
      Object.entries(userInfo).forEach(([key, value]) => {
        if (key === "profileImage" && !(value instanceof File)) {
          return;
        }
        formData.append(key, value || ""); 
      });

      const response = await axios.put(PUT_USER_INFO_API, formData, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
        withCredentials: true,
      });
      if (response.data.result === false) throw new Error("Save failed");
      const updated = response.data.data || userInfo;
      setUserInfo(updated);
      setInitialNickName(updated.nickName);
      savedUser.current = updated;
      setSaveMessage("변경사항을 저장했어요.");
      userAuthStore.getState().login({userId:updated.userId,nickName:updated.nickName,profileImage:updated.profileImage instanceof File ? null : updated.profileImage});
    } catch (error) {
      setSaveMessage("정보 수정에 실패했습니다. 다시 시도해주세요.");
    } finally {
      saveLock.current = false;
      setSaving(false);
    }
  };

  const handleDulicationNickName = async () => {
    const requestedNickname = userInfo?.nickName || "";
    if (!/^[가-힣a-zA-Z0-9]{1,10}$/.test(requestedNickname)) {
      setDuplicationNickName(false);
      setDuplicationNickNameMs("닉네임을 한글, 영문, 숫자로 1~10자 입력해주세요.");
      return;
    }
    if (userInfo?.nickName === initialNickName) {
      setDuplicationNickName(true);
      setDuplicationNickNameMs("닉네임이 변경되지 않았습니다.");
      return;
    }

    try {
      const response = await axios.get(
        `${GET_DUPLICATION_NICK_NAME_API}${encodeURIComponent(requestedNickname)}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      if (latestNickname.current !== requestedNickname) return;
      const isDuplicate = response.data.data;
      if (isDuplicate) {
        setDuplicationNickName(false);
        setDuplicationNickNameMs("※ 닉네임이 중복되었습니다.");
      } else {
        setDuplicationNickName(true);
        setDuplicationNickNameMs("✅ 닉네임을 사용할 수 있습니다.");
      }
    } catch (error) {
      if (latestNickname.current !== requestedNickname) return;
      setDuplicationNickName(false);
      setDuplicationNickNameMs("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleImgFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUserInfo((prev) => (prev ? { ...prev, profileImage: file } : null));

      const reader = new FileReader();
      reader.onload = (e) => {
        setUserProfileImg(e.target?.result || null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeInfo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSaveMessage("");
    if (name === "nickName") latestNickname.current = value;

    setUserInfo((prev) => ({ ...prev!, [name]: value }));

    if (name === "nickName" && value !== initialNickName) {
      setDuplicationNickName(false);
      setDuplicationNickNameMs("중복 확인이 필요합니다.");
    }

  };

  return (
    <main className="accountPage">
      <header className="mypageHeader"><span>MY PROFILE</span><h1>프로필 수정</h1><p>모임에서 만나는 사람들에게 나를 소개해보세요.</p></header>
      <AccountNav />
      <section className="userInfoBox">
        {loading ? <p role="status">내 정보를 불러오고 있어요…</p> : userInfo ? <>
          <fieldset className="profileEditor" disabled={saving} style={{border:0,padding:0,margin:0,minWidth:0}}>
            <aside className="profilePhoto">
              <h2>프로필 이미지</h2>
              <img src={userProfileImg || userImg} alt="내 프로필" className="profileAvatar" onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = userImg; }} />
              <label className="profileUpload"><MdOutlineAddPhotoAlternate /> 사진 변경<input aria-label="프로필 사진 변경" type="file" accept="image/*" onChange={handleImgFileChange} /></label>
              <p>나를 잘 표현하는 사진을 올려주세요.<br />JPG, PNG 등 이미지 파일</p>
            </aside>
            <div className="profileFields">
              <div className="profileField"><label>아이디</label><span className="profileReadOnly">{userInfo.userId}</span></div>
              <div className="profileField"><label htmlFor="profile-name">이름</label><input id="profile-name" name="userName" autoComplete="name" value={userInfo.userName || ""} onChange={handleChangeInfo} /></div>
              <div className="profileField full"><label htmlFor="profile-nickname">닉네임</label><div className="profileNickname"><input id="profile-nickname" name="nickName" maxLength={10} value={userInfo.nickName || ""} placeholder="모임에서 사용할 이름" onChange={handleChangeInfo} /><button className="accountSecondary" onClick={handleDulicationNickName}>중복 확인</button></div><span className="profileHelp" aria-live="polite">{duplicatoinNickNameMs || "한글, 영문, 숫자로 1~10자 이내로 입력해주세요."}</span></div>
              <div className="profileField"><label>성별</label><span className="profileReadOnly">{userInfo.userGender || "미입력"}</span></div>
              <div className="profileField"><label htmlFor="profile-region">활동 지역</label><select id="profile-region" name="region" value={userInfo.region || ""} onChange={handleChangeInfo}><option value="" disabled>지역 선택</option>{["서울","인천","대전","광주","세종","울산","부산","대구","경기","충북","충남","강원","전북","전남","경북","경남","제주"].map(region => <option key={region}>{region}</option>)}</select></div>
              <div className="profileField full"><label htmlFor="profile-phone">휴대폰 번호</label><input id="profile-phone" type="tel" autoComplete="tel" name="phoneNumber" value={userInfo.phoneNumber || ""} placeholder="'-' 없이 입력해주세요" onChange={handleChangeInfo} /></div>
              <div className="profileField full"><label htmlFor="profile-email">이메일</label><input id="profile-email" type="email" autoComplete="email" name="email" value={userInfo.email || ""} placeholder="이메일 주소" onChange={handleChangeInfo} /></div>
            </div>
          </fieldset>
          {saveMessage && <p role="status" className="profileHelp">{saveMessage}</p>}
          <footer className="profileActions"><button className="accountSecondary" disabled={saving} onClick={() => navigate("/mypage/userInfo")}>취소</button><button className="accountPrimary" disabled={saving} onClick={updateUserInfo}>{saving ? "저장 중…" : "변경사항 저장"}</button></footer>
        </> : <p role="alert">사용자 정보를 가져올 수 없습니다.</p>}
      </section>
    </main>
  );
};
export default GetUserInfo;
