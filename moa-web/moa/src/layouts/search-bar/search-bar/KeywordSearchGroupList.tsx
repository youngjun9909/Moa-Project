/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import * as s from "../resultStyle";
import  usePaginationScrollSearchHook from "../../../components/pagination-scroll/usePaginationScrollSearchHook";
import { useParams } from "react-router-dom";
import PaginationScroll from "../../../components/pagination-scroll/PaginationScroll";
import { KEYWORD_LIST_API } from "../../../apis";

function KeywordSearchGroupList() {
  const { keyword } = useParams<{ keyword: string }>();
  const searchKeyword = keyword || "";
  const { data, loading, resetAndFetchData } = usePaginationScrollSearchHook({
    apiUrl: KEYWORD_LIST_API,
    limit: 10,
    extraParams: { keyword: searchKeyword },
  });

  const [btnStatus, setBtnStatus] = useState<string>("default");

  const handleSortChange = (sortBy: string) => {
    setBtnStatus(sortBy);
    resetAndFetchData(sortBy);
  };

  const btnStyle = (button: string) => ({
    color: btnStatus === button ? "#FF7B54" : "black",
  });

  const buttons = [
    { label: "기본순", sortBy: "default" },
    { label: "최신순", sortBy: "recent" },
    { label: "과거순", sortBy: "past" },
    { label: "추천순", sortBy: "recommendation" },
  ];

  return (
    <div css={s.container}>
      <h3>" {keyword} " 검색결과 입니다.</h3>
      <div css={s.buttonDiv}>
        {buttons.map((button, index) => (
          <div key={index}>
            <button
              style={btnStyle(button.sortBy)}
              value={button.sortBy}
              onClick={() => handleSortChange(button.sortBy)}
            >
              {button.label}
            </button>
            {index < buttons.length - 1 && <span>|</span>}
          </div>
        ))}
      </div>
      <div css={s.resultLine}></div>
      <div>
        {loading ? <p>로딩 중...</p> : <PaginationScroll datas={data} />}
      </div>
    </div>
  );
}

export default KeywordSearchGroupList;
