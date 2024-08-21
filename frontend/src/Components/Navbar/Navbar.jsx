import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import cart_icon from '../../assets/cart_icon.png'
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../../assets/nav_dropdown.png'
function Navbar() {

    const [menu,setmenu]=useState("shop");
    const {getTotalCartItems}= useContext(ShopContext)
    const menuRef=useRef();

    const dropdown_toggle=(e)=>{
        menuRef.current.classList.toggle('nav-menu-visible')
        e.target.classList.toggle('open')
    }
  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="" />
            <p>BK Retails</p>
        </div>
        <img className='nav-dropdown' onClick={dropdown_toggle}src={nav_dropdown} alt="" />
        <ul ref={menuRef} className="nav-menu">
            <li onClick={()=>{setmenu("shop")}}><Link to="/" style={{textDecoration:'none'}}>Shop</Link>{menu==="shop"?<hr/>:<></> }</li>
            <li onClick={()=>{setmenu("men")}}><Link to="/mens" style={{textDecoration:'none'}}>Mens</Link>{menu==="men"?<hr/>:<></>}</li>
            <li onClick={()=>{setmenu("women")}}><Link to="/womens" style={{textDecoration:'none'}}>Women</Link>{menu==="women"?<hr/>:<></>}</li>
            <li onClick={()=>{setmenu("kids")}}><Link to="/kids" style={{textDecoration:'none'}}>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
            {localStorage.getItem('auth-token')?<button onClick={()=>{localStorage.removeItem('auth-token'); window.location.replace('/')}}>Logout</button>:<Link to="/login"> <button>Login</button></Link>}
       
        <Link to="/cart">  <img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
    </div>
  )
}

export default Navbar