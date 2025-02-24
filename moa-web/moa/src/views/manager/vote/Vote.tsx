/** @jsxImportSource @emotion/react */
import * as s from "./style";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import {
  GetVoteAnswerChartResponseDto,
  GetVoteResponseDto,
} from "../../../types/dto/response.dto";
import { ReportBox } from "./style";
import {
  PostVoteRequestDto,
  PutVoteRequestDto,
} from "../../../types/dto/request.dto";
import VoteAnswerChartComponent from "./VoteAnswerChartComponent";
import { GenderChartBox } from "../chart/style";
import ReactModal from "react-modal";
import {
  closeModalButton,
  modalContent,
  openModalButton,
} from "../manager-home/style";
import { VOTE_API, VOTE_API_POST, VOTE_RESULT_GET } from "../../../apis";

interface VoteProps {
  parseToNumGroupId: number;
}

const Vote: React.FC<VoteProps> = ({ parseToNumGroupId }) => {
  const [vote, setVote] = useState<GetVoteResponseDto | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { groupId } = useParams();
  const [cookies] = useCookies(["token", "userId"]);
  const [voteContent, setVoteContent] = useState<string>("");
  const [createDate, setCreateDate] = useState<string>("");
  const [closeDate, setCloseDate] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [voteAnswerChart, setVoteAnswerChart] = useState<
    GetVoteAnswerChartResponseDto[]
  >([]);

  useEffect(() => {
    fetchVote();

    if (vote && vote.voteId) {
      fetchVoteAnswerChart(vote.voteId);
    }
  }, [groupId, cookies.token, vote?.voteId]);

  const handleEditClick = (vote: GetVoteResponseDto) => {
    setIsEditing(true);
    setVoteContent(vote.voteContent);
    setCreateDate(new Date(vote.createDate).toISOString().slice(0, 10));
    setCloseDate(new Date(vote.closeDate).toISOString().slice(0, 10));
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const fetchVote = async () => {
    if (cookies.token) {
      try {
        const response = await axios.get(`${VOTE_API}${parseToNumGroupId}`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        });
        const responseData = response.data.data;
        setVote(responseData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handlePostVote = async (
    groupId: number,
    creatorId: string,
    voteContent: string,
    createDate: string,
    closeDate: string
  ) => {
    const postVoteRequestDto: PostVoteRequestDto = {
      groupId: groupId,
      creatorId: creatorId,
      voteContent: voteContent,
      createDate: new Date(createDate),
      closeDate: new Date(closeDate),
    };
    const url = `${VOTE_API_POST}`;

    if (cookies.token) {
      try {
        const response = await axios.post(url, postVoteRequestDto, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        });
        const responseData = response.data.data;
        setVote(responseData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleUpdateVote = async (
    voteId: number,
    voteContent: string,
    createDate: string,
    closeDate: string
  ) => {
    const putVoteRequestDto: PutVoteRequestDto = {
      voteContent: voteContent,
      createDate: new Date(createDate),
      closeDate: new Date(closeDate),
    };
    const url = `${VOTE_API}${voteId}`;
    if (cookies.token) {
      try {
        const response = await axios.put(url, putVoteRequestDto, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        });
        const responseData = response.data.data;
        setVote(responseData);
        setIsEditing(false);
        fetchVote();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeleteVote = async (voteId: number) => {
    if (cookies.token) {
      try {
        const response = await axios.delete(`${VOTE_API}${voteId}`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          data: voteId,
          withCredentials: true,
        });
        const responseData = response.data.data;
        setVote(responseData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchVoteAnswerChart = async (voteId: number) => {
    if (cookies.token) {
      try {
        const response = await axios.get(`${VOTE_RESULT_GET}${voteId}`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        });
        const responseData = response.data.data;
        setVoteAnswerChart(responseData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div css={s.fullBox}>

      <div css={s.GenderChartBox}>
          <h1>투표결과 차트</h1>
          <VoteAnswerChartComponent data={voteAnswerChart} />
          <div css={ReportBox}>
            {voteAnswerChart.length > 0 ? (
              <>
                {voteAnswerChart[0] && (
                  <div>
                    <p>응답: {voteAnswerChart[0].voteAnswer}</p>
                    <p>투표 수: {voteAnswerChart[0].count}</p>
                    <p>비율: {Number(voteAnswerChart[0].ratio.toFixed(2))}%</p>
                  </div>
                )}
                {voteAnswerChart[1] && (
                  <div>
                    <p>응답: {voteAnswerChart[1].voteAnswer}</p>
                    <p>투표 수: {voteAnswerChart[1].count}</p>
                    <p>비율: {Number(voteAnswerChart[1].ratio.toFixed(2))}%</p>
                  </div>
                )}
                {!voteAnswerChart[0] && !voteAnswerChart[1] && (
                  <p>투표 결과가 없습니다.</p>
                )}
              </>
            ) : (
              <p>투표 데이터가 없습니다.</p>
            )}
          </div>
        </div>

      <div css={s.voteBox}>
        <div>
        <button onClick={openModal} css={openModalButton}>
          투표 생성
        </button>
        </div>

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="modalOverlay"
        css={modalContent}
      >
        <div css={s.modalBox}>
          <h2>투표</h2>
          
          <div css={s.voteContent}>
              투표 내용
              <input
                type="text"
                value={voteContent}
                onChange={(e) => setVoteContent(e.target.value)}
              />
          </div>

            <div css={s.voteContent}>
              생성 날짜
              <input
                type="date"
                css={s.DateBox}
                value={createDate}
                onChange={(e) => setCreateDate(e.target.value)}
              />
            </div>

            <div css={s.voteContent}>
              마감 날짜
              <input
                type="date"
                css={s.DateBox}
                value={closeDate}
                onChange={(e) => setCloseDate(e.target.value)}
              />
            </div>

        <div css={s.createBtnBox}>
          <button
            onClick={() => {
              const creatorId = vote ? vote.creatorId : cookies.userId;
              handlePostVote(
                parseToNumGroupId,
                creatorId,
                voteContent,
                createDate,
                closeDate
              );
            }}
            css={closeModalButton}
            >
            등록
          </button>
          <button onClick={closeModal} css={closeModalButton}>
            닫기
          </button>
        </div>
      </div>
        
        
      </ReactModal>
      {isEditing ? (
        <div>
        </div>
      ) : (
        <ul>
          {vote ? (
            <li key={vote.voteId} css={s.voteSt}>
              <p>
                <strong>투표 내용:</strong> {vote.voteContent}
              </p>
              <p>
                <strong>생성 날짜:</strong>{" "}
                {new Date(vote.createDate).toLocaleDateString()}
              </p>
              <p>
              <strong>마감 날짜:</strong>{" "}
              {new Date(vote.closeDate).toLocaleDateString()}
              </p>

              <div css={s.btnBox}>
                <button
                  
                  onClick={() => handleDeleteVote(vote.voteId)}
                >
                  삭제
                </button>
              </div>
            </li>
          ) : (
            <li>투표 데이터를 불러오는 중이거나 데이터가 없습니다.</li>
          )}
        </ul>
      )}
      </div>
      </div>
  );
};
export default Vote;
