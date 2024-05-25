import React from "react";
import { Helmet } from "react-helmet-async";
import PageTitle from "../components/PageTitle";
import useSecureMenu from "../hooks/useSecureMenu";
import Menu from "../interfaces/Menu";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { GrUpdate } from "react-icons/gr";
import useSecureAxios from "../hooks/useSecureAxios";
import { queryClient } from "../main";

const ManageItems: React.FC = () => {
  const menus = useSecureMenu();
  const secureAxios = useSecureAxios();
  const handleDelete = (id: string) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure to delete this menu",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        secureAxios.delete(`/menus?id=${id}`).then((res) => {
          if (res.data.success) {
            queryClient.invalidateQueries({ queryKey: ["menuS"] });
            Swal.fire({
              title: `Deleted!`,
              text: `${res.data.message}`,
              icon: "success",
            });
          }
        });
      }
    });
  };
  const handleUpdate = (id: string) => {
    console.log(id);
  };
  return (
    <>
      <Helmet>
        <title>Bistro Boss | Manage Items</title>
      </Helmet>
      <PageTitle heading="Manage All items" subHeading="Hurry up"></PageTitle>
      <div className="container mx-auto px-4">
        <div>
          <div className="title">
            <p className="lg:text-3xl uppercase text-base font-semibold text-center">
              Total Items: {menus?.length}
            </p>
          </div>
          <div>
            <div className="mt-12">
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Update</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menus?.map((menu: Menu, index: number) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-24 h-24">
                                <img src={menu.image} alt={menu.image} />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="font-bold">{menu.name}</div>
                        </td>
                        <td>
                          <div className="font-bold">${menu.price}</div>
                        </td>
                        <td>
                          <button
                            className="btn btn-ghost text-3xl"
                            onClick={() => handleUpdate(menu._id)}
                          >
                            <GrUpdate />
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-ghost text-3xl"
                            onClick={() => handleDelete(menu._id)}
                          >
                            <AiFillDelete className="text-red-600" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageItems;
