import React from "react";
import Style from "./Navbar.module.css";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar({setSearch}) {
  return (
    <>
      <main>
        <nav className="bg-[#1F2937] p-8 fixed w-full">
          <div className="flex justify-between items-center">
            <Link to={"/"} className="font-bold text-4xl text-white">Forkify </Link>
            <input
              type="text"
              placeholder="Search Recipe"
              className="bg-white px-8 py-4 rounded-xl  md:w-lg "
              onChange={(e)=>setSearch(e.target.value)}
            />
            <Link to={"favorite"}>
              <FaHeart size={30} color="white" />
            </Link>
          </div>
        </nav>
      </main>
    </>
  );
}
