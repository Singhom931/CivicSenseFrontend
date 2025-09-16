import React from 'react'
import Footer from './Footer'
import Navigation from './Navigation'
import { Link } from 'react-router-dom'

function Support() {
  return (
    <div>
        <Navigation/>
        <div>
          <div className='min-h-screen bg-gradient-to-br from-white to-softmint mb-5'>
          <h1 className=' flex justify-center items-center text-3xl pt-44 pb-10 font-bold '>Support Us</h1>
          <h3 className='text-center'>
            Civic sense is not just about following rules; it is about showing respect for our society and working together for its betterment. Today, we see issues like littering, traffic indiscipline, and neglect of public property that harm our community. But these problems can be solved if each of us takes responsibility. Let us contribute by keeping our surroundings clean, following laws, and showing kindness to others. Together, we can create a safer, cleaner, and more harmonious society. Change begins with us—so let’s improve our civic sense and build a better future for everyone.<br></br> 
            <span className='font-semibold'>Support Environment by promoting cleaniness towards our environment</span>
            
          </h3>
          <div className='flex justify-center items-center gap-20 pt-5'>
            <Link to="/admin/login"  className='bg-gradient-to-r from-blue-500 to-green-200  pt-2 pb-2 pl-4 pr-4 text-2xl font-bold border-green-200-2 rounded-lg shadow-2xl hover:bg-green-200 text-white translate-x-2'>Admin</Link>
            <Link to="/user/dashboard" className='bg-gradient-to-r from-blue-500 to-green-200  pt-2 pb-2 pl-4 pr-4 text-2xl font-bold border-green-200-2 rounded-lg shadow-2xl hover:bg-green-200 text-white translate-x-2'>User</Link>
          </div>
          </div >
        </div >

        <Footer/>
    </div>
  )
}

export default Support