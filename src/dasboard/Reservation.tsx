import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import PageTitle from "../components/PageTitle";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_PK_STRIP);
import useCart from "../hooks/useCart";
import Menu from "../interfaces/Menu";
import useSecureAxios from "../hooks/useSecureAxios";

const Reservation: React.FC = () => {
  const carts = useCart();
  const secureAxios = useSecureAxios();
  const totalPrice = carts.reduce((accumulator: number, currentValue: Menu) => {
    return accumulator + currentValue.price;
  }, 0);
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const res = await secureAxios.post(`/create-payment-intent`, {
          price: totalPrice * 100,
        });
        const { clientSecret } = res.data;
        setClientSecret(clientSecret);
      } catch (err) {
        console.error(err);
      }
    };
    if (totalPrice > 0) {
      fetchClientSecret();
    }
  }, [secureAxios, totalPrice]);
  return (
    <>
      <Helmet>
        <title>Cafe Gratitude | Reservation</title>
      </Helmet>
      <PageTitle heading="Payment" subHeading="Please Pay First"></PageTitle>
      <h2 className="text-2xl text-center font-semibold mb-20">
        Total Amount: ${totalPrice}
      </h2>
      <div className="container mx-auto px-4">
        <div className="w-full lg:w-1/2 md:w-4/5 mx-auto mb-24">
          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
      </div>
    </>
  );
};

export default Reservation;
