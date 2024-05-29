import React from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../hooks/useSecureAxios";
import { FaSackDollar } from "react-icons/fa6";
import { PiUsersThreeFill } from "react-icons/pi";
import { MdRestaurantMenu } from "react-icons/md";
import { FcPositiveDynamic } from "react-icons/fc";

const Home: React.FC = () => {
  const { user } = useAuth();
  const secureAxios = useSecureAxios();
  const { data: appData } = useQuery({
    queryKey: ["app-stats"],
    queryFn: async () => (await secureAxios.get(`/app-stats`)).data,
  });
  return (
    <>
      <Helmet>
        <title>Bistro Boss | Admin Home</title>
      </Helmet>
      <h2 className="text-3xl uppercase font-bold text-center mt-12">
        <span>Hi, Welcome</span> {user ? user.displayName : "Back"}
      </h2>
      <div className="mt-12 text-center">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaSackDollar className="text-4xl" />
            </div>
            <div className="stat-title">Revenue</div>
            <div className="stat-value">${appData.revenue}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <PiUsersThreeFill className="text-4xl" />
            </div>
            <div className="stat-title">Total Users</div>
            <div className="stat-value">{appData.users}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <MdRestaurantMenu className="text-4xl" />
            </div>
            <div className="stat-title">Menus</div>
            <div className="stat-value">{appData.menus}</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FcPositiveDynamic className="text-4xl" />
            </div>
            <div className="stat-title">Orders</div>
            <div className="stat-value">{appData.orders}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
