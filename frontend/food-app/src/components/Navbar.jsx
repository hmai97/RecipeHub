import React,{useEffect, useState} from 'react'
import Modal from './Modal'
import InputForm from './inputForm'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false) // login form 
  let token = localStorage.getItem("token")
  const [isLogin, setIsLogin] = useState(token ? false : true)
  let user = JSON.parse(localStorage.getItem("user"))
  const [showLogout, setShowLogout] = useState(false)

  useEffect(() => {
      setIsLogin(token ? false : true)
  }, [token])

  const checkLogin = () => {
      if (token) {
          setShowLogout(!showLogout) // Toggle logout visibility
      } else {
          setIsOpen(true)
      }
  }

  const handleLogout = () => {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setIsLogin(true)
      setShowLogout(false)
  }

  // Function to get user initial
  const getUserInitial = () => {
      if (user?.name) {
          return user.name.charAt(0).toUpperCase()
      }
      return ''
  }

  return (
      <>
          <header>
              <h2>Food Blog</h2>
              <ul>
                  <li><NavLink to="/">Home</NavLink></li>
                  <li onClick={() => isLogin && setIsOpen(true)}>
                      <NavLink to={!isLogin ? "/myRecipe" : "/"}>My Recipe</NavLink>
                  </li>
                  <li onClick={() => isLogin && setIsOpen(true)}>
                      <NavLink to={!isLogin ? "/favRecipe" : "/"}>Favorites</NavLink>
                  </li>
                  <li className="user-avatar-container">
                      {!isLogin ? (
                          <div className="avatar-wrapper" onClick={checkLogin}>
                              <div className="avatar">
                                  {getUserInitial()}
                              </div>
                              {showLogout && (
                                  <div className="logout-option" onClick={handleLogout}>
                                      Logout
                                  </div>
                              )}
                          </div>
                      ) : (
                          <p className='login' onClick={checkLogin}>Login</p>
                      )}
                  </li>
              </ul>
          </header>
          {isOpen && (
              <Modal onClose={() => setIsOpen(false)}>
                  <InputForm setIsOpen={() => setIsOpen(false)} />
              </Modal>
          )}
      </>
  )
}
