import React from 'react'
import "./navbar.css"

export const Navbar = () => {
  return (
    <div className='navbar-container'>
        <h3>Social media</h3>
        <div className="search">
            <input type="text" placeholder='Search Users...' />
        </div>
        <button>Login</button>
    </div>
  )
}
