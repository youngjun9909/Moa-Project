/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as s from "./style";
import { Notice } from "../../types";
import axios from "axios";
import { format } from "date-fns";
import { NOTICE_API } from "../../apis";
import { AsyncState } from "../../components/ui/AsyncState";
import { Button } from "../../components/ui/Button";

export default function NoticePage() {
  const [noticeData, setNoticeData] = useState<Notice[]>([]);
  const [status, setStatus] = useState<"loading" | "success" | "empty" | "error">("loading");

  const loadNotices = async () => {
    setStatus("loading");
    try {
      const response = await axios.get(NOTICE_API);
      const data = response.data.data || [];
      setNoticeData(data);
      setStatus(data.length ? "success" : "empty");
    } catch (error) {
      setStatus("error");
    }
  };
  useEffect(() => { loadNotices(); }, []);

  return (
    <div css={s.fullBox}>
      <div css={s.headerBox}>
        <span>MOA NEWS</span>
        <h1>공지사항</h1>
        <p>서비스의 새로운 소식과 중요한 안내를 확인하세요.</p>
      </div>

      <div css={s.mainBox}>
        <AsyncState status={status} empty={{title:"등록된 공지사항이 없어요", description:"새로운 소식이 등록되면 이곳에서 알려드릴게요."}} error={{title:"공지사항을 불러오지 못했어요", description:"연결을 확인한 뒤 다시 시도해주세요.", action:<Button onClick={loadNotices}>다시 시도</Button>}}>
        {noticeData.map((notice) => (
          <div css={s.noticeBox} key={notice.noticeId}>
            <div>
              <h2>{notice.noticeTitle}</h2>
            </div>
            <div>
              <p>{notice.noticeContent}</p>
            </div>
            <time dateTime={String(notice.noticeDate)}>{format(notice.noticeDate, "yyyy.MM.dd")}</time>
          </div>
        ))}
        </AsyncState>
      </div>
    </div>
  );
}
