/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as s from "./style";
import { Notice } from "../../types";
import axios from "axios";
import { format } from "date-fns";
import { NOTICE_API } from "../../apis";
import { EmptyState } from "../../components/ui/EmptyState";

export default function NoticePage() {
  const [noticeData, setNoticeData] = useState<Notice[]>([]);

  useEffect(() => {
    try {
      axios.get(NOTICE_API, {}).then((response) => {
        setNoticeData(response.data.data);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div css={s.fullBox}>
      <div css={s.headerBox}>
        <span>MOA NEWS</span>
        <h1>공지사항</h1>
        <p>서비스의 새로운 소식과 중요한 안내를 확인하세요.</p>
      </div>

      <div css={s.mainBox}>
        {noticeData.length === 0 && <EmptyState title="등록된 공지사항이 없어요" description="새로운 소식이 등록되면 이곳에서 알려드릴게요." />}
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
      </div>
    </div>
  );
}
