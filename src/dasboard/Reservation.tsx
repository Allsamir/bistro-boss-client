import React from "react";
import { Helmet } from "react-helmet-async";
import PageTitle from "../components/PageTitle";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_PK_STRIP);
import { StripeElementsOptions } from "@stripe/stripe-js";
const options: StripeElementsOptions = {
  mode: "payment",
  amount: 1099,
  currency: "usd",
};

const Reservation: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Bistro Boss | Reservation</title>
      </Helmet>
      <PageTitle heading="Payment" subHeading="Please Pay First"></PageTitle>
      <div className="container mx-auto px-4">
        <div className="w-full lg:w-1/2 md:w-4/5 mx-auto">
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </>
  );
};

export default Reservation;
