import React from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../hooks/useAuth";

const Home: React.FC = () => {
  const { user } = useAuth();
  return (
    <>
      <Helmet>
        <title>Bistro Boss | User Home</title>
      </Helmet>
      <h2 className="text-3xl uppercase font-bold">
        <span>Hi, Welcome</span> {user ? user.displayName : "Back"}
      </h2>
    </>
  );
};

export default Home;
