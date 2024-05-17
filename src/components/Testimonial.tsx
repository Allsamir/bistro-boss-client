import React, { useEffect, useState } from "react";
import PageTitle from "./PageTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./slider.css";
import { Rate } from "antd";
interface Reviews {
  _id: string;
  name: string;
  details: string;
  rating: number;
}

const Testimonial: React.FC = () => {
  const [reviews, setReviews] = useState(Array<Reviews>);
  console.log(reviews);
  useEffect(() => {
    fetch("reviews.json")
      .then((res) => res.json())
      .then((reviews) => setReviews(reviews));
  }, []);
  return (
    <div>
      <PageTitle subHeading="What Our Client Say" heading="Testimonials" />
      <div className="lg:w-4/5 mx-auto mb-32">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="mx-8 my-12 space-y-12">
                <Rate disabled defaultValue={review.rating} />
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
