import React from "react";
import useCart from "../hooks/useCart";
import Menu from "../interfaces/Menu";
import { Helmet } from "react-helmet-async";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import useSecureAxios from "../hooks/useSecureAxios";
import useAuth from "../hooks/useAuth";
import { queryClient } from "../main";
import { Link } from "react-router-dom";
const Cart: React.FC = () => {
  const cartItems = useCart();
  const { user } = useAuth();
  const secureAxios = useSecureAxios();
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        secureAxios
          .patch(`/carts?id=${id}&email=${user?.email}`)
          .then((res) => {
            queryClient.invalidateQueries({ queryKey: ["cart", user?.email] });
            Swal.fire({
              title: `Deleted!`,
              text: `${res.data.message}`,
              icon: "success",
            });
          })
          .catch((err) => console.error(err));
      }
    });
  };
  return (
    <>
      <Helmet>
        <title>Bistro Boss | Cart</title>
      </Helmet>
      <div className="container mx-auto px-4 mt-12">
        <div className="flex justify-evenly items-center">
          <div className="uppercase">
            <p className="lg:text-2xl text-base font-semibold">
              Total Orders: {cartItems?.length}
            </p>
          </div>
          <div className="uppercase">
            <p className="lg:text-2xl text-base font-semibold">
              Total Price:{" "}
              {cartItems.reduce((accumulator: number, currentValue: Menu) => {
                return accumulator + currentValue.price;
              }, 0)}
            </p>
          </div>
          <div>
            <button
              className="btn btn-outline text-white uppercase bg-yellow-500"
              disabled={cartItems.length > 0 ? false : true}
            >
              <Link to={`/dashboard/reservation`}>Pay</Link>
            </button>
          </div>
        </div>
        <div className="mt-12">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {cartItems.map((item: Menu, index: number) => (
                  <tr key={index}>
                    <th>
                      <p className="font-bold">{index + 1}</p>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-24 h-24">
                            <img src={item.image} alt={item.name} />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="font-bold">{item.name}</p>
                    </td>
                    <td>
                      <p className="font-bold">${item.price}</p>
                    </td>
                    <th>
                      <button
                        className="btn btn-ghost text-3xl"
                        onClick={() => handleDelete(item._id)}
                      >
                        <AiFillDelete className="text-red-600" />
                      </button>
                    </th>
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

export default Cart;
