import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import PageTitle from "../components/PageTitle";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import usePublicAxios from "../hooks/usePublicAxios";
import { useForm, SubmitHandler } from "react-hook-form";
import useSecureAxios from "../hooks/useSecureAxios";
import { FaUtensils } from "react-icons/fa6";
import Menu from "../interfaces/Menu";
enum GenderEnum {
  salad = "salad",
  pizza = "pizza",
  soup = "soup",
  dessert = "dessert",
  drinks = "drinks",
}
type IFormInput = {
  name: string;
  category: GenderEnum;
  recipe: string;
  price: number;
  image: FileList;
};
const imageBBKEY = import.meta.env.VITE_IMAGEBB_API_KEY;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageBBKEY}`;
const UpdateItems: React.FC = () => {
  const menu = useLoaderData() as Menu;
  const { register, handleSubmit } = useForm<IFormInput>();
  const publicAxios = usePublicAxios();
  const secureAxios = useSecureAxios();
  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<IFormInput> = (data, event) => {
    const imageFile = { image: data.image[0] };
    publicAxios
      .post(imageHostingAPI, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          const menuItem = {
            name: data.name,
            category: data.category,
            recipe: data.recipe,
            price: data.price,
            image: res.data.data.url,
          };
          secureAxios
            .patch(`/menus/${menu._id}`, menuItem)
            .then((saveMenu) => {
              console.log(saveMenu);
              if (saveMenu.data.success) {
                setLoading(false);
                Swal.fire({
                  title: "Successful",
                  text: `${saveMenu.data.message}`,
                  icon: "success",
                  confirmButtonText: "Close",
                  timer: 1500,
                });
                event?.target.reset();
              }
            })
            .catch((err) => {
              console.error(err);
              Swal.fire({
                title: "Error!!",
                text: `${err.message}`,
                icon: "error",
                confirmButtonText: "Close",
                timer: 1500,
              });
            })
            .catch((err) => {
              console.error(err);
              setLoading(false);
              Swal.fire({
                title: "Error!!",
                text: `${err.message}`,
                icon: "error",
                confirmButtonText: "Close",
                timer: 1500,
              });
            });
        }
      });
  };

  return (
    <>
      <Helmet>
        <title>Bisstro Boss | Update Items</title>
      </Helmet>
      <PageTitle heading="update an item" subHeading="Refesh info"></PageTitle>
      <div className="bg-slate-100 p-16">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black text-lg font-semibold">
                Recipe Name*
              </span>
            </label>
            <input
              type="text"
              placeholder="Recipe Name"
              className="input input-bordered"
              required
              defaultValue={menu?.name}
              {...register("name")}
            />
          </div>
          <div className="flex gap-12">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text text-black text-lg font-semibold">
                  Category*
                </span>
              </label>
              <select
                {...register("category")}
                className="select select-bordered w-full"
                defaultValue={menu?.category}
              >
                <option value={`salad`}>Salad</option>
                <option value={`soup`}>Soup</option>
                <option value={`dessert`}>Dessert</option>
                <option value={`drinks`}>Drinks</option>
                <option value={`pizza`}>Pizza</option>
              </select>
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text text-black text-lg font-semibold">
                  Price*
                </span>
              </label>
              <input
                type="number"
                placeholder="Price"
                className="input input-bordered"
                required
                {...register("price")}
                defaultValue={menu?.price}
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black text-lg font-semibold">
                Recipe Details*
              </span>
            </label>
            <textarea
              className="textarea"
              placeholder="Recipe Details"
              {...register("recipe")}
              rows={10}
              defaultValue={menu?.recipe}
            ></textarea>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black text-lg font-semibold">
                Choose File*
              </span>
            </label>
            <input
              type="file"
              className="file-input w-full max-w-xs"
              {...register("image")}
              accept="image/png, image/jpg, image/jpeg"
            />
          </div>
          <div className="form-control mt-6">
            <button
              className="btn btn-outline uppercase"
              type="submit"
              onClick={() => setLoading(true)}
            >
              Update Recipe <FaUtensils></FaUtensils>{" "}
              {loading && (
                <span className="loading loading-spinner loading-xs"></span>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateItems;
