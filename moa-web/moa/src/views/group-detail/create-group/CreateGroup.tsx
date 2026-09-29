/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { CREATE_GROUP_API } from "../../../apis";
import groupImage from "../../../images/group.jpg";

declare global {
  interface Window {
    kakao?: {
      Postcode: new (options: { oncomplete: (data: { userSelectedType: string; roadAddress: string; jibunAddress: string }) => void }) => { open: () => void };
    };
  }
}

const POSTCODE_SCRIPT_ID = "kakao-postcode-script";
const POSTCODE_SCRIPT_SRC = "https://t1.kakaocdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

export default function CreateGroup() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token", "userId"]);
  const [groupImg, setGroupImg] = useState<any>(null);
  const [previewUrl, setPreviewUrl] = useState<any>(null);
  const [detailAddress, setDetailAddress] = useState("");
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    groupType: "",
    groupCategory: "",
    groupDate: "",
    meetingType: "",
    groupAddress: "",
    groupTitle: "",
    groupContent: "",
    groupSupplies: "",
    groupQuestion: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: value ? "" : `${field} 값을 입력해주세요.`,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }
      setGroupImg(file);
    } else {
      setGroupImg(null);
    }
  };

  useEffect(() => {
    if (groupImg) {
      const objectUrl = URL.createObjectURL(groupImg);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
    setPreviewUrl(null);
  }, [groupImg]);

  useEffect(() => {
    if (window.kakao?.Postcode || document.getElementById(POSTCODE_SCRIPT_ID)) return;
    const script = document.createElement("script");
    script.id = POSTCODE_SCRIPT_ID;
    script.src = POSTCODE_SCRIPT_SRC;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const handleAddressSearch = () => {
    if (!window.kakao?.Postcode) {
      alert("주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }
    new window.kakao.Postcode({
      oncomplete: (data) => {
        const selectedAddress = data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;
        handleInputChange("groupAddress", selectedAddress);
        requestAnimationFrame(() => document.getElementById("group-detail-address")?.focus());
      },
    }).open();
  };

  const handleNextPage = () => {
    if (!formData.groupType) {
      alert("모임 유형을 선택해주세요.");
      return;
    }
    if (!formData.groupDate) {
      alert("모임 날짜를 입력해주세요.");
      return;
    }
    if (!formData.meetingType) {
      alert("모임 장소를 선택해주세요.");
      return;
    }
    if (!formData.groupAddress) {
      alert("모임 주소를 입력해주세요.");
      return;
    }

    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => setPage((prev) => prev - 1);

  const handlePostGroup = async () => {
    const postGroupRequestDto = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof typeof formData];
      postGroupRequestDto.append(key, key === "groupAddress" && formData.meetingType === "오프라인" ? `${value} ${detailAddress}`.trim() : value);
    });

    if (groupImg) {
      postGroupRequestDto.append("groupImage", groupImg);
    }
    try {
      const response = await axios.post(CREATE_GROUP_API, postGroupRequestDto, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        alert("모임이 성공적으로 등록되었습니다!");
        navigate("/main");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      alert("모임 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div css={s.createPage}>
      <header css={s.createHeader}>
        <div>
          <span>CREATE A MEETING</span>
          <h1>새로운 모임 만들기</h1>
          <p>모임의 기본 정보부터 소개까지 두 단계로 완성해보세요.</p>
        </div>
        <ol css={s.stepIndicator} aria-label="모임 생성 단계">
          <li data-active={page === 0}>1 <span>기본 정보</span></li>
          <li data-active={page === 1}>2 <span>소개 작성</span></li>
        </ol>
      </header>
      {page === 0 && (
        <div css={s.CreatorBox}>
          <section css={s.formSection} role="group" aria-labelledby="meeting-kind-title">
            <h2 id="meeting-kind-title">어떤 모임인가요?</h2>
            <p css={s.sectionDescription}>운영 방식과 관심 주제를 선택해주세요.</p>
            <div css={s.fieldGroup}>
              <h4>모임 유형</h4>
              <div css={s.AllBox}>
                <button type="button" css={formData.groupType === "단기모임" ? s.activeTab : s.Tab} onClick={() => handleInputChange("groupType", "단기모임")}>단기 모임</button>
                <button type="button" css={formData.groupType === "정기모임" ? s.activeTab : s.Tab} onClick={() => handleInputChange("groupType", "정기모임")}>정기 모임</button>
              </div>
            </div>
            <div css={s.fieldGroup}>
              <h4>모임 카테고리</h4>
              <div css={s.AllBox}>
                {["취미", "문화_예술", "스포츠_운동", "푸드_맛집", "자기계발", "힐링", "연애", "여행"].map((category) => (
                  <button type="button" key={category} css={formData.groupCategory === category ? s.activeTab : s.Tab} onClick={() => handleInputChange("groupCategory", category)}>{category}</button>
                ))}
              </div>
            </div>
          </section>

          <section css={s.formSection} role="group" aria-labelledby="meeting-date-title">
            <h2 id="meeting-date-title">언제 만나나요?</h2>
            <p css={s.sectionDescription}>참여자가 일정을 한눈에 확인할 수 있어요.</p>
            <div css={s.fieldGroup}>
              <label htmlFor="group-date">모임 날짜</label>
              <input id="group-date" type="date" css={s.DateBox} value={formData.groupDate} onChange={(e) => handleInputChange("groupDate", e.target.value)} />
            </div>
          </section>

          <section css={s.formSection} role="group" aria-labelledby="meeting-place-title">
            <h2 id="meeting-place-title">어디서 만나나요?</h2>
            <p css={s.sectionDescription}>진행 방식을 고르고 접속 링크나 만날 장소를 알려주세요.</p>
            <div css={s.placeGrid}>
              <div css={s.fieldGroup}>
                <h4>진행 방식</h4>
                <div css={s.AllBox}>
                  <button type="button" css={formData.meetingType === "온라인" ? s.activeTab : s.Tab} onClick={() => handleInputChange("meetingType", "온라인")}>온라인</button>
                  <button type="button" css={formData.meetingType === "오프라인" ? s.activeTab : s.Tab} onClick={() => handleInputChange("meetingType", "오프라인")}>오프라인</button>
                </div>
              </div>
              <div css={s.fieldGroup}>
                <label htmlFor="group-address">모임 주소</label>
                <div css={s.addressInputRow}>
                  <input
                    id="group-address"
                    type="text"
                    css={s.TitleInput}
                    data-address-search={formData.meetingType === "오프라인"}
                    aria-haspopup={formData.meetingType === "오프라인" ? "dialog" : undefined}
                    placeholder={formData.meetingType === "온라인" ? "온라인 접속 링크를 입력해주세요" : "주소 찾기로 기본 주소를 선택해주세요"}
                    value={formData.groupAddress}
                    onClick={formData.meetingType === "오프라인" ? handleAddressSearch : undefined}
                    onChange={(e) => handleInputChange("groupAddress", e.target.value)}
                  />
                  {formData.meetingType === "오프라인" && <button type="button" css={s.addressSearchButton} onClick={handleAddressSearch}>주소 찾기</button>}
                </div>
                {formData.meetingType === "오프라인" && (
                  <input id="group-detail-address" aria-label="상세 주소" type="text" css={s.detailAddressInput} placeholder="건물명, 층, 호수 등 상세 주소" value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} />
                )}
              </div>
            </div>
          </section>

          <div css={s.BottomButtonContainer}>
            <button type="button" css={s.MoveButton} onClick={handleNextPage}>
              다음
            </button>
          </div>
        </div>
      )}

      {page === 1 && (
        <div css={s.CreatorBox}>
          <section css={s.formSection} role="group" aria-labelledby="meeting-intro-title">
            <h2 id="meeting-intro-title">모임을 소개해주세요</h2>
            <p css={s.sectionDescription}>누구나 모임의 분위기와 활동을 쉽게 이해할 수 있도록 작성해주세요.</p>
          <div css={s.fieldGroup}>
            <label htmlFor="group-title">모임 제목</label>
            <input
              id="group-title"
              type="text"
              css={s.TitleInput}
              placeholder="모임 제목"
              value={formData.groupTitle}
              onChange={(e) => handleInputChange("groupTitle", e.target.value)}
            />
          </div>
          <div css={s.fieldGroup}>
            <label htmlFor="group-content">모임 소개</label>
            <textarea
              id="group-content"
              css={s.ContentBox}
              placeholder="모임에 대한 소개말"
              value={formData.groupContent}
              onChange={(e) =>
                handleInputChange("groupContent", e.target.value)
              }
            />
          </div>
          <div css={s.twoColumnFields}>
          <div css={s.fieldGroup}>
            <label htmlFor="group-supplies">준비물</label>
            <input
              id="group-supplies"
              type="text"
              css={s.TitleInput}
              placeholder="모임 필요한 준비물"
              value={formData.groupSupplies}
              onChange={(e) =>
                handleInputChange("groupSupplies", e.target.value)
              }
            />
          </div>
          <div css={s.fieldGroup}>
            <label htmlFor="group-question">가입 질문</label>
            <input
              id="group-question"
              type="text"
              css={s.TitleInput}
              placeholder="설정하고 싶은 모입 가입 질문"
              value={formData.groupQuestion}
              onChange={(e) =>
                handleInputChange("groupQuestion", e.target.value)
              }
            />
          </div>
          </div>
          </section>

          <section css={s.formSection} role="group" aria-labelledby="meeting-image-title">
            <h2 id="meeting-image-title">대표 이미지를 골라주세요</h2>
            <p css={s.sectionDescription}>모임의 분위기가 잘 드러나는 가로 이미지를 추천해요.</p>
          <div css={s.imageUpload}>
            <img
              src={previewUrl || groupImage}
              alt="미리보기"
              css={s.previewImage}
            />
          <div css={s.uploadAction}>
            <label css={s.fileButton} htmlFor="groupImg">대표 이미지 선택</label>
            <span>{groupImg ? groupImg.name : "JPG, PNG 등의 이미지 파일"}</span>
            <input css={s.hiddenFileInput} type="file" id="groupImg" accept="image/*" onChange={handleFileChange} />
          </div>
          </div>
          </section>

          <div css={s.BottomButtonContainer}>
            <button type="button" css={s.secondaryButton} onClick={handlePrevPage}>
              이전
            </button>
            <button type="button" css={s.MoveButton} onClick={handlePostGroup}>
              완료
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
