import React from "react";
import orderCoverImg from "../assets/shop/banner2.jpg";
import PageCover from "../components/PageCover";
const Order: React.FC = () => {
  return (
    <>
      <PageCover img={orderCoverImg} title="Order Food" />
    </>
  );
};

export default Order;
