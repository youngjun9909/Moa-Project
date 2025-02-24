/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect, useState } from "react";
import axios from "axios";
import userImg from "../../../images/userImg.png";
import { useCookies } from "react-cookie";
import { BlackListPageResponseDto } from "../../../types/dto/response.dto";
import ReactModal from "react-modal";
import { closeModalButton, modalContent } from "../manager-home/style";
import { BLACK_LIST_API } from "../../../apis";

interface BlackListProps {
  parseToNumGroupId: number;
}

const BlackList: React.FC<BlackListProps> = ({ parseToNumGroupId }) => {
  const [blackUserList, setBlackUserList] = useState<
    BlackListPageResponseDto[]
  >([]);
  const [cookies] = useCookies(["token"]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputUserId, setInputUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchBlackList();
  }, [parseToNumGroupId, cookies.token]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setInputUserId("");
  };

  const fetchBlackList = async () => {
    if (cookies.token) {
      try {
        const response = await axios.get(
          `${BLACK_LIST_API}${parseToNumGroupId}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },

            withCredentials: true,
          }
        );
        const responseData = response.data.data;
        setBlackUserList(responseData);
  
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handlePostBlackList = async () => {
    if (!inputUserId.trim()) {
      alert("사용자 ID를 입력해주세요.");
      return;
    }
    setIsLoading(true);
    const url = `${BLACK_LIST_API}${parseToNumGroupId}`;

    if (cookies.token) {
      try {
        await axios.post(
          url,
          { userId: inputUserId },
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          }
        );

          fetchBlackList();
          alert("등록되었습니다.");
          closeModal();
      } catch (error) {
        console.error(error);
        alert("블랙리스트 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteBlackList = async (groupId: number, userId: string) => {
    const url = `http://localhost:8080/api/v1/black-list?groupId=${groupId}&userId=${userId}`;

    if (cookies.token) {
      try {
        const response = await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          alert("삭제되었습니다.");
          fetchBlackList();
        } else {
          throw new Error("삭제 요청이 실패했습니다.");
        }
      } catch (error) {
        console.error(error);
        alert("블랙리스트 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div css={s.fullBox}>
      <div css={s.headerBox}>
        <div>총 인원수 : {blackUserList.length}</div>
        <button css={s.button} onClick={openModal}>
          블랙리스트 추가
        </button>
      </div>
      
      <ul>
        {blackUserList.map((data) => (
          <li key={data.blackListId} css={s.list}>
            <div>
              <div css={s.userImgBox}>
                {!data.profileImage ? (
                  <img src={userImg} alt="userImage" css={s.userImg} />
                ) : (
                  <img
                    src={"http://localhost:8080/image/" + data.profileImage}
                    alt="profileImage"
                    css={s.userImg}
                  />
                )}
              </div>
            </div>
              <div>
            
            <strong>닉네임: {data.nickName}</strong>
              </div>
                <div>
            <button
              css={s.button}
              onClick={() => {
                handleDeleteBlackList(parseToNumGroupId, data.userId);
              }}
            >
              해제
            </button>
                </div>
          </li>
        ))}
      </ul>


      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="modalOverlay"
        css={s.modalContent}
      >
        <div css={s.modalInner}>
          <div>
            <h2>블랙 리스트 등록</h2>
          </div>
          <div>
          <p>사용자 ID</p>
          <input
            type="text"
            name="userId"
            value={inputUserId}
            onChange={(e) => setInputUserId(e.target.value)}
          />
          </div>
          <div>
          <button onClick={() => handlePostBlackList()} css={closeModalButton}>
          등록
        </button>
        <button onClick={closeModal} css={closeModalButton}>
          닫기
        </button>
          </div>
        
        
        
        </div>
      </ReactModal>
    </div>
  );
};
export default BlackList;
