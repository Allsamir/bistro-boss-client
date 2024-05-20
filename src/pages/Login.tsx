import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import bgImage from "../assets/others/authentication.png";
import img from "../assets/others/authentication2.png";
type Inputs = {
  email: string;
  password: string;
  captchaValue: string;
};

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const { loginUser, setLoading } = useAuth();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { email, password, captchaValue } = data;
    if (validateCaptcha(captchaValue)) {
      loginUser(email, password)
        .then(() => {
          Swal.fire({
            title: "Successful",
            text: "Login Successfully Done",
            icon: "success",
            confirmButtonText: "close",
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Swal.fire({
            title: "Error!",
            text: `${errorCode} ${errorMessage}`,
            icon: "error",
            confirmButtonText: "close",
          }).then(() => setLoading(false));
        });
    } else {
      Swal.fire({
        title: "Error!",
        text: `Captcha validation failed try again`,
        icon: "error",
        confirmButtonText: "close",
      });
    }
  };
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  return (
    <div
      className="hero min-h-screen bg-base-200"
      style={{ backgroundImage: `url("${bgImage}")` }}
    >
      <div className="hero-content flex-col md:flex-row lg:gap-40 md:gap-12">
        <div className="text-center lg:text-left">
          <img src={img} alt="" />
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <h1 className="font-semibold text-2xl md:text-4xl mt-12 text-center">
            Login Now!
          </h1>
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                required
                {...register("email")}
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered"
                required
                {...register("password")}
              />
              <button
                onClick={() => setPasswordVisible(!isPasswordVisible)}
                className="absolute right-2 bottom-3"
              >
                {isPasswordVisible ? "Hide" : "Show"}
              </button>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Captcha</span>
              </label>
              <LoadCanvasTemplate />
              <input
                type="text"
                placeholder="Captcha"
                className="input input-bordered"
                required
                {...register("captchaValue")}
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">
                Login
              </button>
            </div>
          </form>
          <p className="text-center pb-8">
            New Here?{" "}
            <Link to={`/register`} className="text-sky-700">
              Create a New Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
