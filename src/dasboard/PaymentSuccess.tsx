import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const PaymentSuccess: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Cafe Gratitude | SSL Commerce </title>
      </Helmet>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-2xl md:text-4xl mb-12">
          Thank you, Payment Successfully Done 🎉
        </h1>
        <Link to={`/dashboard/cart`}>
          <button className="btn btn-outline uppercase">Cart</button>
        </Link>
      </div>
    </>
  );
};

export default PaymentSuccess;
