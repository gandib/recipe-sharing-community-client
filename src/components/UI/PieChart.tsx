"use client";

import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { IRecipe, TRecipeMeta } from "@/src/types";

const PieCharts = ({ data }: { data: TRecipeMeta }) => {
  const datas = data?.result?.map((recipe: IRecipe) => ({
    name: recipe.title,
    value: recipe.upvote.length,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div>
      <PieChart height={350} width={350}>
        <Pie
          label
          cx="50%"
          cy="50%"
          data={datas}
          dataKey="value"
          fill="#8884d8"
          nameKey="name"
          outerRadius={100}
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
