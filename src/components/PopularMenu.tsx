import { useEffect, useState } from "react";
import PageTitle from "./PageTitle";

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
    </div>
  );
};

export default PopularMenu;
