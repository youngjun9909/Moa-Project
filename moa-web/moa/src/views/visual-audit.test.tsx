// Opt-in static previews of real components. All account/API data is fictional.
// No preview route, authentication override, or fixture is included in the app.
import React from "react";
import "../test-utils/visual-dom";
import fs from "fs";
import path from "path";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import MyPageStart from "./my-page/get-user-info/MyPageStart";
import GetUserInfo from "./my-page/get-user-info/GetUserInfo";
import MyPageReview from "./my-page/mypage-review/MyPageReview";
import Participation from "./my-page/participation-status-page/ParticipationStatusPage";
import FindPassword from "./auth/find-password/FindPassword";
import VerificationPassword from "./auth/find-password/VerificationPassword";
import DeleteStart from "./my-page/delete-user-info/DelelteUserInfoStart";
import DeleteEnter from "./my-page/delete-user-info/DelelteUserInfo";
import SignUp from "./auth/signup/SignUp";
import CreateReview from "./review/create-review/CreateReview";
import Report from "./report/ReportPage";
import GroupUpdate from "./manager/group-update/GroupUpdate";
import Manager from "./manager";
import GroupMain from "./join-group/join-main/GroupMainPage";
import FavoriteMeetings from "./my-page/favorite-meetings/FavoriteMeetings";
import RootLayout from "../layouts/root-layout/RootLayout";
import RootContainer from "../layouts/root-container/RootContainer";
import MainContainer from "../layouts/main-container/MainContainer";
import InformationNaviBar from "../layouts/information-navi-bar/InformationNaviBar";
import GroupNaviBar from "../layouts/group-navi-bar/GroupNaviBar";
import userAuthStore from "../stores/auth.store";
import * as api from "../apis";

jest.mock("axios", () => ({ get:jest.fn(), post:jest.fn(), put:jest.fn(), delete:jest.fn() }));
jest.mock("react-cookie", () => ({ useCookies: () => [{token:"visual-fixture-only",isChecked:true},jest.fn(),jest.fn()] }));

const group = {groupId:1, groupTitle:"주말의 작은 독서 모임", groupCategory:"문화_예술",groupType:"정기모임",meetingType:"온라인",groupDate:"2026-10-10",groupAddress:"",groupImage:null,groupContent:"각자 읽은 책을 나누고, 서로의 취향을 발견하는 모임입니다.",groupSupplies:"읽고 싶은 책 한 권",groupQuestion:"좋아하는 책을 알려주세요."};
const review = {reviewId:1, userId:"moa_demo",groupId:1,groupName:group.groupTitle,reviewContent:"처음 참여했는데도 편안하게 이야기할 수 있었어요. 서로 다른 시선으로 책 이야기를 나누니 혼자 읽을 때보다 훨씬 즐거웠습니다. 다음 모임도 기대돼요.",reviewDate:"2026-09-29",reviewImage:null};
const user = {userId:"moa_demo",nickName:"모아친구",userName:"김모아",userGender:"여",region:"서울",phoneNumber:"01000000000",email:"demo@example.com",profileImage:null};

const visualTest = process.env.MOA_VISUAL_DIR ? test : test.skip;
visualTest("exports account and nested page visual fixtures", async () => {
  const output = path.resolve(process.env.MOA_VISUAL_DIR!);
  fs.mkdirSync(output, {recursive:true});
  let withReviews = true;
  (axios.get as jest.Mock).mockImplementation((url:string) => {
    let data:any = [];
    if (url === api.GET_USER_INFO_API) data = user;
    else if (url === api.PAGINATION_RECOMMENDATION_GET_API) data = Array.from({length:13},(_,index)=>({groupId:index+1}));
    else if (url.startsWith(api.GROUP_DETAIL_MEETING_API)) data = {...group,groupId:Number(url.split('/').pop()),groupTitle:`관심 모임 ${url.split('/').pop()} · 주말 독서`};
    else if (url === api.REVIEW_GET_API) data = withReviews ? [review] : [];
    else if (url === api.GROUP_NAV_GET_API) data = [group];
    else if (url.startsWith(api.GROUP_UPDATE_API)) data = group;
    else if (url === api.GROUP_PARTICIPATION_STATUS) data = [{...group,answerId:1,answerDate:"2026-09-29",isApproved:2}];
    else if (url.startsWith(api.VOTE_API)) data = null;
    return Promise.resolve({data:{data,result:true}});
  });
  const globalCss = ["src/index.css","src/views/my-page/get-user-info/style.css","src/views/my-page/delete-user-info/style.css"].map(file=>fs.readFileSync(file,"utf8")).join("\n");
  async function capture(name:string, component:React.ReactElement, standalone=false, setup?:()=>void) {
    const cache = createCache({key:"audit",speedy:false});
    userAuthStore.getState().login({userId:"moa_demo",nickName:"모아친구",profileImage:""});
    const route = name === "favorites" ? "/mypage/favorites" : name === "password" ? "/mypage/password" : name.startsWith("my-reviews") ? "/review/myPage" : name === "participation" ? "/mypage/participationStatus" : "/mypage/userInfo";
    await act(async () => { render(<CacheProvider value={cache}><MemoryRouter initialEntries={[route]}>{standalone ? component : <RootLayout><GroupNaviBar /><RootContainer><InformationNaviBar /><MainContainer>{component}</MainContainer></RootContainer></RootLayout>}</MemoryRouter></CacheProvider>); });
    if(setup) await act(async () => setup());
    let markup = document.body.innerHTML;
    for(const file of fs.readdirSync("src/images")) {
      if(!/\.(png|jpg|jpeg|svg)$/.test(file)) continue;
      const ext=path.extname(file).slice(1);
      markup=markup.split('src="'+file+'"').join('src="data:image/'+(ext==="svg"?"svg+xml":ext)+';base64,'+fs.readFileSync("src/images/"+file).toString("base64")+'"');
    }
    const styles=Array.from(document.querySelectorAll("style")).map(style=>style.outerHTML).join("");
    fs.writeFileSync(path.join(output,name+".html"),'<!doctype html><html lang="ko"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>MOA 시각 검증 · '+name+'</title><style>'+globalCss+'</style>'+styles+'</head><body>'+markup+'</body></html>');
    cleanup();cache.sheet.flush();
  }
  await capture("account",<MyPageStart />);
  await capture("profile",<GetUserInfo />);
  await capture("favorites",<FavoriteMeetings />);
  await capture("password",<FindPassword account />);
  await capture("reset-password",<VerificationPassword />,true);
  await capture("my-reviews",<MyPageReview />);
  withReviews=false;
  await capture("my-reviews-empty",<MyPageReview />);
  await capture("participation",<Participation />);
  await capture("withdrawal",<DeleteStart />);
  await capture("withdrawal-confirm",<DeleteEnter />);
  await capture("signup",<SignUp />,true);
  await capture("signup-details",<SignUp />,true,()=>fireEvent.click(screen.getByText("Moa 계정으로 회원가입")));
  await capture("create-review",<CreateReview />);
  await capture("report",<Report />);
  await capture("group-settings",<GroupUpdate parseToNumGroupId={1} />);
  await capture("group-home",<GroupMain groupInfo={group} isLoading={false} />);
  for(const tab of ["멤버","활동 통계","투표","제한 목록","신고 관리","가입 승인","모임 정보"]) {
    await capture("manager-"+tab.replace(/ /g,"-"),<Manager />,false,()=>fireEvent.click(screen.getByRole("tab",{name:tab})));
  }
  expect(fs.existsSync(path.join(output,"profile.html"))).toBe(true);
}, 60000);
