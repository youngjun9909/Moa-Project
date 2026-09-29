/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as s from "./style";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import axios from "axios";
import { useCookies } from "react-cookie";
import { MeetingGroup, Recommendation } from "../../types";
import useGroupStore from "../../stores/group.store";
import { useNavigate } from "react-router-dom";
import groupImg from "../../images/moaLogo.png";
import {
  HOME_GROUP_AUTH_GET_API,
  HOME_GROUP_GET_API,
  HOME_GROUP_IMG_API,
  HOME_GROUP_RECOMMENDATION_DELETE_API,
  HOME_GROUP_RECOMMENDATION_GET_API,
  HOME_GROUP_RECOMMENDATION_POST_API,
} from "../../apis";
import { EmptyState, PageHeader } from "../../components/ui";

function HomeGroup() {
  const [datas, setDatas] = useState<MeetingGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [likedGroups, setLikedGroups] = useState<number[]>([]);
  const [cookies] = useCookies(["token"]);
  const navigator = useNavigate();

  const handleOpenGroup = (group: MeetingGroup | null) => {
    useGroupStore.getState().setGroupData(group);
    navigator(`/meeting-group/${group?.groupId}`);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = cookies.token
        ? await axios.get(HOME_GROUP_GET_API, {
            headers: { Authorization: `Bearer ${cookies.token}` },
            withCredentials: true,
          })
        : await axios.get(HOME_GROUP_AUTH_GET_API);

      const groupData = response.data.data;
      setDatas(groupData);
    } catch (error) {
      console.error(error);
      alert("데이터를 가져오는 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchLikes() {
      if (!cookies.token) return;
      try {
        const response = await axios.get(HOME_GROUP_RECOMMENDATION_GET_API, {
          headers: { Authorization: `Bearer ${cookies.token}` },
          withCredentials: true,
        });

        const likedGroupIDs = response.data.data.map(
          (item: { groupId: number }) => item.groupId
        );
        setLikedGroups(likedGroupIDs);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLikes();
  }, [cookies.token]);

  const toggleLike = (groupId: number) => {
    setLikedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleFetchData = async (groupId: number) => {
    if (!cookies.token) {
      alert("로그인 후 사용가능합니다.");
      return;
    }
    try {
      if (!likedGroups.includes(groupId)) {
        await axios.post<Recommendation>(
          HOME_GROUP_RECOMMENDATION_POST_API,
          { groupId },
          {
            headers: { Authorization: `Bearer ${cookies.token}` },
            withCredentials: true,
          }
        );
      } else {
        await axios.delete(HOME_GROUP_RECOMMENDATION_DELETE_API, {
          data: { groupId },
          headers: { Authorization: `Bearer ${cookies.token}` },
          withCredentials: true,
        });
      }
      toggleLike(groupId);
    } catch (error) {
      console.error(error);
      alert("찜 상태를 업데이트하는 중 문제가 발생했습니다.");
    }
  };

  const cutText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
      <main css={s.container}>
        <PageHeader eyebrow="DISCOVER TOGETHER" title="오늘은 누구와 무엇을 시작해볼까요?" description="취향과 지역이 맞는 모임을 편하게 둘러보세요." />
        <nav css={s.filterBar} aria-label="모임 유형">
          <button css={s.activeFilter} onClick={() => navigator("/main")}>전체</button>
          <button css={s.filter} onClick={() => navigator("/main/grouptype/shorttype")}>단기 모임</button>
          <button css={s.filter} onClick={() => navigator("/main/grouptype/regulartype")}>정기 모임</button>
        </nav>
        <section css={s.mainBox} aria-labelledby="recommended-groups">
          <div css={s.sectionHeading}><h2 id="recommended-groups">추천 모임</h2><span>새로운 모임 {datas.length}개</span></div>
          {loading ? (
            <div css={s.loadingBox}>모임을 불러오는 중입니다...</div>
          ) : datas.length === 0 ? (
            <EmptyState title="아직 추천할 모임이 없어요" description="검색과 카테고리에서 새로운 모임을 찾아보세요." />
          ) : (
              <ul css={s.groupList}>
                  {datas.map((data) => (
                    <li key={data.groupId} css={s.groupLi}>
                        <button css={s.imgDiv} onClick={() => handleOpenGroup(data)} aria-label={`${data.groupTitle} 상세 보기`}>
                          {!data.groupImage ? (
                            <img
                              src={groupImg}
                              alt=""
                              css={s.img}
                            />
                          ) : (
                            <img
                              src={`${HOME_GROUP_IMG_API}${data.groupImage}`}
                              css={s.img}
                              alt=""
                            />
                          )}
                          <span css={s.categoryTag}>{data.groupCategory || "모임"}</span>
                        </button>
                      <div css={s.listDetail}>
                        <h3 title={data.groupTitle}>{data.groupTitle}</h3>
                          <button
                            css={s.click}
                            onClick={() => handleFetchData(data.groupId)}
                            aria-label={likedGroups.includes(data.groupId) ? `${data.groupTitle} 관심 모임 해제` : `${data.groupTitle} 관심 모임 추가`}
                          >
                            {likedGroups.includes(data.groupId) ? (
                              <BsHeartFill style={{ color: "#FF7B54" }} />
                            ) : (
                              <BsHeart />
                            )}
                          </button>
                      </div>
                      <div css={s.metaRow}>
                        <span>{data.groupDate}</span>
                        <span>{cutText(data.groupAddress, 8)}</span>
                      </div>
                    </li>
                  ))}
              </ul>
          )}
        </section>
      </main>
  );
}

export default HomeGroup;
