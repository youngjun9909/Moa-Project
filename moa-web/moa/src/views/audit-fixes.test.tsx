import React from "react";
import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import axios from "axios";
import InformationNaviBar from "../layouts/information-navi-bar/InformationNaviBar";
import GetUserInfo from "./my-page/get-user-info/GetUserInfo";
import ReviewMain from "./review/review-main/ReviewMain";
import Participation from "./my-page/participation-status-page/ParticipationStatusPage";
import SignUp from "./auth/signup/SignUp";
import CreateGroup from "./group-detail/create-group/CreateGroup";

jest.mock("axios", () => ({get:jest.fn(),put:jest.fn(),post:jest.fn(),delete:jest.fn()}));
jest.mock("react-cookie", () => ({useCookies:()=>[{token:"fixture-token"}]}));
const user={userId:"fixture",userName:"테스트",nickName:"기존이름",profileImage:null,region:"서울",phoneNumber:"01000000000",email:"test@example.com",userGender:"MALE",hobbies:[],joinPath:"HOME",snsId:null};
function Location(){return <output aria-label="현재 경로">{useLocation().pathname}</output>}
beforeEach(()=>{jest.clearAllMocks(); jest.spyOn(window,"alert").mockImplementation(()=>{}); jest.spyOn(window,"confirm").mockReturnValue(true); (axios.get as jest.Mock).mockResolvedValue({data:{data:[]}});});
afterEach(()=>jest.restoreAllMocks());

test.each(["button","escape","outside"])("mobile navigation closes using %s",(method)=>{
  render(<MemoryRouter><InformationNaviBar /></MemoryRouter>);
  fireEvent.click(screen.getByLabelText("서비스 메뉴 열기"));
  if(method==="button") fireEvent.click(screen.getByLabelText("서비스 메뉴 닫기"));
  if(method==="escape") fireEvent.keyDown(document,{key:"Escape"});
  if(method==="outside") fireEvent.click(screen.getByLabelText("메뉴 바깥 영역 닫기"));
  expect(screen.getByLabelText("서비스 메뉴 열기")).toHaveAttribute("aria-expanded","false");
});
test("favorites menu navigates to its own selected page",()=>{
  render(<MemoryRouter><InformationNaviBar /><Location /></MemoryRouter>);
  fireEvent.click(screen.getByRole("button",{name:"관심 모임",exact:true}));
  expect(screen.getByLabelText("현재 경로")).toHaveTextContent("/mypage/favorites");
  expect(screen.getByRole("button",{name:"관심 모임",exact:true})).toHaveAttribute("aria-current","page");
});
test.each([false,true])("profile blocks save when unchanged or nickname unchecked (%s)",async(changed)=>{
  (axios.get as jest.Mock).mockResolvedValue({data:{data:user}});
  render(<MemoryRouter><GetUserInfo /></MemoryRouter>);
  const input=await screen.findByLabelText("닉네임");
  if(changed) fireEvent.change(input,{target:{value:"새로운이름"}});
  await act(async()=>fireEvent.click(screen.getByRole("button",{name:"변경사항 저장"})));
  expect(axios.put).not.toHaveBeenCalled();
  expect(screen.getByRole("status")).toHaveTextContent(changed?"중복 확인":"수정된 내용");
});
test("review failure exposes retry and only shows empty after successful retry",async()=>{
  (axios.get as jest.Mock).mockRejectedValueOnce(new Error("offline")).mockResolvedValueOnce({data:{data:[]}});
  render(<MemoryRouter><ReviewMain /></MemoryRouter>);
  expect(await screen.findByRole("alert")).toHaveTextContent("불러오지 못했어요");
  expect(screen.queryByText("아직 등록된 후기가 없어요")).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"다시 시도"}));
  expect(await screen.findByText("아직 등록된 후기가 없어요")).toBeInTheDocument();
});

test("restoring edited profile fields to their original values does not save",async()=>{
  (axios.get as jest.Mock).mockResolvedValue({data:{data:user}});
  render(<MemoryRouter><GetUserInfo /></MemoryRouter>);
  const nickname=await screen.findByLabelText("닉네임");
  fireEvent.change(nickname,{target:{value:"바뀐이름"}});
  fireEvent.change(nickname,{target:{value:user.nickName}});
  const region=screen.getByLabelText("활동 지역");
  fireEvent.change(region,{target:{value:"부산"}});
  fireEvent.change(region,{target:{value:user.region}});
  fireEvent.click(screen.getByRole("button",{name:"변경사항 저장"}));
  expect(axios.put).not.toHaveBeenCalled();
  expect(window.confirm).not.toHaveBeenCalled();
  expect(screen.getByRole("status")).toHaveTextContent("수정된 내용이 없습니다");
});
test("participation failure does not pretend there are no applications",async()=>{
  (axios.get as jest.Mock).mockRejectedValueOnce(new Error("offline"));
  render(<MemoryRouter><Participation /></MemoryRouter>);
  expect(await screen.findByRole("alert")).toHaveTextContent("불러오지 못했어요");
  expect(screen.queryByText("아직 신청한 모임이 없어요")).not.toBeInTheDocument();
});
test("participation shows an empty state only after a successful empty response",async()=>{
  render(<MemoryRouter><Participation /></MemoryRouter>);
  expect(screen.getByRole("status",{name:"로딩 중"})).toBeInTheDocument();
  expect(await screen.findByText("아직 신청한 모임이 없어요")).toBeInTheDocument();
  expect(screen.getByRole("button",{name:"모임 둘러보기"})).toBeInTheDocument();
});
test("profile saves a checked nickname once and resets the dirty state",async()=>{
  (axios.get as jest.Mock).mockResolvedValueOnce({data:{data:user}}).mockResolvedValue({data:{data:false}});
  let finish:(value:unknown)=>void=()=>{};
  (axios.put as jest.Mock).mockImplementation(()=>new Promise(resolve=>{finish=resolve;}));
  render(<MemoryRouter><GetUserInfo /></MemoryRouter>);
  fireEvent.change(await screen.findByLabelText("닉네임"),{target:{value:"검증된이름"}});
  fireEvent.click(screen.getByRole("button",{name:"중복 확인"}));
  await screen.findByText("✅ 닉네임을 사용할 수 있습니다.");
  fireEvent.click(screen.getByRole("button",{name:"변경사항 저장"}));
  expect(screen.getByRole("button",{name:"저장 중…"})).toBeDisabled();
  await act(async()=>finish({data:{result:true,data:{...user,nickName:"검증된이름"}}}));
  expect(screen.getByRole("status")).toHaveTextContent("저장했어요");
  fireEvent.click(screen.getByRole("button",{name:"변경사항 저장"}));
  expect(axios.put).toHaveBeenCalledTimes(1);
});
test("signup options expose native buttons",async()=>{
  render(<MemoryRouter><SignUp /></MemoryRouter>);
  const option=screen.getByRole("button",{name:"Moa 계정으로 회원가입"});
  expect(option.tagName).toBe("BUTTON");
  fireEvent.click(option);
  expect(screen.getByRole("heading",{name:"나의 기본 정보"})).toBeInTheDocument();
  await waitFor(()=>expect(axios.get).toHaveBeenCalled());
});
test("meeting cannot advance without a category",()=>{
  render(<MemoryRouter><CreateGroup /></MemoryRouter>);
  fireEvent.click(screen.getByRole("button",{name:"단기 모임",exact:true}));
  fireEvent.change(screen.getByLabelText("모임 날짜"),{target:{value:"2026-10-20"}});
  fireEvent.click(screen.getByRole("button",{name:"온라인",exact:true}));
  fireEvent.change(screen.getByLabelText("모임 주소"),{target:{value:"https://example.com"}});
  fireEvent.click(screen.getByRole("button",{name:"다음",exact:true}));
  expect(screen.queryByLabelText("모임 제목")).not.toBeInTheDocument();
  expect(screen.getByRole("alert")).toHaveTextContent("카테고리");
});
