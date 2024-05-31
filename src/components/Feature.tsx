import PageTitle from "./PageTitle";
import featuredImg from "../assets/home/featured.jpg";
import "./slider.css";
const Feature = () => {
  return (
    <div
      style={{ backgroundImage: `url("${featuredImg}")` }}
      className="bg-no-repeat bg-center bg-cover text-white bg-fixed"
    >
      <div
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        className="pb-24 pt-4"
      >
        <PageTitle heading="Featured Items" subHeading="Check it out" />
        <div className="md:flex justify-center items-center gap-12 px-4">
          <div>
            <img src={featuredImg} alt="" />
          </div>
          <div className="text-white space-y-4">
            <p>30 Aug, {new Date().getFullYear()}</p>
            <p className="text-xl uppercase">Where can I get some ?</p>
            <p className="">
              You can get some food in the kitchen but now you are in my
              restaurent so we can get food any where so please take any food
              and start eating quickly today or we can miss all of the foods in
              my restaurent so hurry eat as much as you can there is no boundary
              to eating food today
            </p>
            <button className="btn btn-outline text-white uppercase">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
