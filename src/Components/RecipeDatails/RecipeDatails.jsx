import React, { useEffect, useState } from 'react'
import Style from "./RecipeDatails.module.css"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { ClipLoader } from "react-spinners";

export default function RecipeDatails() {

  let {id} = useParams()
  console.log(id);
    const [recipeDetails, setRecipeDetails] = useState([])
    const [isLoading, setIsLoading] = useState(true)

  const getRecipeDetails = async(id)=>{
   try {
     const {data} = await axios.get(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
    console.log(data.data.recipe);
    setRecipeDetails(data.data.recipe)
   } catch (error) {
    console.log(error);
   }finally{
    setIsLoading(false)
   }

  }
  useEffect(() => {
    getRecipeDetails(id)
  }, [])
  

  if(isLoading){
    return <div className='flex justify-center items-center'>
      <ClipLoader size={100} color='green'/>
    </div>
  }

  return (
    <>
    <main>
         <div className="  flex justify-center items-center flex-col" key={recipeDetails.id}>
              <div className='shadow p-5 '>
                  <img
                  src={recipeDetails.image_url}
                  alt={recipeDetails.title}
                  className="w-80 h-60"
                />
                  <h2 className="text-xl font-semibold my-4 ">
                    {recipeDetails.title}
                  </h2>
                  <h2>Publisher : {recipeDetails.publisher}</h2>
                  <h2>Servings : {recipeDetails.servings}</h2>
                  <h2 className=''>cooking time : {recipeDetails.cooking_time}</h2>
              <a className='px-5 py-4 bg-blue-500 rounded-lg mt-5 block text-center text-white text-xl hover:bg-blue-800 transition-all duration-300' href={recipeDetails.source_url} target='_blank' >view Full recipe</a>
              </div>
                
            </div>
    </main>
    
    
    
    
    </>
  )
}
