import React from "react";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../hooks/useSecureAxios";
import { Helmet } from "react-helmet-async";
import Payment from "../interfaces/Payment";

const PaymentHistory: React.FC = () => {
  const { user } = useAuth();
  const secureAxios = useSecureAxios();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () =>
      secureAxios.get(`/payments?email=${user?.email}`).then((res) => res.data),
  });
  return (
    <>
      <Helmet>
        <title>Cafe Gratitude | Payment History</title>
      </Helmet>
      <div className="container mx-auto px-4">
        <div className="mt-12">
          <p className="text-2xl uppercase text-center font-semibold">
            Total Payments: {payments.length}
          </p>
        </div>
        <div className="mt-12">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Price</th>
                  <th>Transaction ID</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {payments.map((payment: Payment, index: number) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td className="font-bold text-red-600">${payment.price}</td>
                    <td className="font-bold text-green-600">
                      {payment.transactionID}
                    </td>
                    <td className="font-bold">{payment.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentHistory;
