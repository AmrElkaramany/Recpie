import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Favorite from './Components/Favorite/Favorite'
import Notfound from './Components/Notfound/Notfound'
import RecipeDatails from './Components/RecipeDatails/RecipeDatails'

function App() {
  const [search, setSearch] = useState("pizza")
let router = createBrowserRouter([
  {path:"" , element:<Layout setSearch={setSearch}/>, children:[
    {index:true , element:<Home search={search}/>},
    {path:"favorite" , element:<Favorite/>},
    {path:"recipeDetails/:id" , element:<RecipeDatails/>},
    {path:"*" , element:<Notfound/>}

  ] }
])

  return (
    <>
   <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
