import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../../url";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({});
  const [visbleOne, setVisibleOne] = useState(false);
  const [visbleTwo, setVisibleTwo] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //Validation
  const validateForm = (data) => {
    const errors = {};
    if (!data.username.trim()) {
      errors.username = "Username is required";
    } else if (data.username.length < 4) {
      errors.username = "Username must be at least 4 characters long";
    }

    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid";
    }

    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    if (data.confirmPassword !== data.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setError(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Form submission logic here
      try {
        const { username, email, password } = formData;
        const response = await axios.post(URL + "/api/auth/register", {
          username,
          email,
          password,
        },);
        console.log(response);
        setError(false);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Form submission failed due to validation errors.");
    }

    console.log(error);
  };

  return (
    <div className="flex w-full justify-center ">
      <div className="md:w-3/5 w-full px-5 flex flex-col justify-center ">
        <div className="flex items-center h-[10vh] justify-between bg-white ">
          <div>
            <Link to={"/"} className="font-semibold text-xl tracking-tighter">Blog</Link>
          </div>
          <nav>
            <Link to={"/about"} className="underline text-blue-950">
              About
            </Link>
          </nav>
        </div>

        <main className="grid place-content-center w-full h-[90lvh]">
          <div className=" flex flex-col items-center text-center gap-8  p-5">
            <div>
              <h1 className="md:text-4xl text-3xl font-bold tracking-tighter">
                Create your account
              </h1>
              <p>Let's make a blog</p>
            </div>
            <form
              onSubmit={handleRegister}
              className="flex flex-col w-full md:w-72 gap-2"
            >
              <div>
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  placeholder="Username"
                  className="h-10 w-full flex justify-between items-center rounded-md py-2 px-3 border border-gray-300 "
                />
                {error.username && (
                  <span className="flex text-xs text-red-900 pt-1">
                    {error.username}
                  </span>
                )}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Email"
                  className="h-10 w-full flex justify-between items-center rounded-md py-2 px-3 border border-gray-300 "
                />
                {error.email && (
                  <span className="flex text-xs text-red-900 pt-1">
                    {error.email}
                  </span>
                )}
              </div>
              <div>
                <div className="h-10 w-full flex justify-between items-center rounded-md py-2 px-3 border border-gray-300 ">
                  <input
                    type={visbleOne ? "type" : "password"}
                    name="password"
                    onChange={handleChange}
                    placeholder="Password"
                    className="outline-none"
                  />
                  <div onClick={() => setVisibleOne(!visbleOne)}>
                    {visbleOne ? <VscEyeClosed /> : <VscEye />}
                  </div>
                </div>
                {error.password && (
                  <span className="flex text-xs text-red-900 pt-1">
                    {error.password}
                  </span>
                )}
              </div>
              <div>
                <div className="h-10 w-full flex justify-between items-center rounded-md py-2 px-3 border border-gray-300 ">
                  <input
                    type={visbleTwo ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    className="outline-none"
                    onChange={handleChange}
                  />
                 <div onClick={() => setVisibleTwo(!visbleTwo)} >
                    {visbleTwo ? <VscEyeClosed /> : <VscEye />}
                  </div>
                </div>
                {error.confirmPassword && (
                  <span className="flex text-xs text-red-900 pt-1" >
                    {error.confirmPassword}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="h-10 mt-5 w-full flex justify-center items-center rounded-md bg-black text-white "
              >
                Create account
              </button>
            </form>
            <p className="text-start">
              Already have an account?{" "}
              <Link to={"/login"} className="underline text-blue-950">
                Log in
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Register;
