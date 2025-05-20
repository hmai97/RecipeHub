import axios from 'axios'
import React,{useState} from 'react'

export default function InputForm({setIsOpen}) {
    const [name, setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [isSignUp, setIsSignUp] = useState(false)
    const [error,setError] = useState("")

    const handleSubmit = async (e) =>{
        e.preventDefault() //prevent from reloading on form submit
        let endpoint = (isSignUp) ? "signUp" : "login"
        await axios.post(`http://localhost:5000/${endpoint}`,{name,email,password})
        .then((res)=>{
            localStorage.setItem("token",res.data.token),
            localStorage.setItem("user", JSON.stringify(res.data.user)),
            setIsOpen()
        })
        .catch(data=>setError(data.response?.data?.error))
    }

  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
          {isSignUp && (
            <div className='form-control'>
              <label>Name</label>
              <input
              type="text"
              className='input'
              onChange={(e) => setName(e.target.value)}
              required={isSignUp}
            />
            </div>
          )}
            <div className ='form-control'>
                <label>Email</label>
                <input type="email" className='input' onChange={(e)=>setEmail(e.target.value)} required></input>
            </div>
            <div className='form-control'>
                <label>Password</label>
                <input type="password" className='input' onChange={(e)=>setPassword(e.target.value)} required></input>
            </div>
            <button type='submit'> {(isSignUp) ? "Sign Up" : "Login"} </button><br></br>
            {(error!="") && <h6 className="error">{error}</h6>} <br></br>
            <p onClick={()=>setIsSignUp(pre=>!pre)}> {(isSignUp)?"Already have an account" : "Create a new account"}</p>
      </form>
    </>
  )
}
