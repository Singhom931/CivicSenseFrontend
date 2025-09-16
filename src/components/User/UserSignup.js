import React from 'react'
import Navigation from '../../pages/Navigation'
import Footer from '../../pages/Footer'
import { Link } from 'react-router-dom'

function  UserSignup () {
  return (
    <div>
        <Navigation/>
        <h1> User SignUp</h1>
        <Link to='/user/login'>Click Here to User Login</Link>
        
        <Footer/>
    </div>
  )
}

export default UserSignup