import { Helmet } from "react-helmet-async";
import PageCover from "../components/PageCover";
import coverImg from "../assets/menu/banner3.jpg";
import useMenu from "../hooks/useMenu";
import PageTitle from "../components/PageTitle";
import MenuCategory from "../components/MenuCategory";
import dessetImg from "../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../assets/menu/pizza-bg.jpg";
import soupImg from "../assets/menu/soup-bg.jpg";
import saladImg from "../assets/menu/salad-bg.jpg";
const Menu = () => {
  const { menu: desserts } = useMenu("dessert");
  const { menu: pizza } = useMenu("pizza");
  const { menu: soup } = useMenu("soup");
  const { menu: salad } = useMenu("salad");
  const { menu: offered } = useMenu("offered");
  return (
    <>
      <Helmet>
        <title>Cafe Gratitude | Menu</title>
      </Helmet>
      <PageCover img={coverImg} title="Our Menu" />
      <PageTitle
        subHeading="Don't miss today's offer"
        heading="Today's offer"
      />
      <MenuCategory items={offered} />
      {/* Desserts */}
      <PageCover img={dessetImg} title="Desserts" />
      <MenuCategory items={desserts} title="dessert" />
      {/* Pizzas */}
      <PageCover img={pizzaImg} title="Pizzas" />
      <MenuCategory items={pizza} title="pizza" />
      {/* Soup */}
      <PageCover img={soupImg} title="Soup" />
      <MenuCategory items={soup} title="soup" />
      {/* Salads */}
      <PageCover img={saladImg} title="Salad" />
      <MenuCategory items={salad} title="salad" />
    </>
  );
};

export default Menu;
