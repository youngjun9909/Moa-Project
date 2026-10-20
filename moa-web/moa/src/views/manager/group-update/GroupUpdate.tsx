/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import groupImage from "../../../images/group.jpg";
import { GROUP_UPDATE_API, MANGE_HOME_IMG_API } from "../../../apis";
import { Button, DangerZone } from "../../../components/ui";

const POSTCODE_SCRIPT_ID = "kakao-postcode-script";
const POSTCODE_SCRIPT_SRC = "https://t1.kakaocdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
const CATEGORIES = ["취미", "문화_예술", "스포츠_운동", "푸드_맛집", "자기계발", "힐링", "연애", "여행"];

interface GroupUpdateProps {
  parseToNumGroupId: number;
}

const GroupUpdate: React.FC<GroupUpdateProps> = ({ parseToNumGroupId }) => {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const [groupImg, setGroupImg] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const saveLock = useRef(false);
  const [previewUrl, setPreviewUrl] = useState<any>(null);
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
    groupImg: null,
  });

  useEffect(() => {
    fetchGroupData();
  }, [parseToNumGroupId, cookies.token]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

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
        const selected = data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;
        setFormData((prev) => ({ ...prev, groupAddress: selected }));
      },
    }).open();
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }

      setGroupImg(file);
      const previewUrl = URL.createObjectURL(file);
      setPreviewUrl(previewUrl);
    }
  };

  const fetchGroupData = async () => {
    const url = `${GROUP_UPDATE_API}${parseToNumGroupId}`;

    if (!cookies.token) {
      console.error("토큰이 없습니다. 데이터를 가져올 수 없습니다.");
      return;
    }

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
        withCredentials: true,
      });

      const data = response.data.data;

      if (!data) {
        console.error("응답 데이터가 없습니다.");
        return;
      }

      setFormData({
        groupType: data.groupType || "",
        groupCategory: data.groupCategory || "",
        groupDate: data.groupDate || "",
        meetingType: data.meetingType || "",
        groupAddress: data.groupAddress || "",
        groupTitle: data.groupTitle || "",
        groupContent: data.groupContent || "",
        groupSupplies: data.groupSupplies || "",
        groupQuestion: data.groupQuestion || "",
        groupImg: data.groupImage || "",
      });

      if (data.groupImage) {
        const imageUrl = `${MANGE_HOME_IMG_API}${data.groupImage}`;
        setPreviewUrl(imageUrl);
      } else {
        setPreviewUrl(groupImage);
      }
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
      alert("데이터를 가져오는 데 실패했습니다. 나중에 다시 시도하세요.");
    }
  };

  const handleUpdateGroup = async () => {
    if (saveLock.current) return;
    saveLock.current = true;
    setSaving(true);
    const putGroupRequestDto = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        putGroupRequestDto.append(key, value as string);
      }
    });

    if (groupImg) {
      putGroupRequestDto.append("groupImage", groupImg);
    }

    const url = `${GROUP_UPDATE_API}${parseToNumGroupId}`;
    if (cookies.token) {
      try {
        const response = await axios.put(url, putGroupRequestDto, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          alert("수정이 완료되었습니다.");

          const updatedGroupData = response.data.data;

          if (updatedGroupData.groupImage) {
            setPreviewUrl(updatedGroupData.groupImage);
          }
          setFormData({
            groupType: updatedGroupData.groupType || "",
            groupCategory: updatedGroupData.groupCategory || "",
            groupDate: updatedGroupData.groupDate || "",
            meetingType: updatedGroupData.meetingType || "",
            groupAddress: updatedGroupData.groupAddress || "",
            groupTitle: updatedGroupData.groupTitle || "",
            groupContent: updatedGroupData.groupContent || "",
            groupSupplies: updatedGroupData.groupSupplies || "",
            groupQuestion: updatedGroupData.groupQuestion || "",
            groupImg: updatedGroupData.groupImage || "",
          });

          if (updatedGroupData.groupImage) {
            setPreviewUrl(
              `${MANGE_HOME_IMG_API}${updatedGroupData.groupImage}`
            );
          } else {
            setPreviewUrl(null);
          }
        }
      } catch (error) {
        console.error(error);
        alert("수정에 실패했습니다. 다시 시도해주세요.");
      } finally {
        saveLock.current = false;
        setSaving(false);
      }
    } else {
      saveLock.current = false;
      setSaving(false);
    }
  };

  const handleDeleteGroup = async () => {
    if (!window.confirm("모임을 삭제하면 되돌릴 수 없어요. 정말 삭제할까요?")) return;
    const url = `${GROUP_UPDATE_API}${parseToNumGroupId}`;
    if (cookies.token) {
      try {
        await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        });
        alert("모임 삭제가 되었습니다");
        navigate(`/main`);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const isOffline = formData.meetingType === "오프라인";

  return (
    <div css={s.totalContainer}>
      <div css={s.intro}>
        <h2>모임 정보 수정</h2>
        <p>멤버에게 보이는 모임 정보를 최신 상태로 관리하세요.</p>
      </div>

      <section css={s.formSection} aria-labelledby="update-basic-title">
        <h2 id="update-basic-title">기본 정보</h2>
        <p css={s.sectionDescription}>모임을 소개하는 제목과 설명이에요.</p>
        <div css={s.fieldGroup}>
          <label htmlFor="update-title">제목</label>
          <input id="update-title" type="text" css={s.input} placeholder="모임 제목" value={formData.groupTitle} onChange={(e) => handleInputChange("groupTitle", e.target.value)} />
        </div>
        <div css={s.fieldGroup}>
          <label htmlFor="update-content">내용</label>
          <textarea id="update-content" css={s.textarea} placeholder="모임 소개" value={formData.groupContent} onChange={(e) => handleInputChange("groupContent", e.target.value)} />
        </div>
        <div css={s.twoColumnFields}>
          <div css={s.fieldGroup}>
            <label htmlFor="update-supplies">준비물</label>
            <input id="update-supplies" type="text" css={s.input} placeholder="모임에 필요한 준비물" value={formData.groupSupplies} onChange={(e) => handleInputChange("groupSupplies", e.target.value)} />
          </div>
          <div css={s.fieldGroup}>
            <label htmlFor="update-question">가입 질문</label>
            <input id="update-question" type="text" css={s.input} placeholder="가입 신청자에게 물어볼 질문" value={formData.groupQuestion} onChange={(e) => handleInputChange("groupQuestion", e.target.value)} />
          </div>
        </div>
      </section>

      <section css={s.formSection} aria-labelledby="update-kind-title">
        <h2 id="update-kind-title">모임 분류</h2>
        <p css={s.sectionDescription}>운영 방식과 관심 주제를 선택해주세요.</p>
        <div css={s.fieldGroup}>
          <h4>모임 유형</h4>
          <div css={s.AllBox}>
            {["단기모임", "정기모임"].map((type) => (
              <button type="button" key={type} aria-pressed={formData.groupType === type} css={formData.groupType === type ? s.activeTab : s.Tab} onClick={() => handleInputChange("groupType", type)}>
                {type === "단기모임" ? "단기 모임" : "정기 모임"}
              </button>
            ))}
          </div>
        </div>
        <div css={s.fieldGroup}>
          <h4>모임 카테고리</h4>
          <div css={s.AllBox}>
            {CATEGORIES.map((category) => (
              <button type="button" key={category} aria-pressed={formData.groupCategory === category} css={formData.groupCategory === category ? s.activeTab : s.Tab} onClick={() => handleInputChange("groupCategory", category)}>
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section css={s.formSection} aria-labelledby="update-place-title">
        <h2 id="update-place-title">일정과 장소</h2>
        <p css={s.sectionDescription}>진행 방식을 고르고 날짜와 만날 장소(또는 접속 링크)를 알려주세요.</p>
        <div css={s.fieldGroup}>
          <label htmlFor="update-date">모임 날짜</label>
          <input id="update-date" type="date" css={s.dateInput} value={formData.groupDate || ""} onChange={(e) => handleInputChange("groupDate", e.target.value)} />
        </div>
        <div css={s.fieldGroup}>
          <h4>진행 방식</h4>
          <div css={s.AllBox}>
            {["온라인", "오프라인"].map((type) => (
              <button type="button" key={type} aria-pressed={formData.meetingType === type} css={formData.meetingType === type ? s.activeTab : s.Tab} onClick={() => handleInputChange("meetingType", type)}>
                {type}
              </button>
            ))}
          </div>
        </div>
        <div css={s.fieldGroup}>
          <label htmlFor="update-address">모임 주소</label>
          <div css={s.addressInputRow}>
            <input
              id="update-address"
              type="text"
              css={s.input}
              placeholder={isOffline ? "주소 찾기로 주소를 선택해주세요" : "온라인 접속 링크를 입력해주세요"}
              value={formData.groupAddress}
              onChange={(e) => handleInputChange("groupAddress", e.target.value)}
            />
            {isOffline && <button type="button" css={s.addressSearchButton} onClick={handleAddressSearch}>주소 찾기</button>}
          </div>
        </div>
      </section>

      <section css={s.formSection} aria-labelledby="update-image-title">
        <h2 id="update-image-title">대표 이미지</h2>
        <p css={s.sectionDescription}>모임의 분위기가 잘 드러나는 가로 이미지를 추천해요.</p>
        <div css={s.imageUpload}>
          <img src={previewUrl || groupImage} alt="대표 이미지 미리보기" css={s.previewImage} />
          <div css={s.uploadAction}>
            <label css={s.fileButton} htmlFor="groupImg">대표 이미지 선택</label>
            <span>{groupImg ? groupImg.name : "JPG, PNG 등의 이미지 파일"}</span>
            <input css={s.hiddenFileInput} type="file" id="groupImg" accept="image/*" onChange={handleFileChange} />
          </div>
        </div>
      </section>

      <div css={s.actionBar}>
        <Button onClick={handleUpdateGroup} disabled={saving}>{saving ? "저장 중…" : "변경 사항 저장"}</Button>
      </div>

      <DangerZone
        title="모임 삭제"
        description="모임과 관련된 정보가 모두 삭제되며 되돌릴 수 없어요."
        actions={<Button variant="destructive" onClick={handleDeleteGroup}>모임 삭제</Button>}
      />
    </div>
  );
};

export default GroupUpdate;
