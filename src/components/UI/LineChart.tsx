"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IUser } from "@/src/types";

const LineChartComponent = ({ data }: { data: { data: IUser[] } }) => {
  const datas = data?.data?.map((user: IUser) => ({
    date: user.name,
    amount: user.follower.length,
  }));

  return (
    <div>
      <LineChart
        data={datas}
        height={350}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        width={400}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line dataKey="amount" stroke="#8884d8" type="monotone" />
      </LineChart>
    </div>
  );
};

export default LineChartComponent;
