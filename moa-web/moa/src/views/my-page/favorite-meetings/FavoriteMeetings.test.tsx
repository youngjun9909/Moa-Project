import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import FavoriteMeetings from "./FavoriteMeetings";
import { PAGINATION_RECOMMENDATION_GET_API, GROUP_DETAIL_MEETING_API, PAGINATION_RECOMMENDATION_DELETE_API } from "../../../apis";
jest.mock("axios",()=>({get:jest.fn(),delete:jest.fn(),post:jest.fn()}));
jest.mock("react-cookie",()=>({useCookies:()=>[{token:"fixture-token"}]}));
beforeEach(()=>jest.clearAllMocks());
test("favorite IDs load details in pages of twelve and removal updates the list",async()=>{
  let ids=Array.from({length:13},(_,index)=>({groupId:index+1}));
  (axios.get as jest.Mock).mockImplementation((url:string)=>{
    if(url===PAGINATION_RECOMMENDATION_GET_API)return Promise.resolve({data:{data:ids}});
    const id=Number(url.replace(GROUP_DETAIL_MEETING_API,""));
    return Promise.resolve({data:{data:{groupId:id,groupTitle:`관심 모임 ${id}`,groupType:"단기모임",groupDate:"2026-10-20",meetingType:"온라인",groupImage:null,groupAddress:"온라인",creatorId:"fixture",groupContent:"소개",groupCategory:"취미",groupSupplies:"없음",groupQuestion:""}}});
  });
  (axios.delete as jest.Mock).mockImplementation(()=>{ids=ids.filter(item=>item.groupId!==13);return Promise.resolve({data:{result:true}});});
  render(<MemoryRouter><FavoriteMeetings /></MemoryRouter>);
  expect(await screen.findByRole("button",{name:"관심 모임 1",exact:true})).toBeInTheDocument();
  expect(screen.getAllByRole("article")).toHaveLength(12);
  expect(axios.get).toHaveBeenCalledWith(PAGINATION_RECOMMENDATION_GET_API,expect.objectContaining({headers:{Authorization:"Bearer fixture-token"}}));
  fireEvent.click(screen.getByRole("button",{name:"다음 페이지"}));
  expect(await screen.findByRole("button",{name:"관심 모임 13",exact:true})).toBeInTheDocument();
  expect(screen.getAllByRole("article")).toHaveLength(1);
  fireEvent.click(screen.getByRole("button",{name:"관심 모임에서 제거"}));
  await waitFor(()=>expect(axios.delete).toHaveBeenCalledWith(PAGINATION_RECOMMENDATION_DELETE_API,expect.objectContaining({data:{groupId:13}})));
  expect(await screen.findByRole("button",{name:"관심 모임 1",exact:true})).toBeInTheDocument();
  expect(screen.queryByRole("button",{name:"관심 모임 13",exact:true})).not.toBeInTheDocument();
});
test("favorite request failure offers a retry rather than an empty list",async()=>{
  (axios.get as jest.Mock).mockRejectedValue(new Error("offline"));
  render(<MemoryRouter><FavoriteMeetings /></MemoryRouter>);
  expect(await screen.findByRole("alert")).toHaveTextContent("관심 모임을 불러오지 못했어요");
  expect(screen.getByRole("button",{name:"다시 시도"})).toBeInTheDocument();
});

test.each(["Data does not exist.","Invalid request"])("detail errors respect the backend message: %s",async(message)=>{
  (axios.get as jest.Mock).mockImplementation((url:string)=>{
    if(url===PAGINATION_RECOMMENDATION_GET_API) return Promise.resolve({data:{data:[{groupId:1}]}});
    return Promise.reject({response:{status:400,data:{message}}});
  });
  render(<MemoryRouter><FavoriteMeetings /></MemoryRouter>);
  if(message==="Data does not exist.") {
    expect(await screen.findByText("이 페이지의 모임 1개는 삭제되어 표시할 수 없어요.")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  } else {
    expect(await screen.findByRole("alert")).toHaveTextContent("관심 모임을 불러오지 못했어요");
  }
});
