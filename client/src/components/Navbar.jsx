import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { RiMenu3Fill } from "react-icons/ri";
import { useState } from "react";
import Menu from "./Menu";

const Navbar = () => {
 const[menu, setMenu] = useState(false)

  const user = true;
  return (
    <div className="flex w-full justify-center align-middle h-14 sticky top-0 bg-white">
      <div className="flex w-full px-3 md:w-3/5 justify-between items-center relative">
        <div>
          <h1 className="font-semibold text-xl tracking-tighter">Blog</h1>
        </div>
        <div className="h-8 flex justify-between items-center rounded-[0.5rem] py-2 px-2 border border-gray-300 ">
          <CiSearch className="fill-gray-500" />
          <input
            type="text"
            name=""
            id=""
            className="px-1 focus-visible:outline-none"
            placeholder="Search"
          />
        </div>
        
        <div onClick={() => setMenu(!menu)} className="flex gap-5 items-center">

        <nav className="hidden md:flex">
          <ul className="flex gap-5">
            {user ? (
              <li>
                <Link to={"/login"}>Write</Link>
              </li>
            ) : (
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
            )}
          </ul>
        </nav>

          <RiMenu3Fill className="size-5"/>
          {menu && <Menu />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
