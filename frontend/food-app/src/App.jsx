import React from 'react'
import './App.css'
import Home from './pages/Home'
import MainNav from './components/MainNav'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import axios from 'axios'
import  AddRecipe  from './pages/AddRecipe'

const gettAllRecipes=async()=>{
  let allRecipes=[]  // const {data} = await axios.get(url =>object destructuring)
  await axios.get('http://localhost:5000/recipe').then(res=>{
    allRecipes=res.data
  })
  return allRecipes
}

const getMyRecipes = async()=>{
  let user=JSON.parse(localStorage.getItem("user"))
  let allRecipes=await gettAllRecipes()
  return allRecipes.filter(item=>item.createdBy===user._id)
}
const router = createBrowserRouter([
  {path:"/",element:<MainNav/>,children:[
    {path:"/",element:<Home/>,loader:gettAllRecipes},
    {path:"/myRecipe",element:<Home/>,loader:getMyRecipes},
    {path:"/favRecipe",element:<Home/>},
    {path:"/addRecipe",element:<AddRecipe/>}



  ]}

])
export default function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}
