import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Helmet } from "react-helmet-async";
import useSecureAxios from "../hooks/useSecureAxios";
import { AiFillDelete } from "react-icons/ai";
import NUser from "../interfaces/NUser";
import { PiUsersThreeFill } from "react-icons/pi";
import Swal from "sweetalert2";
import { queryClient } from "../main";

const AllUsers: React.FC = () => {
  const secureAxios = useSecureAxios();
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () =>
      await secureAxios.get(`/users`).then((res) => {
        return res.data;
      }),
  });
  const handleDelete = (id: string) => {};
  const handleRole = (id: string) => {
    Swal.fire({
      title: "Are you sure to make him/her Admin?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        secureAxios
          .patch(`/users?id=${id}`)
          .then((res) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            Swal.fire({
              title: `Created!`,
              text: `${res.data.message}`,
              icon: "success",
            });
          })
          .catch((err) => console.error(err));
      }
    });
  };
  return (
    <>
      <Helmet>
        <title>Bistro Boss | All Users</title>
      </Helmet>
      <div className="container mx-auto px-4">
        <div className="content mt-12">
          <div className="text-center uppercase">
            <p className="lg:text-2xl text-base font-semibold">
              Total Users: {users?.length}
            </p>
          </div>
          <div className="mt-12">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Role</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {users?.map((user: NUser, index: number) => (
                    <tr key={index}>
                      <th>
                        <p className="font-bold">{index + 1}</p>
                      </th>
                      <td>
                        <p className="font-bold">{user.name}</p>
                      </td>
                      <td>
                        <p className="font-bold">{user.email}</p>
                      </td>
                      <td>
                        {user.role === "admin" ? (
                          <p className="font-bold text-xl uppercase">Admin</p>
                        ) : (
                          <button
                            className="btn text-3xl bg-yellow-500 text-white"
                            onClick={() => handleRole(user._id)}
                          >
                            <PiUsersThreeFill />
                          </button>
                        )}
                      </td>
                      <th>
                        <button
                          className="btn btn-ghost text-3xl"
                          onClick={() => handleDelete(user._id)}
                        >
                          <AiFillDelete className="text-red-600" />
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllUsers;
