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
import AHome from "./adminD/Home";
import AddItems from "./adminD/AddItems";
import ManageItems from "./adminD/ManageItems";
import AllUsers from "./adminD/AllUsers";
import AdminRoute from "./private/AdminRoute";
import UpdateItems from "./adminD/UpdateItems";
import PaymentCompletion from "./dasboard/PaymentCompletion";
import PaymentHistory from "./dasboard/PaymentHistory";
import ErrorPage from "./ErrorPage";
import PaymentSuccess from "./dasboard/PaymentSuccess";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
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
        path: "payment-completion",
        element: <PaymentCompletion />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "payment-ssl-success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment-ssl-fail",
        element: <></>,
      },
      {
        path: "payment-ssl-cancel",
        element: <></>,
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
              `cafe-gratitude-server.vercel.app/menus/${params.menuID}`,
            ).then((res) => res.json());
            return menu;
          } catch (err) {
            console.error(err);
          }
        },
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
