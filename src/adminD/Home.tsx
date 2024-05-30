import React from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../hooks/useSecureAxios";
import { FaSackDollar } from "react-icons/fa6";
import { PiUsersThreeFill } from "react-icons/pi";
import { MdRestaurantMenu } from "react-icons/md";
import { FcPositiveDynamic } from "react-icons/fc";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  BarProps,
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
} from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const getPath = (
  x: number,
  y: number,
  width: number,
  height: number,
): string => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const TriangleBar: React.FC<BarProps> = (props) => {
  const { fill, x, y, width, height } = props;

  if (
    typeof x !== "number" ||
    typeof y !== "number" ||
    typeof width !== "number" ||
    typeof height !== "number"
  ) {
    // If any of the props are not numbers, return null to avoid rendering
    return null;
  }

  return (
    <path
      d={getPath(x, y, width, height)}
      stroke="none"
      fill={fill as string}
    />
  );
};

interface AppData {
  revenue: number;
  users: number;
  menus: number;
  orders: number;
}

interface OrderData {
  category: string;
  quantity: number;
  _id: string;
}
interface PieProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}
const RADIAN = Math.PI / 180;
const renderCustomizedLabel: React.FC<PieProps> = (props) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Home: React.FC = () => {
  const { user } = useAuth();
  const secureAxios = useSecureAxios();

  const { data: appData } = useQuery<AppData>({
    queryKey: ["app-stats"],
    queryFn: async () => (await secureAxios.get(`/app-stats`)).data,
  });

  const { data: orderData = [] } = useQuery<OrderData[]>({
    queryKey: ["order-stats"],
    queryFn: async () => (await secureAxios.get(`/order-stats`)).data,
  });

  const data = orderData.map((order: OrderData) => {
    return {
      name: order.category,
      value: order.quantity,
    };
  });

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Admin Home</title>
      </Helmet>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl uppercase font-bold text-center mt-12">
          <span>Hi, Welcome</span> {user ? user.displayName : "Back"}
        </h2>
        <div className="mt-12 text-center">
          <div className="stats shadow flex md:flex-row flex-col lg:w-1/2 md:w-4/5 w-full mx-auto">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <FaSackDollar className="text-4xl" />
              </div>
              <div className="stat-title">Revenue</div>
              <div className="stat-value">${appData?.revenue}</div>
            </div>
            <div className="stat">
              <div className="stat-figure text-secondary">
                <PiUsersThreeFill className="text-4xl" />
              </div>
              <div className="stat-title">Total Users</div>
              <div className="stat-value">{appData?.users}</div>
            </div>
            <div className="stat">
              <div className="stat-figure text-secondary">
                <MdRestaurantMenu className="text-4xl" />
              </div>
              <div className="stat-title">Menus</div>
              <div className="stat-value">{appData?.menus}</div>
            </div>
            <div className="stat">
              <div className="stat-figure text-secondary">
                <FcPositiveDynamic className="text-4xl" />
              </div>
              <div className="stat-title">Orders</div>
              <div className="stat-value">{appData?.orders}</div>
            </div>
          </div>
        </div>
        <div className="mt-12 flex md:flex-row flex-col mx-auto">
          <div className="md:w-1/2 w-full">
            <ResponsiveContainer
              width={"100%"}
              minWidth={"100%"}
              minHeight={400}
              height="80%"
            >
              <BarChart
                data={orderData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Bar
                  dataKey="quantity"
                  fill="#8884d8"
                  shape={<TriangleBar dataKey={"quantity"} />}
                  label={{ position: "top" }}
                >
                  {orderData.map((_, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="md:w-1/2 w-full">
            <ResponsiveContainer
              width={"100%"}
              minWidth={"100%"}
              minHeight={400}
              height="80%"
            >
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((_, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend></Legend>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Home;
