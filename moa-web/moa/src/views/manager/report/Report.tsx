/** @jsxImportSource @emotion/react */
import * as s from "./style";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { GetReportListResponseDto } from "../../../types/dto/response.dto";

import {
  DeleteReportResponseDto,
  PostReportRequestDto,
} from "../../../types/dto/request.dto";
import { ReportResult } from "../../../types";
import { REPORT_API, REPORT_IMG_API } from "../../../apis";
import defaultImg from "../../../images/moaLo.png";
import { BiChevronDown } from "react-icons/bi";
interface ReportProps {
  parseToNumGroupId: number;
}

const Report: React.FC<ReportProps> = ({ parseToNumGroupId }) => {
  const [reportList, setReportList] = useState<GetReportListResponseDto[]>([]);
  const [cookies] = useCookies(["token"]);
  const [openState, setOpenState] = useState<Record<number, boolean>>({});
  const [previewUrl, setPreviewUrl] = useState<any>(null);

  useEffect(() => {
    if (parseToNumGroupId && cookies.token) {
      fetchReportList();
    }
  }, [parseToNumGroupId, cookies.token]);

  const fetchReportList = async () => {
    if (cookies.token) {
      try {
        const response = await axios.get(`${REPORT_API}${parseToNumGroupId}`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        });
        const responseData = response.data.data;
        setReportList(responseData);

      } catch (error) {
        console.error(error);
      }
    }
  };

  const handlePostReport = async (
    reportUser: string,
    reportResult: ReportResult
  ) => {
    if (cookies.token) {
      try {
        const postReportRequestDto: PostReportRequestDto = {
          reportUser: reportUser,
          reportResult,
        };

        const response = await axios.post(
          `${REPORT_API}${parseToNumGroupId}`,
          postReportRequestDto,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          }
        );
        setReportList((prevList) =>
          prevList.filter((item) => item.reportUser !== reportUser)
        );
      } catch (error) {
        console.error(error);
        setReportList([]);
      }
    }
  };

  const openHiddenBox = (reportId: number) => {
    setOpenState((openState) => ({
      ...openState,
      [reportId]: !openState[reportId],
    }));
  };

  const handleDeleteReport = async (
    userId: string,
    reportResult: ReportResult
  ) => {
    if (cookies.token) {
      try {
        const deleteReportRequestDto: DeleteReportResponseDto = {
          userId: userId,
          reportResult: reportResult,
        };
        const response = await axios.delete(
          `${REPORT_API}${parseToNumGroupId}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            data: deleteReportRequestDto,
            withCredentials: true,
          }
        );

        setReportList((prevList) =>
          prevList.filter((item) => item.userId !== userId)
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>

      <div css={s.headerBox}>
        <h3>신고 접수건: {reportList?.length || 0} </h3>
      </div>


      <ul css={s.ulSt}>
        {reportList.map((data) => (
          <li key={data.reportId}>
            <div css={s.header}>
              <div>
              <p>신고자: {data.userId}</p>
              <p>가해자: {data.reportUser}</p>
              <BiChevronDown css={s.toggleBtn} onClick={() => openHiddenBox(data.reportId)}/>
              </div>
              <div>
                <button
                  onClick={() =>
                    handlePostReport(data.reportUser, "추방" as ReportResult)
                  }
                >
                  추방
                </button>
                <button
                  onClick={() =>
                    handleDeleteReport(data.userId, "유지" as ReportResult)
                  }
                >
                  보류
                </button>
              </div>
            </div>

            <div
              css={s.layerBox}
              style={{
                transition: "opacity 0.3s ease, max-height 0.3s ease",
                opacity: openState[data.reportId] ? 1 : 0,
                maxHeight: openState[data.reportId] ? "500px" : "0",
                overflow: "hidden",
              }}
            >
              <p>신고 유형: {data.reportType}</p>
              <p>신고 내용</p>
              <div css={s.reportDetail}>
                {data.reportDetail}
              </div>
              <div css={s.bottomBox}>
                <img
                  src={data.reportImage ?"http://localhost:8080/image/" + data.reportImage : defaultImg}
                  alt={
                    data.reportImage ? "신고 이미지 미리보기" : "기본 이미지"
                  }
                  onError={(e) => (e.currentTarget.src = "")}
                />
              </div>

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Report;
