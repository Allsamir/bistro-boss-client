import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./private/PrivateRoute";
import Dasboard from "./Dasboard";
import Cart from "./dasboard/Cart";
import DHome from "./dasboard/Home";
import Reservation from "./dasboard/Reservation";
import Review from "./dasboard/Review";
import Booking from "./dasboard/Booking";
import AHome from "./adminD/Home";
import AddItems from "./adminD/AddItems";
import ManageItems from "./adminD/ManageItems";
import AddBookings from "./adminD/AddBookings";
import ManageBookings from "./adminD/ManageBookings";
import AllUsers from "./adminD/AllUsers";
import AdminRoute from "./private/AdminRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/order/:category",

        element: (
          <PrivateRoute>
            <Order></Order>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dasboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "user-home",
        element: <DHome />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "reservation",
        element: <Reservation />,
      },
      {
        path: "review",
        element: <Review />,
      },
      {
        path: "bookings",
        element: <Booking />,
      },
      // Admin routes
      {
        path: "admin-home",
        element: <AHome />,
      },
      {
        path: "add-items",
        element: <AddItems />,
      },
      {
        path: "manage-items",
        element: <ManageItems />,
      },
      {
        path: "add-bookings",
        element: <AddBookings />,
      },
      {
        path: "manage-bookings",
        element: <ManageBookings />,
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
    ],
  },
]);
export default router;
