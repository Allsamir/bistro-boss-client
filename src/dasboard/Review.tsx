import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import PageTitle from "../components/PageTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import useSecureAxios from "../hooks/useSecureAxios";
import { FaRocket } from "react-icons/fa6";
import useAuth from "../hooks/useAuth";
import { Rate } from "antd";
import Swal from "sweetalert2";
type IFormInput = {
  name: string;
  details: string;
  rating: number;
};
const Review: React.FC = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const secureAxios = useSecureAxios();
  const { user } = useAuth();
  const [rating, setRating] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<IFormInput> = (data, event) => {
    const { name, details } = data;
    secureAxios
      .post(`/reviews`, { name, details, rating: rating })
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: `${res.data.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
          event?.target.reset();
          setLoading(false);
        }
      })
      .catch((err) => console.error(err));
  };
  console.log(rating);
  return (
    <>
      <Helmet>
        <title>Bistro Boss | Review</title>
      </Helmet>
      <div className="container mx-auto px-4">
        <PageTitle
          subHeading="Sharing is Caring!!"
          heading="Give a review"
        ></PageTitle>
        <div className="bg-slate-100 p-16">
          <p className="text-center text-2xl md:text-4xl uppercase italic">
            Rate Us!
          </p>
          <div className="my-4 mt-12 text-center">
            <Rate className="text-4xl" onChange={(value) => setRating(value)} />
          </div>
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black text-lg font-semibold">
                  Name*
                </span>
              </label>
              <input
                type="text"
                placeholder="Recipe Name"
                className="input input-bordered"
                value={user?.displayName || ""}
                required
                {...register("name")}
                readOnly
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black text-lg font-semibold">
                  Details*
                </span>
              </label>
              <textarea
                className="textarea"
                placeholder="Recipe Details"
                {...register("details")}
                rows={10}
              ></textarea>
            </div>
            <div className="form-control mt-6">
              <button
                className="btn btn-outline uppercase"
                type="submit"
                onClick={() => setLoading(true)}
              >
                Add Review <FaRocket></FaRocket>{" "}
                {loading && (
                  <span className="loading loading-spinner loading-xs"></span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Review;
