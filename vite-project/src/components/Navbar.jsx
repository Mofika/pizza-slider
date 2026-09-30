import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">DvBakes</div>
      <ul className="nav-links">
        <li>Home</li>
        <li>Menu</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="cta-buttons">
        <button className="btn outline">Login</button>
        <button className="btn filled">Order Now</button>
      </div>
    </nav>
  )
}

export default Navbar