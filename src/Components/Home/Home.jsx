import React, { useEffect, useState } from "react";
import Style from "./Home.module.css";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import ReactPaginate from 'react-paginate';

export default function Home({ search }) {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const itemsPerPage = 8 
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const getRecipe = async () => {
    try {
      const word = search === "" ? "pizza" : search;
      const { data } = await axios.get(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${word}`
      );
      console.log(data.data.recipes);
      setProducts(data.data.recipes);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    if(localStorage.getItem("myFavorites")){
      setFavorites(JSON.parse(localStorage.getItem("myFavorites")))
    }
  }, [])
  


  const checkFavorite = (recipeId) => {
    return favorites.some((fav) => fav.id === recipeId);
  };

  const heartClick = (recipe ,e) => {
e.stopPropagation()
e.preventDefault()
    let newFavorite;
    if (checkFavorite(recipe.id)) {
      newFavorite = favorites.filter((fav) => fav.id !== recipe.id);
    }
    else {
      newFavorite =  [...favorites , recipe]
    }
    setFavorites(newFavorite)
    localStorage.setItem("myFavorites" , JSON.stringify(newFavorite))
  };



   useEffect(() => {
    getRecipe();
  }, [search]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <ClipLoader size={100} color="green" />
      </div>
    );
  }


  return (
    <>
      <main>
        <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4 p-4 md:p-8">
          {currentItems.map((recipe) => (
            <div className="shadow p-4 hover:scale-105 transition-all duration-300" key={recipe.id}>
              <Link to={`/recipeDetails/${recipe.id}`}>
                <img
                  src={recipe.image_url}
                  alt={recipe.title}
                  className="w-full h-60"
                />
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold my-4 ">
                    {recipe.title.split(" ").slice(0, 3).join(" ")}
                  </h2>
                  <div onClick={(e) => heartClick(recipe ,e)}>
                    <FaHeart
                      size={20}
                      className={`${
                        checkFavorite(recipe.id)
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    />
                  </div>
                </div>
              </Link>
              
            </div>
            
          ))}

        </div>

      
      </main>
      
          <div className="grid my-4">
            
            <div className="flex justify-center items-center ">
            <ReactPaginate
        breakLabel="..."
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        //  containerClassName="flex items-center space-x-2"
        //       pageClassName="mx-1"
        //       pageLinkClassName="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 font-medium"
        //       previousClassName="mx-1"
        //       previousLinkClassName="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 font-medium"
        //       nextClassName="mx-1"
        //       nextLinkClassName="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 font-medium"
        //       breakClassName="mx-1"
        //       breakLinkClassName="px-4 py-2 text-gray-500"
        //       activeClassName="bg-green-500 text-white border-green-500"
        //       activeLinkClassName="px-4 py-2 bg-green-500 text-white rounded-lg border-green-500 hover:bg-green-600 transition-all duration-200 font-medium"
        //       disabledClassName="opacity-50 cursor-not-allowed"
        containerClassName="flex items-center space-x-2"
        pageLinkClassName="px-3 py-2 border cursor-pointer "
        activeLinkClassName="bg-green-500 text-white border-green-500 "
                   previousLinkClassName="cursor-pointer px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 font-medium"
           disabledClassName="opacity-50 cursor-not-allowed"
              nextLinkClassName="px-4 cursor-pointer py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 font-medium"

        renderOnZeroPageCount={null}
      />
        </div>
          </div>
    </>
  );
}
