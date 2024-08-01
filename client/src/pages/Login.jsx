import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../../url";
import axios from "axios";
import { UserContext } from "../context/UserContext.jsx";

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });



  const [error, setError] = useState({})
  const [err, setErr] = useState("")
  const [errorStatus, setErrorStatus] = useState(false)
  const navigate = useNavigate()
  const {setUser, user} = useContext(UserContext)

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value})
  }

  const validateForm = (data) => {
    const errors = {}
    if(!data.email.trim()) {
      errors.email = "Email is required";
    }else if(!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid";
    }

    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    return errors;
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const newErrors = validateForm(formData)
    setError(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Form submission logic here
      try {
        const {email, password } = formData;
        const response = await axios.post(URL + "/api/auth/login", {
          email,
          password,
        }, {withCredentials: true});
        console.log(response);
        setErrorStatus(false);
        setUser(response.data)
        navigate("/");
      } catch (error) {
        console.log(error);

      }
    } else {
      console.log("Form submission failed due to validation errors.");
      setErrorStatus(true)
    }
  }

  return (
    <div className="flex w-full justify-center ">
      <div className="w-full flex flex-col justify-center items-center ">
        <div className="md:w-3/5 w-full px-5 flex items-center h-[10vh] justify-between bg-white ">
          <div>
          <Link to={"/"} className="font-semibold text-xl tracking-tighter">Blog</Link>
          </div>
          <nav>
            <Link to={"/about"} className="underline text-blue-950">About</Link>
          </nav>
        </div>

        <main className="grid place-content-center w-full h-[90lvh]">
          <div className=" flex flex-col text-center gap-8  p-5  ">
            <div className="">
              <h1 className="text-4xl font-bold tracking-tighter">
                Welcome back
              </h1>
              <p>Let's make a blog</p>
            </div>
            <form onSubmit={handleLogin} className="flex flex-col md:w-72  gap-2">
              <input
                type="email"
                placeholder="Email"
                onChange={handleChange}
                name="email"
                className="h-10 w-full flex justify-between items-center rounded-md py-2 px-3 border border-gray-300 "
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                className="h-10 w-full flex justify-between items-center rounded-md py-2 px-3 border border-gray-300 "
              />
              <div className="text-sm text-end underline">
                <p>Forgot password?</p>
              </div>
              <button className="h-10 mt-5 w-full flex justify-center items-center rounded-md bg-black text-white ">
                Log in
              </button>
            </form>
            <p className="text-sm">
              Don't have an account? 
              <Link to={"/register"} className="underline text-blue-950">
                Sign up
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
