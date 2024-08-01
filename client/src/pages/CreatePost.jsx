import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { IoIosClose } from "react-icons/io";
import axios from "axios";
import { URL } from "../../url";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);

  const { user } = useContext(UserContext);
  console.log(user);
  const navigate = useNavigate();

  const addCategory = (e) => {
    e.preventDefault();
    let updatedaCats = [...cats];
    updatedaCats.push(cat);
    setCat("");
    setCats(updatedaCats);
  };

  const deleteCat = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i, 1);
    setCats(updatedCats);
  };

const [title, setTitle] = useState("")
const [desc, setDesc] = useState("")
const [file, setFile] = useState("")


  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = {
      title: title,
      desc: desc,
      username: user.username,
      userId: user.id,
      categories: cats,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;
      console.log(data);
      
      try {
        const imgUpload = await axios.post(URL + "/api/upload", data);
        console.log(imgUpload.data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      const response = await axios.post(URL + "/api/posts/create", post, {
        withCredentials: true,
      });
      console.log(response.data);
      navigate("/posts/post/"+response.data._id);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <Navbar />
      <div className="flex w-full items-center justify-center my-10 h-[80vh]">
        <div className="flex flex-col gap-8 md:w-3/5">
          <h1 className="text-4xl font-semibold tracking-tighter">
            Create a post
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="h-10 w-full flex justify-between items-center rounded-md py-2 px-3 border border-gray-300"
            />
            <input type="file" name="photo" onChange={(e) => setFile(e.target.files[0])} />

            <div className="grid gap-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter category"
                  className="h-10 w-full flex justify-between items-center rounded-md py-2 px-3 border border-gray-300 "
                  onChange={(e) => setCat(e.target.value)}
                  value={cat}
                />
                <button
                  className="h-10 px-4 rounded-md bg-black text-white"
                  onClick={addCategory}
                >
                  Add
                </button>
              </div>
              <div className="flex gap-2">
                {cats &&
                  cats.map((data, i) => (
                    <div
                      key={Math.random()}
                      className="border border-gray-300 w-max px-2 rounded-md shadow-md gap-1 flex justify-between items-center"
                    >
                      <p>{data}</p>
                      <IoIosClose
                        className="flex justify-center"
                        onClick={() => deleteCat(i)}
                      />
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <textarea
                name="desc"
                id=""
                rows={9}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Enter description"
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="h-10 px-4 rounded-md bg-black text-white w-max"
            >
              Create post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
