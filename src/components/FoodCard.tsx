import React from "react";
import Menu from "../interfaces/Menu";
import useAuth from "../hooks/useAuth";
import useSecureAxios from "../hooks/useSecureAxios";
import Swal from "sweetalert2";
import { queryClient } from "../main";
interface ChildProps {
  item: Menu;
}

const FoodCard: React.FC<ChildProps> = ({ item }) => {
  const { user } = useAuth();
  const secureAxios = useSecureAxios();
  const handleAddtoCart = (id: string) => {
    if (user) {
      const cartData = {
        email: user.email,
        cartItems: id,
      };
      secureAxios
        .post(`/carts`, cartData)
        .then((res) => {
          queryClient.invalidateQueries({ queryKey: ["cart", user?.email] });
          Swal.fire({
            title: `${item.name} added to your cart`,
            text: `${res.data?.message}`,
            icon: "success",
            confirmButtonText: "Close",
          });
        })
        .catch((err) => console.error(err));
    }
  };
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={item.image} alt={item.name} className="w-full" />
        <p className="absolute bg-black text-white top-4 right-4 p-1">
          ${item.price}
        </p>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.name}</h2>
        <p>{item.recipe}</p>
        <div className="card-actions justify-start mt-4">
          <button
            className="btn btn-outline border-0 border-b-4 uppercase text-yellow-500"
            onClick={() => handleAddtoCart(item._id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
