import Banner from "../components/Banner";
import Feature from "../components/Feature";
import PopularMenu from "../components/PopularMenu";
import Slider from "../components/Slider";
import Testimonial from "../components/Testimonial";

const Home = () => {
  return (
    <div>
      <Banner />
      <Slider />
      <PopularMenu />
      <Feature />
      <Testimonial />
    </div>
  );
};

export default Home;
