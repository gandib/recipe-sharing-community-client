"use client";

import { IUser } from "@/src/types";
import moment from "moment";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const LineChartComponent = ({ data }: { data: { data: IUser[] } }) => {
  const datas = data?.data?.map((user: IUser) => ({
    date: user.name,
    amount: user.follower.length,
  }));

  return (
    <div>
      <LineChart
        width={400}
        height={350}
        data={datas}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="amount" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default LineChartComponent;
