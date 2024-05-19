import React from "react";
import Menu from "../interfaces/Menu";
interface ChildProps {
  item: Menu;
}

const FoodCard: React.FC<ChildProps> = ({ item }) => {
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
          <button className="btn btn-outline uppercase">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
