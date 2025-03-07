import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Shop from './Pages/Shop'
import ShopCategory from './Pages/ShopCategory'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import LoginSignup from './Pages/LoginSignup'
import Footer from './Components/Footer/Footer'
import men_banner from './assets/banner_mens.png'
import women_banner from './assets/banner_women.png'
import kids_banner from './assets/banner_kids.png'
function App() {

  return (
    <>
    <BrowserRouter>
     <Navbar/>
     <Routes>
      <Route path='/' element={<Shop/>}/>
      <Route path='/mens' element={<ShopCategory banner={men_banner}category="men"/>}/>
      <Route path='/womens' element={<ShopCategory  banner={women_banner} category="women"/>}/>
      <Route path='/kids' element={<ShopCategory  banner={kids_banner} category="kid"/>}/>
      <Route path='/product' element={<Product/>}>
        <Route path=':productID' element={<Product/>}/>
      </Route>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/login' element={<LoginSignup/>}/>
     </Routes>
     <Footer/>
     </BrowserRouter>
    </>
  )
}

export default App
