/** @jsxImportSource @emotion/react */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import {
  GetGenderChartResponseDto,
  GetQuarterCharResponseDto,
} from "../../../types/dto/response.dto";
import { AllBox, GenderChartBox, QuartChartName, QuarterBox } from "./style";
import GenderChartComponent from "./GenderChartComponent";
import QuarterChartComponent from "./QuarterChartComponent";
import { GENDER_CHART_GET_API, USER_CHART_API } from "../../../apis";
import { EmptyState } from "../../../components/ui/EmptyState";

interface ChartProps {
  parseToNumGroupId: number;
}

const Chart: React.FC<ChartProps> = ({ parseToNumGroupId }) => {
  const [genderChart, setGenderChart] = useState<GetGenderChartResponseDto[]>(
    []
  );
  const [quarterChart, setQuarterChart] = useState<GetQuarterCharResponseDto[]>(
    []
  );
  const { groupId } = useParams();
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    fetchGenderChart();
    fetchUserChart();
  }, [groupId, cookies.token]);

  const fetchGenderChart = async () => {
    if (cookies.token) {
      try {
        const response = await axios.get(
          `${GENDER_CHART_GET_API}${parseToNumGroupId}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          }
        );
        const responseData = response.data.data;
        setGenderChart(responseData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchUserChart = async () => {
    if (cookies.token) {
      try {
        const response = await axios.get(
          `${USER_CHART_API}${parseToNumGroupId}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          }
        );
        const responseData = response.data.data;
        setQuarterChart(responseData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div css={AllBox}>
      <div css={GenderChartBox}>
        <h1>멤버 구성</h1>
        {genderChart.length ? <><GenderChartComponent data={genderChart} /><div>
          <div>남성 : 💙</div>
          <div>여성 : 🍎 </div>
        </div></> : <EmptyState title="표시할 통계가 없어요" description="멤버 통계가 준비되면 이곳에서 확인할 수 있어요." />}
      </div>
      <div css={QuarterBox}>
        <h1 css={QuartChartName}>분기별 참여 현황</h1>
        {quarterChart.length ? <QuarterChartComponent data={quarterChart} /> : <EmptyState title="아직 표시할 기록이 없어요" description="모임의 참여 기록을 분기별로 확인할 수 있어요." />}
      </div>
    </div>
  );
};
export default Chart;
