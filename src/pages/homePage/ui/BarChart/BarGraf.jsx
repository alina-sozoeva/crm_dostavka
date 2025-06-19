import { Flex, Tooltip } from "antd";
import clsx from "clsx";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
  },
  {
    name: "Page K",
    uv: 5490,
    pv: 7300,
  },
  {
    name: "Page L",
    uv: 1490,
    pv: 9300,
  },
];

export const BarGraf = () => {
  return (
    <div className="flex flex-col h-[35vh] min-h-[250px] w-full">
      <h3 className={clsx("text-xl font-bold mb-2")}>Аналитика отгрузок</h3>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#a3bffa" />
            <Bar dataKey="uv" fill="#8fbce6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
