import React from "react";
import { Helmet } from "react-helmet-async";
import PageTitle from "../components/PageTitle";
import useSecureMenu from "../hooks/useSecureMenu";
import Menu from "../interfaces/Menu";

const ManageItems: React.FC = () => {
  const menus = useSecureMenu();
  return (
    <>
      <Helmet>
        <title>Bistro Boss | Manage Items</title>
      </Helmet>
      <PageTitle heading="Manage All items" subHeading="Hurry up"></PageTitle>
      <div className="container mx-auto px-4">
        <div>
          <div className="title">
            <p className="lg:text-2xl text-base font-semibold">
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
                    {/* row 1 */}
                    <tr>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">Hart Hagerty</div>
                            <div className="text-sm opacity-50">
                              United States
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        Zemlak, Daniel and Leannon
                        <br />
                        <span className="badge badge-ghost badge-sm">
                          Desktop Support Technician
                        </span>
                      </td>
                      <td>Purple</td>
                      <th>
                        <button className="btn btn-ghost btn-xs">
                          details
                        </button>
                      </th>
                    </tr>
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
