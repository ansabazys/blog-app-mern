import React from "react";
import Navbar from "../components/Navbar";

const Profile = () => {
  return (
    <div>
      <Navbar />
      <div className="flex w-full justify-center ">
        <div className="md:w-3/5 w-full px-5 flex flex-col justify-center">

          <main className="grid place-content-center w-full h-[90lvh]">
            <div className=" flex flex-col w-full items-center text-center gap-8  p-5">
              <div>
                <h1 className="md:text-4xl text-3xl font-bold tracking-tighter">
                  Profile
                </h1>
              </div>
              <form action="" className="flex flex-col md:w-72 gap-2">
                <input
                  type="text"
                  placeholder="Your username"
                  className="h-10 w-full flex justify-between items-center rounded-md py-2 px-3 border border-gray-300 "
                />
                <input
                  type="email"
                  placeholder="Your email"
                  className="h-10 w-full flex justify-between items-center rounded-md py-2 px-3 border border-gray-300 "
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="h-10 w-full flex justify-between items-center rounded-md py-2 px-3 border border-gray-300 "
                />
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="h-10 w-full flex justify-between items-center rounded-md py-2 px-3 border border-gray-300 "
                />
                <div className="flex gap-2 flex-grow">
                <button className="h-10 w-max px-6 mt-5 flex justify-center items-center rounded-md bg-black text-white ">
                  Update
                </button>
                <button className="h-10 mt-5 md:w-full w-max px-6 flex justify-center items-center rounded-md bg-red-900 text-white ">
                  Delete account
                </button>
                </div>
                
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
