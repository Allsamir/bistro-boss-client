import { Link, useRouteError } from "react-router-dom";
import errorGif from "./assets/404.gif";
const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="flex justify-center items-center min-h-screen flex-col"
    >
      <img src={errorGif} alt="errorGif" />
      <Link to={`/`}>
        <button className="btn btn-outline text-black">Home</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
