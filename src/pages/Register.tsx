import React from "react";
import bgImage from "../assets/others/authentication.png";
import img from "../assets/others/authentication2.png";
const Register: React.FC = () => {
  return (
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
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered"
                required
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
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
