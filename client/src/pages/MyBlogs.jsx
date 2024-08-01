import React, { useContext, useEffect, useState } from "react";
import Post from "../components/Post";
import Navbar from "../components/Navbar";
import axios from "axios";
import { URL } from "../../url";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const MyBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [loader, setLoader] = useState(false)

  const { search } = useLocation();

  
  const { user } = useContext(UserContext);

  const getPost = async () => {
    setLoader(true)
    try {
      const response = await axios.get(URL + "/api/posts/user/"+user.id + search);
      setPosts(response.data);
      response.data.length === 0 ? setNoResult(true) : setNoResult(false);
      setLoader(false)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, [search, user]);

  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="w-full gap-7 flex flex-col items-center justify-center my-14">
        <div className="w-3/5">
            <h1 className="text-4xl font-semibold tracking-tighter">My blogs</h1>
        </div>
        {loader ? <p>Loading</p> : !noResult ? (
          posts.map((posts) => (
            <div className="w-full flex justify-center">
              <div
                className="md:w-3/5 w-full flex justify-center cursor-pointer"
                onClick={() =>
                  user
                    ? navigate("/posts/post/" + posts._id)
                    : navigate("/login")
                }
              >
                <Post key={posts._id} posts={posts} />
              </div>
            </div>
          ))
        ) : (
          <p>No posts</p>
        )}
      </div>
    </>
  );
};

export default MyBlogs;
