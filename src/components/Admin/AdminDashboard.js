import React from 'react'
import Navigation from '../../pages/Navigation'
import Footer from '../../pages/Footer'

function AdminDashboard() {
    const onResolveClick  = () =>{
        alert("After Clicking this button Issues will be resolved in some days and list will be deleted from Admin Dashboard")
    }
  return (
    <div>
        <Navigation/>
        <div>

        </div>
        <h1 className='mt-5 mb-5 flex justify-center items-center font-semibold text-3xl'>
            Admin DashBoard
        </h1>
    <div className='w-full bg-gradient-to-l from-blue-400 to-cyan-400 border-2 rounded-2xl mb-5'>
        <ul className='text-lg font-semibold text-white p-3'>
            <li>Selected Location</li>
            <li>Issues</li>
            <li>Issues</li>
            <li>Description</li>
            <li>Images</li>
            <li><button className='bg-gradient-to-r from-blue-500 to-green-200  pt-2 pb-2 pl-4 pr-4 text-lg font-bold border-green-200-2 rounded-lg shadow-2xl hover:bg-green-200 text-white translate-x-2' onClick={onResolveClick}>Resolve Issues</button></li>
        </ul>
    </div>

    <div className='w-full bg-gradient-to-l from-blue-400 to-cyan-400 border-2 rounded-2xl mb-5'>
        <ul className='text-lg font-semibold text-white p-3'>
            <li>Selected Location</li>
            <li>Issues</li>
            <li>Issues</li>
            <li>Description</li>
            <li>Images</li>
            <li><button className='bg-gradient-to-r from-blue-500 to-green-200  pt-2 pb-2 pl-4 pr-4 text-lg font-bold border-green-200-2 rounded-lg shadow-2xl hover:bg-green-200 text-white translate-x-2' onClick={onResolveClick}>Resolve Issues</button></li>
        </ul>
    </div>

    <div className='w-full bg-gradient-to-l from-blue-400 to-cyan-400 border-2 rounded-2xl mb-5'>
        <ul className='text-lg font-semibold text-white p-3'>
            <li>Selected Location</li>
            <li>Issues</li>
            <li>Issues</li>
            <li>Description</li>
            <li>Images</li>
            <li><button className='bg-gradient-to-r from-blue-500 to-green-200  pt-2 pb-2 pl-4 pr-4 text-lg font-bold border-green-200-2 rounded-lg shadow-2xl hover:bg-green-200 text-white translate-x-2' onClick={onResolveClick}>Resolve Issues</button></li>
        </ul>
    </div>

    <div className='w-full bg-gradient-to-l from-blue-400 to-cyan-400 border-2 rounded-2xl mb-5'>
        <ul className='text-lg font-semibold text-white p-3'>
            <li>Selected Location</li>
            <li>Issues</li>
            <li>Issues</li>
            <li>Description</li>
            <li>Images</li>
            <li><button className='bg-gradient-to-r from-blue-500 to-green-200  pt-2 pb-2 pl-4 pr-4 text-lg font-bold border-green-200-2 rounded-lg shadow-2xl hover:bg-green-200 text-white translate-x-2' onClick={onResolveClick}>Resolve Issues</button></li>
        </ul>
    </div>

    <div className='w-full bg-gradient-to-l from-blue-400 to-cyan-400 border-2 rounded-2xl mb-5'>
        <ul className='text-lg font-semibold text-white p-3'>
            <li>Selected Location</li>
            <li>Issues</li>
            <li>Issues</li>
            <li>Description</li>
            <li>Images</li>
            <li><button className='bg-gradient-to-r from-blue-500 to-green-200  pt-2 pb-2 pl-4 pr-4 text-lg font-bold border-green-200-2 rounded-lg shadow-2xl hover:bg-green-200 text-white translate-x-2' onClick={onResolveClick} >Resolve Issues</button></li>
        </ul>
    </div>
        
        <Footer/>
    </div>
  )
}

export default AdminDashboard