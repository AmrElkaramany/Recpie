import React, { useEffect, useState } from "react";
import Style from "./Favorite.module.css";
import { Link } from "react-router-dom";

export default function Favorite() {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("myFavorites")) {
      setFavorites(JSON.parse(localStorage.getItem("myFavorites")));
    }
  }, []);



  const deleteFavorite = (recipeId)=>{
   const update =  favorites.filter((fav)=>fav.id!==recipeId)
   setFavorites(update)
   localStorage.setItem("myFavorites" , JSON.stringify(update))
  }

  return (
    <>
      <main>
        {favorites.length === 0 ? (
          <div className="flex justify-center items-center flex-col  ">
            <h1>No Recipe To Show</h1>
            <Link to={"/"}>
              <button className="px-6 py-4 text-white my-4 rounded-lg cursor-pointer bg-blue-600 hover:bg-blue-400 transition-all duration-300">
                Back To Home
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4 p-4 md:p-8">
            {favorites.map((recipe) => (
              <div className="shadow p-4" key={recipe.id}>
                <img
                  src={recipe.image_url}
                  alt={recipe.title}
                  className="w-full h-60"
                />
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold my-4 ">
                    {recipe.title.split(" ").slice(0, 3).join(" ")}
                  </h2>
                </div>
                <button onClick={()=>deleteFavorite(recipe.id)} className="px-6 py-4 bg-red-500 hover:bg-red-400 transition-all duration-300 w-full text-white text-xl cursor-pointer ">
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
