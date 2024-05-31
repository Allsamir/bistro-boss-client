import React, { useEffect, useState } from "react";
import PageTitle from "./PageTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./slider.css";
import { Rate } from "antd";
import { RiDoubleQuotesL } from "react-icons/ri";
import useSecureAxios from "../hooks/useSecureAxios";
interface Reviews {
  _id: string;
  name: string;
  details: string;
  rating: number;
}

const Testimonial: React.FC = () => {
  const [reviews, setReviews] = useState<Reviews[]>([]);
  const secureAxios = useSecureAxios();
  useEffect(() => {
    secureAxios.get("/reviews").then((res) => setReviews(res.data));
  }, [secureAxios]);
  return (
    <div>
      <PageTitle subHeading="What Our Client Say" heading="Testimonials" />
      <div className="lg:w-4/5 mx-auto mb-32">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className=" my-12 space-y-12">
                <Rate disabled defaultValue={review.rating} />
                <div className="">
                  {" "}
                  <RiDoubleQuotesL className="text-8xl mx-auto" />
                </div>
                <p className="w-4/5 mx-auto">{review.details}</p>
                <h1 className="text-center text-3xl text-yellow-600">
                  {review.name}
                </h1>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
