import React from "react";
import { Link } from "react-router-dom";
import {
  IoPersonOutline,
  IoFolderOutline,
  IoLogOutOutline,
  IoPencilOutline,
} from "react-icons/io5";

const Menu = () => {
  const user = true;
  return (
    <div className="bg-white border rounded-[0.5rem] px-3  border-gray-300 absolute top-12 right-3 w-40">
      <ul>
        {!user && (
          <li>
            <Link to={"/"}>Login</Link>
          </li>
        )}
        {!user && (
          <li>
            <Link to={"/"}>Register</Link>
          </li>
        )}

        {user && (
          <li className="py-2 border-b border-b-gray-300 flex md:hidden items-center gap-2">
            <IoPencilOutline />
            <Link to={"/login"}>Write</Link>
          </li>
        )}

        {user && (
          <li className="py-2 border-b border-b-gray-300 flex items-center gap-2">
            <IoFolderOutline />
            <Link to={"/login"}>My blogs</Link>
          </li>
        )}

        {user && (
          <li className="py-2 border-b border-b-gray-300 flex items-center gap-2">
            <IoPersonOutline />
            <Link to={"/login"}>Profile</Link>
          </li>
        )}
        {user && (
          <li className="py-2 flex items-center gap-2">
            <IoLogOutOutline />
            <Link to={"/login"}>Log out</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Menu;
