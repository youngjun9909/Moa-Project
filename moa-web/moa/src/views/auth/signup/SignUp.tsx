/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import * as s from "./style";
import { useNavigate, useLocation } from "react-router-dom";
import { Gender, Hobby, Region, User } from "../../../types";
import logo from "../../../images/moaLo.png";
import naverLogo from "../../../images/naverLogo.png";
import kakaoLogo from "../../../images/kakaoLogo.png";
import { LuImagePlus } from "react-icons/lu";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import userImg from "../../../images/userImg.png";
import axios from "axios";
import {
  SIGN_UP_DUPLICATION_NICKNAME_API,
  SIGN_UP_DUPLICATION_USERID_API,
  SIGN_UP_HPBBY_GET_API,
  SIGN_UP_POST_API,
  SIGN_UP_SNS_API,
} from "../../../apis";

const regions = [
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "서울",
  "제주",
  "세종",
  "경기",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
];

const steps = ["회원가입 유형", "필수 항목", "선택 항목"];

const idRegex = /^[a-zA-Z0-9]{8,14}$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,16}$/;
const birthDateRegex = /^\d{8}$/;
const nicknameRegex = /^[a-zA-Z가-힣0-9]{1,10}$/;
const nameRegex = /^[a-zA-Z가-힣]+$/;
const phoneRegex = /^01[016789]\d{7,8}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function SignUp() {
  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const snsId = params.get("snsId");
  const joinPath = params.get("joinPath");
  const path = params.get("path");

  const [page, setPage] = useState<number>(0);
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [hobbyError, setHobbyError] = useState(false);
  const loadHobbies = () => {
    setHobbyError(false);
    return axios.get(SIGN_UP_HPBBY_GET_API).then(response => setHobbies(response.data.data || [])).catch(() => setHobbyError(true));
  };
  const [region, setRegion] = useState<Region | null>(null);
  const [userProfileImg, setUserProfileImg] = useState<any>(null);
  const [clearModal, setClearModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [signUpClear, setSignUpClear] = useState<boolean>(false);

  const [duplicateId, setDuplicateId] = useState<boolean>(false);
  const [duplicateNickName, setDuplicateNickName] = useState<boolean>(false);
  const [validId, setValidId] = useState<string>("");
  const [validPassword, setValidPassword] = useState<string>("");
  const [validBirthDay, setValidBirthDay] = useState<string>("");
  const [validName, setValidName] = useState<string>("");
  const [validNickName, setValidNickName] = useState<string>("");
  const [validGender, setValidGender] = useState<string>("");
  const [validHobby, setValidHobby] = useState<string>("");
  const [validPhone, setValidPhone] = useState<string>("");
  const [validEmail, setValidEmail] = useState<string>("");

  const [duplicateIdMs, setDuplicateIdMs] = useState<string>("");
  const [duplicateNickNameMs, setDuplicateNickNameMs] = useState<string>("");
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});
  const duplicateRequests = useRef({ userId: 0, nickName: 0 });

  const [signUpData, setSignUpData] = useState<Omit<User, "userBirthDate"> & { userBirthDate: string }>({
    userId: "",
    password: "",
    confirmPassword: "",
    userName: "",
    nickName: "",
    userGender: null,
    userBirthDate: "",
    hobbies: [],
    profileImage: null,
    region: null,
    snsId: snsId,
    joinPath: joinPath ? joinPath : "Home",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    void loadHobbies();

    if (path === "1") {
      setPage(1);
    }
  }, [path]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const normalized = name === "phoneNumber" || name === "userBirthDate"
      ? value.replace(/[\s-]/g, "") : value;
    setStepErrors({});
    if (name === "userId") {
      duplicateRequests.current.userId += 1;
      setDuplicateId(false);
      setDuplicateIdMs("아이디를 변경했어요. 중복 확인을 다시 해주세요.");
      setValidId("");
    }
    if (name === "nickName") {
      duplicateRequests.current.nickName += 1;
      setDuplicateNickName(false);
      setDuplicateNickNameMs("닉네임을 변경했어요. 중복 확인을 다시 해주세요.");
      setValidNickName("");
    }
    setSignUpData(prev => ({ ...prev, [name]: normalized }));
  };

  const handleHobbyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      !(signUpData.hobbies.length < 3) &&
      !signUpData.hobbies.includes(parseInt(e.target.value))
    ) {
      return;
    }

    setSignUpData((prev) => ({
      ...prev,
      [e.target.name]: prev.hobbies.includes(parseInt(e.target.value))
        ? prev.hobbies.filter((hobbyId) => hobbyId !== parseInt(e.target.value))
        : [...prev.hobbies, parseInt(e.target.value)],
    }));
  };

  const handleRegionChange = (e: SelectChangeEvent) => {
    const selectedRegion = e.target.value as Region;
    setRegion(selectedRegion);
    setSignUpData((prevState) => ({
      ...prevState,
      region: selectedRegion,
    }));
  };

  useEffect(() => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setUserProfileImg(e.target?.result);
    };
    if (!!signUpData?.profileImage) {
      fileReader.readAsDataURL(signUpData.profileImage);
    }
  }, [signUpData.profileImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!!e.target.files) {
      const imgFile: FileList = e.target.files;
      setSignUpData((prev) => ({
        ...prev,
        [e.target.name]: imgFile[0],
      }));
    }
  };

  const handleNextPage = () => {
    const errors: Record<string, string> = {};
    if (!signUpData.userId || !idRegex.test(signUpData.userId)) {
      errors.userId = "아이디는 영문 또는 숫자 8~14자로 입력해주세요.";
    } else if (!duplicateId) {
      errors.userId = "현재 아이디의 중복 확인을 완료해주세요.";
    }
    if (!signUpData.password || !passwordRegex.test(signUpData.password)) {
      errors.password = "비밀번호는 영문, 숫자, 특수문자를 모두 포함해 8~16자로 입력해주세요.";
    } else if (signUpData.password !== signUpData.confirmPassword) {
      errors.confirmPassword = "비밀번호 확인이 일치하지 않습니다.";
    }
    if (!signUpData.nickName || !nicknameRegex.test(signUpData.nickName)) {
      errors.nickName = "닉네임은 한글, 영문, 숫자로 1~10자 입력해주세요.";
    } else if (!duplicateNickName) {
      errors.nickName = "현재 닉네임의 중복 확인을 완료해주세요.";
    }
    if (!signUpData.userName || !nameRegex.test(signUpData.userName)) {
      errors.userName = "성명은 한글 또는 영문으로 입력해주세요.";
    }
    if (!signUpData.phoneNumber || !phoneRegex.test(signUpData.phoneNumber)) {
      errors.phoneNumber = "휴대폰 번호를 확인해주세요. 예: 01012345678";
    }
    if (!birthDateRegex.test(signUpData.userBirthDate)) {
      errors.userBirthDate = "생년월일은 숫자 8자리로 입력해주세요. 예: 19950102";
    }
    if (!signUpData.userGender) {
      errors.male = "성별을 선택해주세요.";
    }
    if (!signUpData.email || !emailRegex.test(signUpData.email)) {
      errors.email = "필수 항목인 이메일을 올바른 형식으로 입력해주세요.";
    }
    setValidId(errors.userId || "");
    setValidPassword(errors.password || errors.confirmPassword || "");
    setValidNickName(errors.nickName || "");
    setValidName(errors.userName || "");
    setValidPhone(errors.phoneNumber || "");
    setValidBirthDay(errors.userBirthDate || "");
    setValidGender(errors.male || "");
    setValidEmail(errors.email || "");
    setStepErrors(errors);
    const firstInvalid = Object.keys(errors)[0];
    if (firstInvalid) {
      const field = document.getElementById(firstInvalid);
      field?.focus();
      field?.scrollIntoView?.({ block: "center", behavior: "smooth" });
      return;
    }
    setPage(2);
  };

  const handlePreviousPage = () => setPage((prev) => prev - 1);

  const handleDuplicateId = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const request = ++duplicateRequests.current.userId;
    setDuplicateId(false);
    setDuplicateIdMs("");
    try {
      if (signUpData.userId && idRegex.test(signUpData.userId)) {
        setValidId("");
        const result = await axios.get(
          `${SIGN_UP_DUPLICATION_USERID_API}${encodeURIComponent(signUpData.userId)}`
        );
        if (request !== duplicateRequests.current.userId) return;
        if (result.data.result === false || typeof result.data.data !== "boolean") throw new Error("Invalid duplicate response");
        if (result.data.data === true) {
          setDuplicateIdMs("※ 아이디가 중복되었습니다.");
          setDuplicateId(false);
        } else {
          setDuplicateIdMs("아이디 중복확인 완료✅");
          setDuplicateId(true);
          setStepErrors(previous => {
            const next = { ...previous };
            delete next.userId;
            return next;
          });
        }
      } else {
        setValidId("※ 아이디 8~14자의 영문, 숫자 포함 입력");
        setDuplicateIdMs("");
        setDuplicateId(false);
      }
    } catch (error) {
      if (request !== duplicateRequests.current.userId) return;
      setDuplicateId(false);
      setDuplicateIdMs("아이디 중복 확인에 실패했어요. 다시 시도해주세요.");
    }
  };

  const handleDuplicateNickName = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const request = ++duplicateRequests.current.nickName;
    setDuplicateNickName(false);
    setDuplicateNickNameMs("");
    try {
      if (signUpData.nickName && nicknameRegex.test(signUpData.nickName)) {
        setValidNickName("");
        const result = await axios.get(
          `${SIGN_UP_DUPLICATION_NICKNAME_API}${encodeURIComponent(signUpData.nickName)}`
        );
        if (request !== duplicateRequests.current.nickName) return;
        if (result.data.result === false || typeof result.data.data !== "boolean") throw new Error("Invalid duplicate response");
        if (result.data.data === true) {
          setDuplicateNickNameMs("※ 닉네임이 중복되었습니다.");
          setDuplicateNickName(false);
        } else {
          setDuplicateNickNameMs("닉네임 중복확인 완료 ✅");
          setDuplicateNickName(true);
          setStepErrors(previous => {
            const next = { ...previous };
            delete next.nickName;
            return next;
          });
        }
      } else {
        setValidNickName("닉네임은 한글, 영문, 숫자로 1~10자 입력해주세요.");
        setDuplicateNickNameMs("");
        setDuplicateNickName(false);
      }
    } catch (error) {
      if (request !== duplicateRequests.current.nickName) return;
      setDuplicateNickName(false);
      setDuplicateNickNameMs("닉네임 중복 확인에 실패했어요. 다시 시도해주세요.");
    }
  };

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let valid = true;

    if (signUpData.hobbies.length !== 3 && signUpData.hobbies.length !== 0) {
      valid = false;
      setValidHobby("취미를 3가지 선택해주세요");
    } else {
      valid = true;
    }

    const signUpForm = new FormData();
    Object.entries(signUpData).forEach(([key, value]) => {
      if (!!value) {
        if (key === "hobbies" && value.length > 0) {
          value.forEach((hobby: string) => {
            signUpForm.append("hobbies", hobby);
          });
        } else {
          signUpForm.append(key, value);
        }
      }
    });

    if (valid) {
      try {
        const response = await axios.post(SIGN_UP_POST_API, signUpForm, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setClearModal(true);
        setModalMessage("회원가입이 완료되었습니다!");
        setSignUpClear(true);
      } catch (error) {
        console.error("Sign-up failed:", error);
        setClearModal(true);
        setModalMessage("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  const onSnsButtonClickHandler = (sns: "kakao" | "naver") => {
    window.location.href = `${SIGN_UP_SNS_API}${sns}`;
  };

  const handleSignUpClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/signIn");
  };

  return (
    <div css={s.fullBox}>
      <div css={s.signUpBox}>
        {hobbyError && <div role="alert" css={s.errorMessage}>취미 목록을 불러오지 못했어요. 연결을 확인해주세요. <button type="button" css={s.validBtn} onClick={loadHobbies}>다시 시도</button></div>}
        {page > 0 && <header css={s.headerBox}><img src={logo} alt="MOA" /><h1>{page === 1 ? "나의 기본 정보" : "나의 취향 소개"}</h1></header>}
        {page === 0 && (
          <>
            <Box sx={{ width: "100%", padding: "20px 0" }}>
              <Stepper activeStep={page} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel sx={{ fontWeight: "bold" }}>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
            <div css={s.selectBox}>
              <div css={s.headerBox}>
                <img src={logo} alt="Logo" />
                <h1>회원가입</h1>
              </div>
              <div css={s.allSignUpBox}>
                <button type="button" aria-label="Moa 계정으로 회원가입"
                  css={s.anotherSignInBox}
                  className="moa"
                  onClick={() => setPage(1)}
                >
                  <div css={s.anotherLogoBox}>
                    <img src={logo} alt="모아로고" className="moa" />
                  </div>
                  <div>
                    <p>Moa 계정으로 회원가입</p>
                  </div>
                </button>
                <button type="button" aria-label="Naver 계정으로 회원가입"
                  css={s.anotherSignInBox}
                  className="naver"
                  onClick={() => onSnsButtonClickHandler("naver")}
                >
                  <div css={s.anotherLogoBox}>
                    <img src={naverLogo} alt="네이버로고" className="naver" />
                  </div>
                  <div>
                    <p>Naver 계정으로 회원가입</p>
                  </div>
                </button>
                <button type="button" aria-label="Kakao 계정으로 회원가입"
                  css={s.anotherSignInBox}
                  className="kakao"
                  onClick={() => onSnsButtonClickHandler("kakao")}
                >
                  <div css={s.anotherLogoBox}>
                    <img src={kakaoLogo} alt="카카오로고" className="kakao" />
                  </div>
                  <div>
                    <p>Kakao 계정으로 회원가입</p>
                  </div>
                </button>
              </div>
            </div>
          </>
        )}

        {page === 1 && (
          <>
            <Box sx={{ width: "100%", padding: "20px 0" }}>
              <Stepper activeStep={page} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
            <div css={s.fieldBox}>
              <label htmlFor="userId" css={s.labelBox}>
                <p css={s.label}>아이디*</p>{" "}
                {validId ? <p css={s.errorMessage}>{validId}</p> : <></>}
                {duplicateIdMs ? (
                  <p css={duplicateId ? s.okMessage : s.errorMessage}>
                    {duplicateIdMs}
                  </p>
                ) : (
                  <></>
                )}
              </label>
              <div css={s.validBox}>
                <input
                  css={s.validInput}
                  type="text"
                  name="userId"
                  id="userId"
                  onChange={handleInputChange}
                  value={signUpData.userId}
                  placeholder="8~14자의 영문, 숫자 포함 입력"
                />
                <button css={s.validBtn} onClick={handleDuplicateId}>
                  중복 확인
                </button>
              </div>
            </div>
            <div css={s.fieldBox}>
              <label htmlFor="password" css={s.labelBox}>
                <p css={s.label}>비밀번호*</p>{" "}
                {validPassword ? (
                  <p css={s.errorMessage}>{validPassword}</p>
                ) : (
                  <></>
                )}
              </label>
              <input
                css={s.passwordTop}
                type="password"
                name="password"
                id="password"
                value={signUpData.password}
                onChange={handleInputChange}
                placeholder="8~16자의 영문, 숫자, 특수문자 포함 입력"
              />
              <input
                css={s.passwordBottom}
                type="password"
                name="confirmPassword"
                aria-label="비밀번호 확인"
                id="confirmPassword"
                value={signUpData.confirmPassword}
                onChange={handleInputChange}
                placeholder="비밀번호 확인"
              />
            </div>
            <div css={s.fieldBox}>
              <label htmlFor="nickName" css={s.labelBox}>
                <p css={s.label}>닉네임*</p>{" "}
                {validNickName ? (
                  <p css={s.errorMessage}>{validNickName}</p>
                ) : (
                  <></>
                )}
                {duplicateNickNameMs ? (
                  <p css={duplicateNickName ? s.okMessage : s.errorMessage}>
                    {duplicateNickNameMs}
                  </p>
                ) : (
                  <></>
                )}
              </label>
              <div css={s.validBox}>
                <input
                  css={s.validInput}
                  type="text"
                  name="nickName"
                  id="nickName"
                  value={signUpData.nickName}
                  onChange={handleInputChange}
                  placeholder="1~10자의 한글, 영문, 숫자 입력 (특수문자 불가)"
                />
                <button css={s.validBtn} onClick={handleDuplicateNickName}>
                  중복 확인
                </button>
              </div>
            </div>

            <div css={s.rowFieldFullBox}>
              <div css={s.rowFieldBox}>
                <label htmlFor="userName" css={s.labelBox}>
                  <p css={s.label}>성명*</p>{" "}
                  {validName ? <p css={s.errorMessage}>{validName}</p> : <></>}
                </label>
                <input
                  css={s.input}
                  type="text"
                  name="userName"
                  id="userName"
                  value={signUpData.userName}
                  onChange={handleInputChange}
                  placeholder="한글, 영문의 사용자 이름 입력"
                />
              </div>
              <div css={s.rowFieldBox}>
                <label htmlFor="phoneNumber" css={s.labelBox}>
                  <p css={s.label}>휴대폰 번호*</p>{" "}
                  {validPhone ? <p css={s.errorMessage}>{validPhone}</p> : <></>}
                </label>
                <input
                  css={s.input}
                  type="text"
                  name="phoneNumber"
                  inputMode="tel"
                  id="phoneNumber"
                  value={signUpData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="하이픈(-) 제외 입력"
                />
              </div>
            </div>

            <div css={s.rowFieldFullBox}>
              <div css={s.rowFieldBox}>
                <label htmlFor="userBirthDate" css={s.labelBox}>
                  <p css={s.label}>생년월일*</p>{" "}
                  {validBirthDay ? (
                    <p css={s.errorMessage}>{validBirthDay}</p>
                  ) : (
                    <></>
                  )}
                </label>
                <input
                  css={s.birthDateInput}
                  type="text"
                  name="userBirthDate"
                  id="userBirthDate"
                  value={signUpData.userBirthDate}
                  inputMode="numeric"
                  onChange={handleInputChange}
                  placeholder="하이픈(-) 제외 8자 입력 "
                />
              </div>

              <div css={s.rowFieldBox}>
                <label htmlFor="gender" css={s.labelBox}>
                  <h1 css={s.label}>성별*</h1>{" "}
                  {validGender ? (
                    <p css={s.errorMessage}>{validGender}</p>
                  ) : (
                    <></>
                  )}
                </label>
                <div css={s.genderBox}>
                  <input
                    type="radio"
                    id="male"
                    value="MALE"
                    checked={signUpData.userGender === "MALE"}
                    name="gender"
                    onChange={(e) =>
                      setSignUpData({
                        ...signUpData,
                        userGender: e.target.value as Gender,
                      })
                    }
                  />
                  <label htmlFor="male">남자</label>
                  <input
                    type="radio"
                    id="female"
                    value="FEMALE"
                    checked={signUpData.userGender === "FEMALE"}
                    name="gender"
                    onChange={(e) =>
                      setSignUpData({
                        ...signUpData,
                        userGender: e.target.value as Gender,
                      })
                    }
                  />
                  <label htmlFor="female">여자</label>
                </div>
              </div>
            </div>

            <div css={s.fieldBox}>
              <label htmlFor="email" css={s.labelBox}>
                <p css={s.label}>이메일*</p>{" "}
                {validEmail ? <p css={s.errorMessage}>{validEmail}</p> : <></>}
              </label>
              <input
                css={s.input}
                type="email"
                name="email"
                id="email"
                value={signUpData.email}
                onChange={handleInputChange}
                placeholder="이메일 입력"
              />
            </div>

            {Object.keys(stepErrors).length > 0 && <div role="alert" css={s.validationSummary}>
              <strong>아래 항목을 확인해주세요.</strong>
              <ul>{Object.entries(stepErrors).map(([field, message]) => <li key={field}>{message}</li>)}</ul>
            </div>}
            <div css={s.fieldBox}>
              <div css={s.btnBox}>
                <button onClick={handlePreviousPage}>이전</button>
                <button onClick={handleNextPage}>다음</button>
              </div>
            </div>
          </>
        )}

        {page === 2 && (
          <>
            <Box sx={{ width: "100%", padding: "20px 0" }}>
              <Stepper activeStep={page} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>

            <div css={s.fieldBox}>
              <h1 css={s.label}>프로필 이미지</h1>
              <div css={s.profileImgBox}>
                <div css={s.userImgGroup}>
                  <div css={s.userImgBox}>
                    {!userProfileImg ? (
                      <img src={userImg} alt="userImage" css={s.userImg} />
                    ) : (
                      <img
                        src={userProfileImg}
                        alt="profileImage"
                        css={s.userImg}
                      />
                    )}
                  </div>

                  <label htmlFor="profileImg">
                    <LuImagePlus style={{ width: "30px", height: "30px" }} />
                  </label>
                </div>
                <input
                  type="file"
                  id="profileImg"
                  name="profileImage"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div css={s.fieldBox}>
              <label htmlFor="gender" css={s.labelBox}>
                <h1 css={s.label}>취미[※ 3가지 선택] </h1>{" "}
                {validHobby ? <p css={s.errorMessage}>{validHobby}</p> : <></>}
              </label>
              <div css={s.hobbyBox}>
                {!!hobbies &&
                  hobbies.map((hobby) => (
                    <>
                      <input
                        type="checkbox"
                        name="hobbies"
                        id={hobby?.id.toString()}
                        value={hobby?.id.toString()}
                        onChange={handleHobbyChange}
                        checked={signUpData.hobbies.includes(hobby?.id)}
                      />
                      <label htmlFor={hobby?.id.toString()}>
                        {hobby?.hobbyName.toString()}
                      </label>
                    </>
                  ))}
              </div>
            </div>

            <div css={s.fieldBox}>
              <h1 css={s.label}>지역</h1>
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel
                  id="demo-simple-select-autowidth-label"
                  sx={{
                    color: "#4d4d4d",
                    "&.Mui-focused": {
                      color: "#4d4d4d",
                    },
                    "&.Mui-disabled": {
                      color: "#a1a1a1",
                    },
                  }}
                >
                  지역
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={region ?? ""}
                  onChange={handleRegionChange}
                  autoWidth
                  label="지역"
                  sx={{
                    zIndex: "1001",
                    "& .MuiSelect-root": {
                      borderColor: "#4d4d4d",
                    },
                    "&.Mui-focused .MuiSelect-root": {
                      borderColor: "#FF7B54",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#4d4d4d",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#FF7B54",
                    },
                  }}
                >
                  <MenuItem value={undefined}>
                    <em>선택 안함</em>
                  </MenuItem>
                  {regions.map((region, index) => (
                    <MenuItem
                      key={index}
                      value={region}
                      sx={{
                        fontSize: "14px",
                        padding: "8px 16px",
                        width: "300px",
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      {region}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div css={s.fieldBox}>
              <div css={s.btnBox}>
                <button css={s.pageBtn} onClick={handlePreviousPage}>
                  이전
                </button>
                <button css={s.pageBtn} onClick={handleSignUp}>
                  완료
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      {clearModal && (
        <div css={s.modalBox}>
          {modalMessage}
          {signUpClear ? (
            <button onClick={handleSignUpClear}>완료</button>
          ) : (
            <button onClick={() => setClearModal(false)}>닫기</button>
          )}
        </div>
      )}
    </div>
  );
}
