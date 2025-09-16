import React from 'react'
import { Link } from 'react-router-dom'

function Navigation(){
  return (
    <div>
        
      <div className='bg-gradient-to-r from-blue-500 to-green-200 text-2xl text-white flex justify-between font-bold p-5'>
        <h1 className='text-2xl'>
          Civic Resolution Forums
        </h1>
        <Link to='/support' className='bg-blue-300 pt-2 pb-2 pl-4 pr-4 text-lg border-green-200-2 rounded-lg shadow-2xl hover:bg-green-200 text-white translate-x-2'>
          
          Support Us
        </Link>
      </div> 
      
    </div>
  )
}

export default Navigation