import React from "react";
import { ParallaxBanner } from "react-scroll-parallax";
interface ChildProps {
  img: string;
  title: string;
}

const PageCover: React.FC<ChildProps> = ({ img, title }) => {
  return (
    <ParallaxBanner
      layers={[
        { image: img, speed: -20 },
        {
          speed: -15,
          children: (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h1 className="mb-5 text-6xl font-bold uppercase text-white">
                {title}
              </h1>
              <p className="mb-5 text-white">
                The best menu you can ever get in this town. Check our menu to
                select the best recipe in the town.
              </p>
            </div>
          ),
        },
      ]}
      className="aspect-[2/1]"
    />
  );
};

export default PageCover;
