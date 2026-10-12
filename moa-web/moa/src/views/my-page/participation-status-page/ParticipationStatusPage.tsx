/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as s from "./style";
import { ParticipationStatusDataDto } from "../../../types/dto/response.dto";
import {
  GROUP_GET_PARTICIPATION_STATUS,
  GROUP_MAIN_IMG_API,
  GROUP_PARTICIPATION_STATUS,
} from "../../../apis";
import img from "../../../images/moaLogo.png";
import { MdOutlineTitle } from "react-icons/md";
import { IoExtensionPuzzle } from "react-icons/io5";
import { BsPuzzleFill } from "react-icons/bs";
import { PiPuzzlePieceFill } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { FaSignsPost } from "react-icons/fa6";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AsyncState } from "../../../components/ui/AsyncState";
import { AccountNav } from "../AccountNav";
import { Button } from "../../../components/ui/Button";

export default function ParticipationStatusPage() {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [retry, setRetry] = useState(0);
  const [notice, setNotice] = useState("");
  const [deleting, setDeleting] = useState<number | null>(null);

  const [participationStatusData, setParticipationStatusData] = useState<
    ParticipationStatusDataDto[]
  >([]);

  useEffect(() => {
    let active = true;
    if (!!cookies.token) {
      setStatus("loading");
        axios
          .get(GROUP_PARTICIPATION_STATUS, {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          })
          .then((response) => {
            if (!active) return;
            setParticipationStatusData(response.data.data || []);
            setStatus("success");
          }).catch(() => { if (active) setStatus("error"); });
    } else {
      navigate("/signIn");
    }
    return () => { active = false; };
  }, [cookies.token, navigate, retry]);

  const handleCancellationRequest = async (answerId: number) => {
    if (deleting !== null || !window.confirm("이 신청 내역을 취소하거나 삭제할까요?")) return;
    setDeleting(answerId);
    setNotice("");
    try {
      await axios
        .delete(`${GROUP_GET_PARTICIPATION_STATUS}${answerId}`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          maxRedirects: 0,
        })
        .then(() => {
          setParticipationStatusData((prevData) =>
            prevData.filter((item) => item.answerId !== answerId)
          );
        });
    } catch (error) {
      setNotice("내역을 변경하지 못했어요. 잠시 후 다시 시도해주세요.");
    } finally { setDeleting(null); }
  };

  return (
    <div css={s.fullBox}>
      <div css={s.headerBox}>
        <span>MY ACTIVITY</span>
        <h1>모임 신청 내역</h1>
        <p>내가 신청한 모임의 승인 상태와 일정을 확인하세요.</p>
      </div>

      <AccountNav />
      {notice && <p role="alert">{notice}</p>}
      <AsyncState status={status === "success" && participationStatusData.length === 0 ? "empty" : status}
        empty={{title:"아직 신청한 모임이 없어요",description:"관심 있는 모임을 찾아 새로운 활동을 시작해보세요.",action:<Button onClick={() => navigate('/main')}>모임 둘러보기</Button>}}
        error={{title:"신청 내역을 불러오지 못했어요",description:"연결 상태를 확인한 뒤 다시 시도해주세요.",action:<Button onClick={() => setRetry(value => value + 1)}>다시 시도</Button>}}>
      <div css={s.mainBox}>
        {participationStatusData.map((data) => (
          <div css={s.reviewBox} key={data.answerId}>
            <div css={s.reviewMain}>
              <div css={s.imgBox}>
                <div>
                  {data.groupImage ? (
                    <img
                      src={`${GROUP_MAIN_IMG_API}${data.groupImage}`}
                      alt={`${data.groupTitle} 대표 이미지`}
                    />
                  ) : (
                    <img src={img} alt="MOA 기본 이미지" className="default" />
                  )}
                </div>
              </div>

              <div css={s.contentBox}>
                <div css={s.groupInfoBox}>
                  <div>
                    <MdOutlineTitle color="#0a3140" css={s.iconSt} />{" "}
                    {data.groupTitle}
                  </div>
                  <div>
                    <IoExtensionPuzzle color="#FF7B54" css={s.iconSt} />{" "}
                    {data.groupType}
                  </div>
                  <div>
                    <BsPuzzleFill color="#FCD572" css={s.iconSt} />{" "}
                    {data.meetingType}
                  </div>
                  <div>
                    <PiPuzzlePieceFill color="#7BD04A" css={s.iconSt} />{" "}
                    {data.groupCategory}
                  </div>
                </div>

                <div css={s.answerInfoBox}>
                  <div>
                    {data.isApproved === 2 ? (
                      <button
                        disabled={deleting !== null}
                        onClick={() => handleCancellationRequest(data.answerId)}
                      >
                        신청 취소
                      </button>
                    ) : (
                      <button
                        disabled={deleting !== null}
                        onClick={() => handleCancellationRequest(data.answerId)}
                      >
                        내역 삭제
                      </button>
                    )}
                  </div>
                  <div>
                    <div>
                      <SlCalender color="#7BD04A" css={s.iconSt} />{" "}
                      <p>{new Date(data.answerDate).toLocaleDateString()}</p>{" "}
                    </div>
                    <div>
                      <FaSignsPost color="#FCD572" css={s.iconSt} />
                      {data.isApproved === 0 ? (
                        <p css={s.fontSt(0)}>거절</p>
                      ) : data.isApproved === 1 ? (
                        <p css={s.fontSt(1)}>승인</p>
                      ) : (
                        <p css={s.fontSt(2)}>대기중</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      </AsyncState>
    </div>
  );
}
