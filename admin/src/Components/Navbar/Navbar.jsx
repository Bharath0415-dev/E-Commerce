import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/logo.png'
import navProfile from '../../assets/nav-profile.svg'
function Navbar() {
  return (
    <div className="navbar">
      <div className='nav-left'>
        <img src={navlogo} alt="" className="nav-logo" />
        <div className='nav-info'>
          <h1>BK Retails</h1>
          <p>Admin Pannel</p>
        </div>
      </div>

        <img src={navProfile} className='nav-profile' alt="" />
    </div>
  )
}

export default Navbar