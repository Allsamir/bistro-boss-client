import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";
import useSecureAxios from "../hooks/useSecureAxios";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import Menu from "../interfaces/Menu";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null || "");
  const [sucessfullyPayment, setSuccessfullPayment] = useState(false);
  const [isPending, setPending] = useState(false);
  const secureAxios = useSecureAxios();
  const carts = useCart();
  const totalPrice = carts.reduce((accumulator: number, currentValue: Menu) => {
    return accumulator + currentValue.price;
  }, 0);
  const { user } = useAuth();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setPending(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard/payment-completion`,
      },
      redirect: "if_required",
    });
    if (error) {
      setMessage(error.message || "");
    } else if (paymentIntent.status === "succeeded") {
      setMessage(
        "Payment status: " +
          paymentIntent.status +
          "🎉. Your transaction id: " +
          paymentIntent.id,
      );
      setSuccessfullPayment(true);
      const paymentInfo = {
        email: user?.email,
        name: user?.displayName,
        price: totalPrice,
        transactionID: paymentIntent.id,
        time: new Date(), // utc data convert. use moment.js to convert to local date time
        order: carts.map((cartItems: Menu) => cartItems._id),
        status: "pending",
      };
      const res = await secureAxios.post(`/payments`, {
        paymentInfo: paymentInfo,
      });
      console.log(res.data, "Payment send");
    } else {
      setMessage("Unexpected status");
    }
    setPending(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        type="submit"
        className="btn btn-outline mt-8"
        disabled={isPending}
      >
        {isPending ? "Pending" : "Pay Now"}
      </button>
      {message && (
        <p
          className={`mt-4 ${
            sucessfullyPayment ? "text-green-600" : "text-red-700"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
