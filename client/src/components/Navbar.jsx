import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { RiMenu3Fill } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("")

  

  const handleChange = (e) => {
    setPrompt(e.target.value)
    if (e.target.value && e.target.value !== "[") {
      navigate(e.target.value ? "?search=" + e.target.value : navigate("/"));
    }else {
      navigate("/")
    }
  };

  const { user } = useContext(UserContext);
  return (
    <div className="flex w-full justify-center align-middle h-[10vh] sticky top-0 bg-white">
      <div className="flex w-full px-3 md:p-0 md:w-3/5 justify-between items-center relative">
        <div>
          <Link to={"/"} className="font-semibold text-xl tracking-tighter">Blog</Link>
        </div>
        <div className="h-8 flex justify-between items-center rounded-[0.5rem] py-2 px-2 border border-gray-300 ">
          <CiSearch className="fill-gray-500" />
          <input
            type="text"
            name=""
            id=""
            className="px-1 focus-visible:outline-none"
            placeholder="Search"
            onChange={handleChange}
          />
        </div>

        <div onClick={() => setMenu(!menu)} className="flex gap-5 items-center">
          <nav className="hidden md:flex">
            <ul className="flex gap-5">
              {user ? (
                <li>
                  <Link to={"/create"}>Write</Link>
                </li>
              ) : (
                <li className="flex gap-3">
                  <Link to={"/login"}>Login</Link>
                  <Link to={"/register"}>Register</Link>
                </li>
              )}
            </ul>
          </nav>

          <div className="cursor-pointer">
            <RiMenu3Fill className="size-5" />
            {menu && <Menu />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
