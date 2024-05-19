import PageTitle from "./PageTitle";
import MenuCard from "./MenuCard";
import useMenu from "../hooks/useMenu";

const PopularMenu = () => {
  const popularMenu = useMenu("popular");
  return (
    <div>
      <PageTitle heading="From Our Menu" subHeading="Popular Items" />
      <div className="grid md:grid-cols-2 gap-8 container mx-auto px-4 mb-32">
        {popularMenu.map((item, index) => (
          <MenuCard key={index} item={item} />
        ))}
      </div>
      <div
        className="text-center
        mb-12
      "
      >
        <button className="btn btn-outline uppercase">View Our Menu</button>
      </div>
    </div>
  );
};

export default PopularMenu;
