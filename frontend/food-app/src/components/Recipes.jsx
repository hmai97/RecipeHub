import React from 'react'
import { useLoaderData } from 'react-router-dom'
import foodImg from '../assets/food.jpg'
import { IoIosHeartEmpty } from "react-icons/io";
import { IoTimerOutline } from "react-icons/io5";


export default function Recipes() {
    const allRecipes = useLoaderData()
    console.log(allRecipes)
  return (
    <div className='card-container'>
        {
            allRecipes?.map((item,index) => {
                return (
                    <div key={index} className='card'>
                        <img src ={`http://localhost:5000/images/${item.image}`} width="120px" height="100px" display="block"></img>
                        <div className='card-body'>
                            <div className='title'>{item.title}</div>
                             <div className='icons'>
                                <div className='timer'> <IoTimerOutline/> {item.time}</div>
                                <IoIosHeartEmpty/>
                            </div>   
                        </div>   
                                      
                    </div>
                )
            })
        }
      
    </div>
  )
}
