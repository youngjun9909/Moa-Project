import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { CategoricalChartFunc } from "recharts/types/chart/generateCategoricalChart";

interface voteAnswerChartProps {
  data: {
    voteAnswer: string;
    count: number;
    ratio: number;
  }[];
}

const COLORS = ["#118ffd", "#f718187e"];

const VoteAnswerChartComponent: React.FC<voteAnswerChartProps> = ({ data }) => {
  const onPieEnter: CategoricalChartFunc = (nextState, event) => {
    console.log("Next state:", nextState);
    console.log("Event:", event);
  };

  return (
    <PieChart width={400} height={200} onMouseEnter={onPieEnter}>
      <Pie
        data={data}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="count"
      >
        {data.map((_entry: any, index: number) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default VoteAnswerChartComponent;
