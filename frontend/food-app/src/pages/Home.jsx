import React, {useState} from 'react'
import foodRecipe from '../assets/foodRecipe.png'
import Recipes from '../components/Recipes'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import InputForm from '../components/inputForm'
export default function Home() {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const addRecipe = () => {
        let token = localStorage.getItem("token")
        if (token)
            navigate("/addRecipe")
        else {
            setIsOpen(true)
        }
    }

  return (
    <>
        <section className='home'>
            <div className='left'>
                <h1>Food Recipe</h1>
                <h5> stry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</h5>
                <button onClick={addRecipe}>Share your recipe</button>
            </div>
            <div className='right'>
                <img src={foodRecipe} width="320px" height="300px"></img>
            </div>
        </section>
        <div className ='bg' >
        </div>
              {(isOpen) && <Modal onClose={()=>setIsOpen(false)}> 
                <InputForm setIsOpen={()=>setIsOpen(false)}/>
              </Modal>}
        <div className='recipe'>
            <Recipes/>
        </div>
    </>
  )
}
