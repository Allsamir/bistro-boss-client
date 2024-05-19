import React from "react";
import MenuCard from "./MenuCard";
import Menu from "../interfaces/Menu";
interface ChildProps {
  items: Menu[];
}

const MenuCategory: React.FC<ChildProps> = ({ items }) => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-8 container mx-auto px-4 my-32">
        {items.map((item, index) => (
          <MenuCard key={index} item={item} />
        ))}
      </div>
    </>
  );
};

export default MenuCategory;
