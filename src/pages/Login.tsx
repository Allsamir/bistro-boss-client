import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
type Inputs = {
  email: string;
  password: string;
  captchaValue: string;
};

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { email, password, captchaValue } = data;
    console.log(email, password);
    if (validateCaptcha(captchaValue)) {
      alert("Captcha Ok");
    } else {
      alert("Try again");
    }
  };
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col md:flex-row lg:gap-40 md:gap-12">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
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
              <LoadCanvasTemplateNoReload />
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
        </div>
      </div>
    </div>
  );
};

export default Login;
