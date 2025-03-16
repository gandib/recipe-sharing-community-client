"use client";

import { IRecipe, TRecipeMeta } from "@/src/types";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

const PieCharts = ({ data }: { data: TRecipeMeta }) => {
  const datas = data?.result?.map((recipe: IRecipe) => ({
    name: recipe.title,
    value: recipe.upvote.length,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div>
      <PieChart width={350} height={350}>
        <Pie
          data={datas}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data?.result?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default PieCharts;
