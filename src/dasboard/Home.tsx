import React from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../hooks/useSecureAxios";
import { MdAccountBalanceWallet } from "react-icons/md";
import { FaCartShopping, FaStar } from "react-icons/fa6";

const Home: React.FC = () => {
  const { user } = useAuth();
  const secureAxios = useSecureAxios();
  const { data: userStats } = useQuery({
    queryKey: ["user-stats"],
    queryFn: async () =>
      (
        await secureAxios.get(
          `/user-stats?email=${user?.email}&name=${user?.displayName}`,
        )
      ).data,
  });
  return (
    <>
      <Helmet>
        <title>Bistro Boss | User Home</title>
      </Helmet>
      <h2 className="text-3xl uppercase font-bold text-center my-12">
        <span>Hi, Welcome</span> {user ? user.displayName : "Back"}
      </h2>
      <div className="flex md:flex-row flex-col gap-4">
        <div className="bg-[#FFEDD5] flex flex-col justify-center items-center py-12 flex-1">
          <img
            src={user?.photoURL || ""}
            alt={user?.displayName || ""}
            className="w-56 rounded-full border-4 border-[#D1A054]"
          />
          <p className="text-xl md:text-2xl mt-4 font-semibold">
            {user?.email}
          </p>
        </div>
        <div className="flex-1 bg-[#FEF9C3] p-12">
          <p className="text-2xl md:text-3xl mt-4 font-semibold uppercase">
            Your Activities
          </p>
          <ul className="mt-4">
            <li className="text-[#FF8042] uppercase text-base">
              <MdAccountBalanceWallet className="inline" /> Payment:{" "}
              {userStats?.payments}
            </li>
            <li className="text-[#0088FE] uppercase text-base">
              <FaCartShopping className="inline" /> Orders: {userStats?.orders}
            </li>
            <li className="text-[#00C4A1] uppercase text-base">
              <FaStar className="inline" /> Reviews: {userStats?.reviews}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
