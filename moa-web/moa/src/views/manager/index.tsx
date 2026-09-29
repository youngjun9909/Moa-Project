import * as React from "react";
import styled from "@emotion/styled";
import {
  Tab as BaseTab,
  TabsList as BaseTabsList,
  TabPanel as BaseTabPanel,
  tabClasses,
  buttonClasses,
} from "@mui/base";
import { Theme } from "@mui/material";
import { Tabs } from "@mui/base/Tabs";
import ManagerHome from "./manager-home/ManagerHome";

import { useParams } from "react-router-dom";
import BlackList from "./black-list/BlackList";
import Chart from "./chart/Chart";
import Vote from "./vote/Vote";
import Report from "./report/Report";
import Approved from "./approved/approved";
import GroupUpdate from "./group-update/GroupUpdate";
import { PageHeader } from "../../components/ui";


const Tab = styled(BaseTab)`
  color: var(--moa-ink-subtle);
  cursor: pointer;
  font-size: 14px;
  font-weight: 750;
  background-color: transparent;
  min-height: 44px;
  padding: 0 15px;
  border: 1px solid transparent;
  border-radius: 11px;
  display: flex;
  justify-content: space-evenly;

  &:hover {
    background-color: var(--moa-primary-soft);
    color: var(--moa-primary-dark);
  }

  &:focus {
    outline: 3px solid var(--moa-primary-soft);
  }

  &.${tabClasses.selected} {
    background-color: var(--moa-ink);
    color: #fff;
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(BaseTabPanel)<{ theme?: Theme }>(
  ({ theme }) => `
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  padding: 24px 0 0;
  background: transparent;
  border: 0;
  `
);

const TabsList = styled(BaseTabsList)<{ theme?: Theme }>(
  ({ theme }) => `
  width: 100%;
  overflow-x: auto;
  background-color: var(--moa-surface-muted);
  border: 1px solid var(--moa-line);
  border-radius: 14px;
  padding: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
  `
);

const Workspace = styled.main`
  width: min(100%, 1320px);
  margin: 0 auto;
  padding: 34px clamp(20px, 4vw, 56px) 56px;
`;


export default function Index() {
  const { groupId } = useParams();

  const parseToNumGroupId = Number(groupId);

  return (
    <Workspace>
      <PageHeader eyebrow="GROUP OWNER" title="모임 관리" description="멤버와 활동, 가입 요청, 모임 정보를 한곳에서 관리하세요." />
      <Tabs defaultValue={0}>
        <TabsList>
          <Tab value={0}>멤버</Tab>
          <Tab value={1}>활동 통계</Tab>
          <Tab value={2}>투표</Tab>
          <Tab value={3}>제한 목록</Tab>
          <Tab value={4}>신고 관리</Tab>
          <Tab value={5}>가입 승인</Tab>
          <Tab value={6}>모임 정보</Tab>
        </TabsList>
        <TabPanel value={0}>
          {/* 각 컴포넌트에 index.tsx 해당 파일에 있는 groupId값을 props로 전달하기 */}
          <ManagerHome parseToNumGroupId={parseToNumGroupId} />
        </TabPanel>
        <TabPanel value={1}>
          <Chart parseToNumGroupId={parseToNumGroupId} />
        </TabPanel>
        <TabPanel value={2}>
          <Vote parseToNumGroupId={parseToNumGroupId} />
        </TabPanel>
        <TabPanel value={3}>
          <BlackList parseToNumGroupId={parseToNumGroupId} />
        </TabPanel>
        <TabPanel value={4}>
          <Report parseToNumGroupId={parseToNumGroupId} />
        </TabPanel>
        <TabPanel value={5}>
          <Approved parseToNumGroupId={parseToNumGroupId} />
        </TabPanel>
        <TabPanel value={6}>
          <GroupUpdate parseToNumGroupId={parseToNumGroupId} />
        </TabPanel>
      </Tabs>
    </Workspace>
  );
}
