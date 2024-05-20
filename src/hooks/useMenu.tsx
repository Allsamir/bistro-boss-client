import { useEffect, useState } from "react";
import Menu from "../interfaces/Menu";
import useSecureAxios from "./useSecureAxios";

const useMenu = (category: string) => {
  const [menu, setMenu] = useState(Array<Menu>);
  const [loading, setLoading] = useState<boolean>(true);
  const secureAxios = useSecureAxios();
  useEffect(() => {
    secureAxios("/menus")
      .then((res) => {
        setMenu(res.data.filter((items: Menu) => items.category === category)),
          setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [category, loading, secureAxios]);
  return { menu, loading };
};

export default useMenu;
