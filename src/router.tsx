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
import UpdateItems from "./adminD/UpdateItems";
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
        element: (
          <AdminRoute>
            <AHome />
          </AdminRoute>
        ),
      },
      {
        path: "add-items",
        element: (
          <AdminRoute>
            <AddItems />
          </AdminRoute>
        ),
      },
      {
        path: "manage-items",
        element: (
          <AdminRoute>
            <ManageItems />
          </AdminRoute>
        ),
      },
      {
        path: "update-items/:menuID",
        element: (
          <AdminRoute>
            <UpdateItems></UpdateItems>
          </AdminRoute>
        ),
        loader: async ({ params }) => {
          try {
            const menu = await fetch(
              `http://localhost:3000/menus/${params.menuID}`,
            ).then((res) => res.json());
            return menu;
          } catch (err) {
            console.error(err);
          }
        },
      },
      {
        path: "add-bookings",
        element: (
          <AdminRoute>
            <AddBookings />
          </AdminRoute>
        ),
      },
      {
        path: "manage-bookings",
        element: (
          <AdminRoute>
            <ManageBookings />
          </AdminRoute>
        ),
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
