import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { BsCalendarCheckFill } from "react-icons/bs";

const Dasboard = () => {
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <div className="flex justify-end">
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-primary"
          >
            Open drawer
          </label>
        </div>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li>
            <NavLink to={`/dashboard/user-home`}>
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
        </ul>
      </div>
    </div>
  );
};

export default Dasboard;
