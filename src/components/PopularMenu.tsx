import { useEffect, useState } from "react";
import PageTitle from "./PageTitle";
import MenuCard from "./MenuCard";

interface Menu {
  _id: string;
  name: string;
  recipe: string;
  image: string;
  category: string;
  price: number;
}

const PopularMenu = () => {
  const [menu, setMenu] = useState(Array<Menu>);
  console.log(menu);
  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((menu) => {
        setMenu(
          menu.filter((singleMenu: Menu) => singleMenu.category === "popular"),
        );
      });
  }, []);
  return (
    <div>
      <PageTitle heading="From Our Menu" subHeading="Popular Items" />
      <div className="grid md:grid-cols-2 gap-8 container mx-auto px-4 mb-32">
        {menu.map((item, index) => (
          <MenuCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default PopularMenu;
