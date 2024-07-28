const Post = () => {
  return (
    <div className="md:w-3/5 px-3 flex flex-col md:flex-row justify-between gap-5">
      <section className="md:w-2/5 w-full h-[250px] bg-black">
        <img
          src="https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          className="object-none w-full h-full"
        />
      </section>
      <section className="flex flex-col gap-3 w-full  md:w-3/5">
        <h1 className="text-3xl font-bold tracking-tight">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h1>
        <div className="flex justify-between">
          <p>@ansabazys</p>
          <div className="flex gap-3">
            <p>16/3/2030</p>
            <p>13:30</p>
          </div>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio illum
          odit nisi dignissimos eligendi, mollitia nam voluptates, sit, debitis
          incidunt qui alias natus eius maiores minus itaque? Quo, nobis optio!
        </p>
      </section>
    </div>
  );
};

export default Post;
