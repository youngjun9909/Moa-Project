/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import * as s from "./style";
import Img from "../../../images/moaLogo.png";
import axios from "axios";
import { Find_USERID_POST_API } from "../../../apis";
import ReactModal from "react-modal";
import './style.css'

function FindUserId() {
  const [formData, setFormData] = useState({
    userName: "",
    phoneNumber: "",
  });
  const [modal, setModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target;
    setFormData({ ...formData, [element.name]: element.value });
  };

  const handleSendMail = async (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    if ("key" in e && e.key !== "Enter") return;
    if (!formData.userName || !formData.phoneNumber) {
      alert("이름, 휴대폰번호, 이메일을 입력해주세요");
    }
    setLoading(true);
    try {
      const response = await axios.post(Find_USERID_POST_API, formData);
      const userData = response.data.data;
      if (userData) {
        setModalMessage("이메일 전송이 완료됐습니다.");
      }
      setModal(true);
    } catch (error) {
      console.error(error);
        setModalMessage(`이메일 전송에에 실패했습니다. 다시 시도해주세요.`);
        setModal(true);
    } finally {
      setLoading(false);
    }
  };
  const closeModal = () => {
    setModal(false);
  }


  return (
    <div css={s.findUserIdContainer}>
      <div css={s.inputBox}>
        <img src={Img} alt="MOA" css={s.findUserIdImg} />
        <h1 css={s.findUserIdTitle}>아이디 찾기</h1>
        <p css={s.authDescription}>가입할 때 등록한 정보로 아이디를 확인해드려요.</p>
        <form onSubmit={(e) => e.preventDefault()} css={s.findUserIdForm}>
          <label htmlFor="find-id-name" css={s.fieldLabel}>이름</label>
          <input
            id="find-id-name"
            css={s.findUserIdInput1}
            type="text"
            onChange={handleChange}
            name="userName"
            value={formData.userName || ""}
            placeholder="이름을 입력해주세요."
            onKeyDown={handleSendMail}
          />
          <label htmlFor="find-id-phone" css={s.fieldLabel}>휴대폰 번호</label>
          <input
            id="find-id-phone"
            css={s.findUserIdInput2}
            type="text"
            onChange={handleChange}
            name="phoneNumber"
            value={formData.phoneNumber || ""}
            placeholder="휴대폰번호를 입력해주세요."
            onKeyDown={handleSendMail}
          />
          <button css={s.findUserIdBtn} onClick={handleSendMail}>
            {loading ? <p>전송중...</p>: <p>아이디 찾기</p> }
          </button>
        </form>
      </div>
      <ReactModal
        isOpen={modal}
        onRequestClose={closeModal}
        className="modalContent"
        overlayClassName="modalOverlay"
      >
        <h2>알림</h2>
        <div className="findUserIdModal">
        <p role="status">{modalMessage}</p>
        <button onClick={closeModal} className="closeModalBtn">닫기</button>
        </div>
      </ReactModal>
    </div>
  );
}

export default FindUserId;
