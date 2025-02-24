import * as React from "react";
import styled from "@emotion/styled";
import {
  Tab as BaseTab,
  TabsList as BaseTabsList,
  TabPanel as BaseTabPanel,
  tabClasses,
  buttonClasses,
} from "@mui/base";
import { createTheme, ThemeProvider, Theme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Tabs } from "@mui/base/Tabs";
import ManagerHome from "./manager-home/ManagerHome";

import { useParams } from "react-router-dom";
import BlackList from "./black-list/BlackList";
import Chart from "./chart/Chart";
import Vote from "./vote/Vote";
import Report from "./report/Report";
import Approved from "./approved/approved";
import GroupUpdate from "./group-update/GroupUpdate";


const Tab = styled(BaseTab)`
  font-family: "IBM Plex Sans", sans-serif;
  color: #000;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  background-color: #fff;
  width: 100%;
  padding: 10px 12px;
  margin: 10px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: space-evenly;

  &:hover {
    background-color: #f7ac57;
  }

  &:focus {
    color: #000;
    outline: 3px solid ${grey[200]};
  }

  &.${tabClasses.selected} {
    background-color: #f7ac57;
    color: ${grey[600]};
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
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 16px;
  padding: 20px 12px;
  ackground: ${theme.palette.mode === "dark" ? grey[900] : "#000"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[50]};
  border-radius: 12px;
  opacity: 0.6;
  `
);

const TabsList = styled(BaseTabsList)<{ theme?: Theme }>(
  ({ theme }) => `
  min-width: 400px;
  background-color: ${grey[50]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  place-content: space-between center;
  box-shadow: 0 4px 30px ${
    theme.palette.mode === "dark" ? grey[900] : grey[200]
  };
  `
);


export default function Index() {
  const { groupId } = useParams();

  const parseToNumGroupId = Number(groupId);

  return (
    <div>
      <Tabs defaultValue={0}>
        <TabsList>
          <Tab value={0}>유저</Tab>
          <Tab value={1}>차트</Tab>
          <Tab value={2}>투표</Tab>
          <Tab value={3}>블랙</Tab>
          <Tab value={4}>신고</Tab>
          <Tab value={5}>승인</Tab>
          <Tab value={6}>수정</Tab>
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
    </div>
  );
}
