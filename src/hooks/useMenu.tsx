import { useEffect, useState } from "react";
import Menu from "../interfaces/Menu";

const useMenu = (category: string) => {
  const [menu, setMenu] = useState(Array<Menu>);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((menu) => {
        setMenu(menu.filter((items: Menu) => items.category === category)),
          setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [category, loading]);
  return menu;
};

export default useMenu;
