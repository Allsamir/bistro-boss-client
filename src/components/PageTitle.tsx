import React from "react";
interface ChildProps {
  heading: string;
  subHeading: string;
}

const PageTitle: React.FC<ChildProps> = ({ heading, subHeading }) => {
  return (
    <div className="text-center md:w-4/12 my-36 mx-auto">
      <p className="text-yellow-600 mb-2">--- {subHeading} ---</p>
      <h1 className="text-4xl border-y-4 py-4 uppercase">{heading}</h1>
    </div>
  );
};
export default PageTitle;
