import React from 'react'
import './NewsLetter.css'
function NewsLetter() {
  return (
    <div className="newsletter">
        <h1>Get Exclusive Offers </h1>
        <p>Subscribe to our newsletter and stay updated</p>
        <div className="container">
            <input type="email" placeholder="Enter your email"/>
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default NewsLetter