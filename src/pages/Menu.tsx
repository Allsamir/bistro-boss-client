import { Helmet } from "react-helmet-async";
import PageCover from "../components/PageCover";
import coverImg from "../assets/menu/banner3.jpg";
import PopularMenu from "../components/PopularMenu";
const Menu = () => {
  return (
    <>
      <Helmet>
        <title>Bistro Boss | Menu</title>
      </Helmet>
      <PageCover img={coverImg} title="Our Menu" />
      <PopularMenu />
      <PageCover img={coverImg} title="Our Menu" />
      <PopularMenu />
      <PageCover img={coverImg} title="Our Menu" />
      <PopularMenu />
    </>
  );
};

export default Menu;
