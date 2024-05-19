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
  const desserts = useMenu("dessert");
  const pizza = useMenu("pizza");
  console.log(pizza);
  const soup = useMenu("soup");
  const salad = useMenu("salad");
  const offered = useMenu("offered");
  return (
    <>
      <Helmet>
        <title>Bistro Boss | Menu</title>
      </Helmet>
      <PageCover img={coverImg} title="Our Menu" />
      <PageTitle
        subHeading="Don't miss today's offer"
        heading="Today's offer"
      />
      <MenuCategory items={offered} />
      {/* Desserts */}
      <PageCover img={dessetImg} title="Desserts" />
      <MenuCategory items={desserts} />
      {/* Pizzas */}
      <PageCover img={pizzaImg} title="Pizzas" />
      <MenuCategory items={pizza} />
      {/* Soup */}
      <PageCover img={soupImg} title="Soup" />
      <MenuCategory items={soup} />
      {/* Salads */}
      <PageCover img={saladImg} title="Salad" />
      <MenuCategory items={salad} />
    </>
  );
};

export default Menu;
