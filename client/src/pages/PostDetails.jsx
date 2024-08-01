import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IMG, URL } from "../../url";
import { UserContext } from "../context/UserContext";

const PostDetails = () => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const { id } = useParams();

  const fetchPost = async () => {
    setLoading(true);
    try {
      const response = await axios.get(URL + "/api/posts/" + id);
      setPost(response.data);
      console.log(user.id);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(URL + "/api/posts/" + id);
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    navigate("/edit/" + id);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="w-full flex justify-center my-10">
        {loading ? (
          <p>Loading</p>
        ) : (
          <main className="md:w-3/5 w-full px-3 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h1 className="md:text-5xl text-2xl font-bold tracking-tighter">
                {post.title}
              </h1>
              {user.id === post.userId ? (
                <div className="flex gap-2">
                  <picture
                    onClick={handleEdit}
                    className="p-2 border-gray-300 border rounded-md hover:bg-slate-200 cursor-pointer"
                  >
                    <FiEdit2 className="md:size-5" />
                  </picture>
                  <picture
                    onClick={handleDelete}
                    className="p-2 border-gray-300 border rounded-md hover:bg-slate-200 cursor-pointer"
                  >
                    <FiTrash2 className="md:size-5" />
                  </picture>
                </div>
              ) : null}
            </div>
            <div className="flex justify-between text-sm">
              <p>@{post.username}</p>
              <div className="flex gap-3">
                <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
                <p>{new Date(post.updatedAt).toString().slice(15, 21)}</p>
              </div>
            </div>
            <div className="w-full h-[450px] ">
              <img
                className="object-cover w-full h-full"
                src={IMG + post.photo}
                alt=""
              />
            </div>
            <p>{post.desc}</p>
          </main>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
