import React from "react";
import MenuCard from "./MenuCard";
import Menu from "../interfaces/Menu";
import { Link } from "react-router-dom";
interface ChildProps {
  items: Menu[];
  title?: string;
}

const MenuCategory: React.FC<ChildProps> = ({ items, title }) => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-8 container mx-auto px-4 my-32">
        {items.map((item, index) => (
          <MenuCard key={index} item={item} />
        ))}
      </div>
      <div className="text-center mb-12">
        <Link
          to={`/order/${title === undefined ? "salad" : title}`}
          className="btn btn-outline border-0 border-b-4"
        >
          Order Now
        </Link>
      </div>
    </>
  );
};

export default MenuCategory;
