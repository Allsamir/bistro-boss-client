import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import bgImage from "../assets/others/authentication.png";
import img from "../assets/others/authentication2.png";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { auth } from "../config/firebase.config";
import Swal from "sweetalert2";
import usePublicAxios from "../hooks/usePublicAxios";
import { FcGoogle } from "react-icons/fc";
// import { auth } from "../config/firebase.config";
type Inputs = {
  name: string;
  email: string;
  password: string;
  photoURL: string;
};
const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const { createUser, setLoading, googleProvider } = useAuth();
  const navigate = useNavigate();
  const publicAxios = usePublicAxios();
  const signInWithGoogle = () => {
    googleProvider()
      .then((result) => {
        console.log(result.user);
        publicAxios
          .post(`/users`, {
            email: result.user.email,
            name: result.user.displayName,
          })
          .then(() => {
            navigate("/");
          });
      })
      .catch((err) => console.error(err));
  };
  const onSubmit: SubmitHandler<Inputs> = (data, event) => {
    const { name, photoURL, email, password } = data;
    createUser(email, password)
      .then(() => {
        if (auth.currentUser) {
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL,
          })
            .then(() => {
              publicAxios
                .post(`/users`, { email: email, name: name })
                .then((res) => {
                  if (res.data.success) {
                    Swal.fire({
                      title: "Successful Registation",
                      text: " Successfully Done",
                      icon: "success",
                      confirmButtonText: "Close",
                    }).then(() => navigate("/"), event?.target.reset());
                  }
                })
                .catch((err) => console.error(err));
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.fire({
          title: "Error!",
          text: `${errorCode} ${errorMessage}`,
          icon: "error",
          confirmButtonText: "Close",
        }).then(() => setLoading(false));
      });
  };
  return (
    <>
      <Helmet>
        <title>Bistro Boss | Register</title>
      </Helmet>
      <div
        className={`hero min-h-screen`}
        style={{ backgroundImage: `url("${bgImage}")` }}
      >
        <div className="hero-content flex-col md:flex-row lg:gap-40 md:gap-12">
          <div className="text-center lg:text-left">
            <img src={img} alt="" />
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <h1 className="font-semibold text-2xl md:text-4xl mt-12 text-center">
              Register Now!
            </h1>
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                  {...register("name")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  placeholder="Photo URL"
                  className="input input-bordered"
                  required
                  {...register("photoURL")}
                />
              </div>
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
                  className="input input-bordered mb-2"
                  required
                  {...register("password", {
                    maxLength: 20,
                    minLength: 6,
                    pattern:
                      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                  })}
                />
                <button
                  onClick={() => setPasswordVisible(!isPasswordVisible)}
                  className="absolute right-4 bottom-5"
                >
                  {isPasswordVisible ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password?.type === "pattern" && (
                <span className="text-red-600">
                  Password has to minimum 8 character, one uppercase, lower
                  case, one number and one special character
                </span>
              )}
              <div className="form-control mt-6">
                <button className="btn btn-outline uppercase" type="submit">
                  Register
                </button>
              </div>
              <button
                className="btn btn-outline text-sky-500"
                onClick={signInWithGoogle}
              >
                <FcGoogle />
              </button>
            </form>
            <p className="text-center pb-8">
              Already Registered?{" "}
              <Link to={`/login`} className="text-sky-700">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
