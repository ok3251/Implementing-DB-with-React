import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

function MainGraph({ data }) {
  return (
    <LineChart
      width={400}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="매출" stroke="coral" strokeWidth={2} activeDot={{ r: 8 }} />
      {/* strokeWidth 값을 조정하여 선의 굵기를 변경 */}
    </LineChart>
  );
}

export default MainGraph;
