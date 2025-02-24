/** @jsxImportSource @emotion/react */
import * as s from "./style";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ReactModal from "react-modal";
import userImg from "../../../images/userImg.png";
import {
  MANGE_HOME_DELTE_API,
  MANGE_HOME_GET_API,
  MANGE_HOME_PUT_API,
} from "../../../apis";
import { GetUserListResponseDto } from "../../../types/dto/response.dto";
import { useNavigate } from "react-router-dom";

interface ManagerHomeProps {
  parseToNumGroupId: number;
}

ReactModal.setAppElement("#root");

const ManagerHome: React.FC<ManagerHomeProps> = ({ parseToNumGroupId }) => {
  const [userList, setUserList] = useState<GetUserListResponseDto[]>([]);
  const [cookies] = useCookies(["token", "userId"]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<"일반회원" | "우수회원">(
    "일반회원"
  );
  const [selectedUser, setSelectedUser] =
    useState<GetUserListResponseDto | null>(null);

    // 일반
    const [generalUser, setGeneralUser] = useState<GetUserListResponseDto[]>([]);
    // 우수
    const [excellentUser, setExcellentUser] = useState<GetUserListResponseDto[]>([]);
    // 관리자
    const [manager, setManager] = useState<GetUserListResponseDto>();

    const navigate = useNavigate();

  useEffect(() => {
    fetchUserList();
  }, [cookies.token]);

  const openModal = (user: GetUserListResponseDto) => {
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedUser(null);
  };

  const fetchUserList = async () => {
    try {
      const response = await axios.get(
        `${MANGE_HOME_GET_API}${parseToNumGroupId}`,
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
        }
      );
      const userListData: GetUserListResponseDto[] = response.data.data || [];
      setUserList(userListData);
      filterUser(userListData)
  
    } catch (error) {
      console.error(error);
    }
  };

  const filterUser = (userList: GetUserListResponseDto[]) => {
      const general = userList.filter(user => user.userLevel === "일반회원");
      const excellent = userList.filter(user => user.userLevel === "우수회원");
      const manager = userList.find(user => user.userLevel === "관리자");

      setGeneralUser(general);
      setExcellentUser(excellent);
      setManager(manager);
      console.log(general);
      console.log(excellent);
      console.log(manager);
  }

  const handleUserLevel = async () => {
    if (!selectedUser || !cookies.token) return;

    const putUserLevelRequestDto = {
      userId: selectedUser.userId,
      userLevel: selectedLevel,
    };

    try {
      const response = await axios.put(
        `${MANGE_HOME_PUT_API}${parseToNumGroupId}`,
        putUserLevelRequestDto,
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
        }
      );

      setUserList((prevList) =>
        prevList.map((user) =>
          user.userId === selectedUser.userId
            ? { ...user, userLevel: response.data.data.userLevel }
            : user
        )
      );
      fetchUserList();
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (cookies.userId === userId) {
      alert("관리자는 스스로 방출 안됩니다.");
      return;
    }

    try {
      await axios.delete(
        `${MANGE_HOME_DELTE_API}${parseToNumGroupId}?userId=${userId}`,
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
        }
      );
      setUserList((prevList) =>
        prevList.filter((user) => user.userId !== userId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteGroup = async(groupId: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/meeting-group/${groupId}`, {
        headers: { 
          Authorization: `Bearer ${cookies.token}` 
        },
      })
      window.location.reload();
      navigate("/main");
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <div css={s.box}>
      <div css={s.headerBox}>
        <h3>총 인원: {userList?.length || 0}</h3>
      </div>
        {/* 매니저저 */}
        <h3 css={s.userLabel}>
          관리자
        </h3>
        {manager ? (
      <ul css={s.ulBox}>
          <li css={s.listItem}>
            <div>
              <div css={s.userImgBox}>
                {!manager!.profileImage ? (
                  <img src={userImg} alt="userImage" css={s.userImg} />
                ) : (
                  <img
                    src={manager!.profileImage
                      ? `http://localhost:8080/image/${manager!.profileImage}`
                      : userImg}
                    alt="profileImage"
                    css={s.userImg}
                  />
                )}
              </div>
            </div>
            <div>
              <p>{manager!.nickName}</p>
            </div>
            <div>
              <button onClick={() => handleDeleteGroup(parseToNumGroupId)}>
                모임 해체
              </button>
            </div>
          </li>
      </ul>
        ) : (<></>)}
      
      <h3 css={s.userLabel}>
        우수 회원
      </h3>
      <ul css={s.ulBox}>
        {excellentUser.map((user) => (
          <li css={s.listItem} key={user.userId}>
            <div>
              <div css={s.userImgBox}>
                {!user.profileImage ? (
                  <img src={userImg} alt="userImage" css={s.userImg} />
                ) : (
                  <img
                    src={user.profileImage
                      ? `http://localhost:8080/image/${user.profileImage}`
                      : userImg}
                    alt="profileImage"
                    css={s.userImg}
                  />
                )}
              </div>
            </div>
            <div>
              <p>{user.nickName}</p>
            </div>
            <div css={s.btnBox}>
            <button onClick={() => openModal(user)} >
            등급 수정
          </button>
          <button
            onClick={() => handleDeleteUser(user.userId)}
          >
            추방
          </button>
            </div>
          </li>
        ))}
      </ul>

      <h3 css={s.userLabel}>
        일반 회원
      </h3>
      <ul css={s.ulBox}>
        {generalUser.map((user) => (
          <li css={s.listItem} key={user.userId}>
            <div>
              <div css={s.userImgBox}>
                {!user.profileImage ? (
                  <img src={userImg} alt="userImage" css={s.userImg} />
                ) : (
                  <img
                    src={user.profileImage
                      ? `http://localhost:8080/image/${user.profileImage}`
                      : userImg}
                    alt="profileImage"
                    css={s.userImg}
                  />
                )}
              </div>
            </div>
            <div>
              <p>{user.nickName}</p>
            </div>
            <div css={s.btnBox}>
            <button onClick={() => openModal(user)} >
            등급 수정
          </button>
          <button
            onClick={() => handleDeleteUser(user.userId)}
          >
            추방
          </button>
            </div>
          </li>
        ))}
      </ul>


      {selectedUser && (
        <ReactModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          overlayClassName="modalOverlay"
          css={s.modalContent}
        >
          <div css={s.modalInner}>
          <div>
            <h2 css={s.modalHeader}>{selectedUser.nickName} 님의 등급 수정</h2>
          </div>

          <div css={s.optionBox}>
            <input
              type="radio"
              name="userLevel"
              value="일반회원"
              id="general"
              checked={selectedLevel === "일반회원"}
              onChange={() => setSelectedLevel("일반회원")}
              />
            <label htmlFor="general"> 일반 회원
            </label>
            <input
              type="radio"
              name="userLevel"
              value="우수회원"
              id="excellent"
              checked={selectedLevel === "우수회원"}
              onChange={() => setSelectedLevel("우수회원")}
              />
              <label htmlFor="excellent">
            우수 회원
          </label>
          </div>
          <div css={s.modalBottom}>
            <button onClick={handleUserLevel} css={s.closeModalButton}>
              변경
            </button>
            <button onClick={closeModal} css={s.closeModalButton}>
              닫기
            </button>
          </div>

          </div>
        </ReactModal>
      )}
    </div>
  );
};

export default ManagerHome;
