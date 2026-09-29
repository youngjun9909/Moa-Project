/** @jsxImportSource @emotion/react */
import * as s from "../style";
import React from "react";
import { IoGridOutline, IoLocationOutline } from "react-icons/io5";

interface HobbyAndRegionCategoryProps {
  groupCategory: string;
  region: string;
  onCategoryChange: (value: string) => void;
  onRegionChange: (value: string) => void;
}

const HobbyAndRegionCategory = ({
  groupCategory,
  region,
  onCategoryChange,
  onRegionChange,
}: HobbyAndRegionCategoryProps) => {

  const handleHobbyFilterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectCategory = e.currentTarget.value;
    onCategoryChange(groupCategory === selectCategory ? "" : selectCategory);
  };

  const handleRegionFilterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectCategory = e.currentTarget.value;
    onRegionChange(region === selectCategory ? "" : selectCategory);
  };

  const categoryButtonStyle = (button: string) => ({
    backgroundColor:
      groupCategory === button ? "var(--moa-primary)" : "var(--moa-chip-bg)",
    color: groupCategory === button ? "white" : "var(--moa-chip-ink)",
  });

  const regionButtonStyle = (button: string) => ({
    backgroundColor: region === button ? "var(--moa-primary)" : "var(--moa-chip-bg)",
    color: region === button ? "white" : "var(--moa-chip-ink)",
  });

  return (
    <div css={s.mainContainer}>
      <div css={s.categoryBox}>
          <div css={s.categoryHeader}>
            <div>
              <strong>카테고리로 모임 찾기</strong>
              <p>관심 분야와 지역을 선택하면 조건에 맞는 모임을 보여드려요.</p>
            </div>
          </div>
          <div css={s.filterRows}>
          <div css={s.categoryTitle}>
            <p><IoGridOutline /> 카테고리</p>
            <ul css={s.ulStyle}>
              {[
                "취미",
                "문화_예술",
                "스포츠_운동",
                "푸드_맛집",
                "자기계발",
                "여행",
                "연애",
                "힐링",
              ].map((category) => (
                <li key={category}>
                  <button
                    css={s.buttonStyle}
                    style={categoryButtonStyle(category)}
                    onClick={handleHobbyFilterClick}
                    value={category}
                    aria-pressed={groupCategory === category}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div css={s.categoryTitle}>
            <p><IoLocationOutline /> 지역</p>
            <ul css={s.ulStyle}>
              {[
                "서울",
                "인천",
                "대전",
                "광주",
                "세종",
                "울산",
                "부산",
                "대구",
                "경기",
                "충북",
                "충남",
                "강원",
                "전북",
                "전남",
                "경북",
                "경남",
                "제주",
              ].map((location) => (
                <li key={location}>
                  <button
                    css={s.buttonStyle}
                    style={regionButtonStyle(location)}
                    onClick={handleRegionFilterClick}
                    value={location}
                    aria-pressed={region === location}
                  >
                    {location}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          </div>
      </div>
    </div>
  );
};

export default HobbyAndRegionCategory;
