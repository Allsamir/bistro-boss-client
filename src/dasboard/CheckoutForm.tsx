import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null || "");
  const [isPending, setPending] = useState(false);
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
      setMessage("Payment status: " + paymentIntent.status + "🎉");
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
        className="btn btn-outline mt-4"
        disabled={isPending}
      >
        {isPending ? "Pending" : "Pay Now"}
      </button>
      {message && <p className="mt-4">{message}</p>}
    </form>
  );
};

export default CheckoutForm;
