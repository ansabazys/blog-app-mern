import { IMG } from "../../url";

const Post = ({ posts }) => {
  return (
    <div className="px-3 w-full flex flex-col md:flex-row justify-between gap-5">
      <section className="md:w-2/5 w-full h-[250px] bg-black">
        <img
          src={IMG + posts.photo}
          alt=""
          className="object-cover w-full h-full"
        />
      </section>
      <section className="flex flex-col gap-3 w-full h-[250px]  md:w-3/5">
        <h1 className="text-3xl font-bold tracking-tight">{posts.title}</h1>
        <div className="flex justify-between text-sm">
          <p>@{posts.username}</p>
          <div className="flex gap-3">
            <p>{new Date(posts.updatedAt).toString().slice(0,15)}</p>
            <p>{new Date(posts.updatedAt).toString().slice(15,21)}</p>
          </div>
        </div>
        <div className=" h-full overflow-hidden">
          <p className="overflow-hidden">{posts.desc.slice(0,200) + "...read more"} </p>
        </div>
      </section>
    </div>
  );
};

export default Post;
