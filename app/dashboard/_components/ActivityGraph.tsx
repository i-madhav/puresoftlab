import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface ChartDataProp {
  month: string;
  value: number;
}

const ActivityGraph = ({ chartData }: { chartData: ChartDataProp[] }) => {
  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} barSize={12}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="1" x2="0" y2="2">
              <stop offset="48.49%" stopColor="rgba(27,89,248,0.80)" />
              <stop offset="282.14%" stopColor="rgba(27,89,248,0.00)" />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Bar
            dataKey="value"
            radius={[50, 50, 50, 50]}
            fill="url(#barGradient)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityGraph;
