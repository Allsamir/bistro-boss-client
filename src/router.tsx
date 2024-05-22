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
    element: <Dasboard />,
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
    ],
  },
]);
export default router;
