import React from "react";

interface ChildProps {
  item: {
    _id: string;
    name: string;
    recipe: string;
    image: string;
    category: string;
    price: number;
  };
}

const MenuCard: React.FC<ChildProps> = ({ item }) => {
  return (
    <div className="flex gap-8">
      <img
        style={{ borderRadius: "0 200px 200px 200px" }}
        src={item.image}
        className="w-32"
        alt={item.name}
      />
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">{item.name}------------</h3>
        <p>{item.recipe}</p>
      </div>
      <p className="text-yellow-600">${item.price}</p>
    </div>
  );
};

export default MenuCard;
