import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IoPersonOutline,
  IoFolderOutline,
  IoLogOutOutline,
  IoPencilOutline,
} from "react-icons/io5";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../../url";

const Menu = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/logout", {
        withCredentials: true,
      });
      console.log(res);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const { user } = useContext(UserContext);
  return (
    <div className="bg-white border rounded-[0.5rem] px-3 shadow-md border-gray-300 absolute top-14 right-3 w-40">
      <ul>
        {!user && (
          <Link
            to={"/login"}
            className="py-2 border-b border-b-gray-300 flex md:hidden items-center gap-2"
          >
            <IoPencilOutline />
            Login
          </Link>
        )}
        {!user && (
          <Link
            to={"/login"}
            className="py-2 border-b border-b-gray-300 flex md:hidden items-center gap-2"
          >
            <IoPencilOutline />
            Register
          </Link>
        )}
        {user && (
          <Link
            to={"/create"}
            className="py-2 border-b border-b-gray-300 flex md:hidden items-center gap-2"
          >
            <IoPencilOutline />
            Write
          </Link>
        )}

        {user && (
          <Link
            to={"/posts/user/" + user.id}
            className="py-2 border-b border-b-gray-300 flex items-center gap-2"
          >
            <IoFolderOutline />
            My blogs
          </Link>
        )}

        {user && (
          <Link
            to={"/profile/33"}
            className="py-2 border-b border-b-gray-300 flex items-center gap-2"
          >
            <IoPersonOutline />
            Profile
          </Link>
        )}
        {user && (
          <li onClick={handleLogOut} className="py-2 flex items-center gap-2">
            <IoLogOutOutline />
            Log out
          </li>
        )}
      </ul>
    </div>
  );
};

export default Menu;
