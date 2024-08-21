import React, { useState } from 'react'
import './CSS/LoginSignup.css'
function LoginSignup() {

  const [state,setState]= useState("Login")
  const [formData,setFormdata]= useState({
    username:"",
    email:"",
    password:"",
  })

  const changeHandler =(e)=>[
    setFormdata({...formData,[e.target.name]:e.target.value})
  ]

  const login = async ()=>{
    let respnseData;
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
    }).then((resp)=>resp.json()).then((data)=>respnseData=data)

    if(respnseData.success){
      localStorage.setItem('auth-token',respnseData.token);
      window.location.replace("/");
    }
  }

  const signup = async ()=>{
    let respnseData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
    }).then((resp)=>resp.json()).then((data)=>respnseData=data)

    if(respnseData.success){
      localStorage.setItem('auth-token',respnseData.token);
      window.location.replace("/");
    }
  }
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your name'/>:<></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password'/>
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state==="Sign Up"?<p className='loginsignup-login'>Already have an account?<span onClick={()=>{setState("Login")}}> login here</span></p>:
        <p className='loginsignup-login'>Create an account<span onClick={()=>{setState("Sign Up")}}> Click here</span></p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id=''/>
          <p>By cotinuing, I agree to the terms of use and privacy policy</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup