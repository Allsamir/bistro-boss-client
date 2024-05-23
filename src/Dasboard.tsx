import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { BsCalendarCheckFill } from "react-icons/bs";
import { TiThMenu } from "react-icons/ti";
import { MdRestaurantMenu } from "react-icons/md";
import { FaShop } from "react-icons/fa6";

const Dasboard: React.FC = () => {
  return (
    <>
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="navbar bg-base-100">
            <div className="flex-1">
              <a className="text-xl uppercase font-bold">Bistro Boss</a>
            </div>
            <div className="flex-none">
              <label htmlFor="my-drawer-4" className="drawer-button btn">
                <TiThMenu className="text-xl" />
              </label>
            </div>
          </div>
          {/* Page content here */}
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content uppercase">
            {/* Sidebar content here */}
            <li>
              <NavLink to={`/dashboard`}>
                <FaHome />
                User Home
              </NavLink>
            </li>
            <li>
              <NavLink to={`/dashboard/cart`}>
                <FaCartShopping />
                My Cart
              </NavLink>
            </li>
            <li>
              <NavLink to={`/dashboard/reservation`}>
                <BsCalendarCheckFill />
                Reservation
              </NavLink>
            </li>
            <li>
              <NavLink to={`/dashboard/review`}>
                <MdReviews />
                Add Review
              </NavLink>
            </li>
            <li>
              <NavLink to={`/dashboard/bookings`}>
                <SlCalender />
                My Bookings
              </NavLink>
            </li>
            <div className="divider"></div>
            <li>
              <NavLink to={`/`}>
                <FaHome />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={`/menu`}>
                <MdRestaurantMenu />
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink to={`/order`}>
                <FaShop />
                Order
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dasboard;
