import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { IoCartSharp } from "react-icons/io5";
import useCart from "../hooks/useCart";
import { RiAdminFill } from "react-icons/ri";
const Navbar = () => {
  const { user, logOutUser, role } = useAuth();
  const cartData = useCart();
  const navbar = (
    <>
      <li>
        <NavLink className={`mb-2`} to={`/`}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className={`mb-2`} to={"/menu"}>
          Menus
        </NavLink>
      </li>
      <li>
        <NavLink className={`mb-2`} to={"/order/salad"}>
          Order
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar fixed z-10 text-white bg-black bg-opacity-20">
      <div className="navbar-start w-16">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="uppercase text-black menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navbar}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="text-xl uppercase font-bold">Bistro Boss</a>
      </div>
      <div className="navbar-end flex-1">
        {user ? (
          <>
            <img
              src={user?.photoURL || ""}
              alt={user?.displayName || ""}
              className="w-12 rounded-full"
              title={user?.displayName || ""}
            />
            {role?.role === "admin" ? (
              <Link className="mx-6" to={`/dashboard/all-users`}>
                <RiAdminFill className="text-2xl" />
              </Link>
            ) : (
              <Link to={`/dashboard/cart`}>
                <button className="btn md:ml-4 ml-2 bg-transparent border-0 hover:border-0 hover:bg-transparent">
                  <IoCartSharp className="text-white text-2xl" />
                  <div className="badge badge-secondary">
                    {cartData?.length || 0}
                  </div>
                </button>
              </Link>
            )}

            <button
              className="btn btn-outline uppercase text-white md:ml-4 ml-2"
              onClick={() => {
                logOutUser().then(() => {
                  Swal.fire({
                    title: "Successful Logout",
                    text: " Successfully Done",
                    icon: "success",
                    confirmButtonText: "Close",
                  });
                });
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to={`/login`}>
            <button className="btn btn-outline text-white uppercase">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
