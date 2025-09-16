import './App.css';
import Footer from './pages/Footer';
import { Link } from 'react-router-dom';
function App() {
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
      <div className='min-h-screen bg-gradient-to-br from-white to-softmint '>


        <div className=' pt-44'>
          <h1 className='text-bg-gradient-to-r from-blue-500 to-green-200 flex justify-center items-center text-4xl text-black font-bold'>
            Are you a??
          </h1>
          <h3 className='flex justify-center items-center font text-center w-full'>Join the movement to protect our oceans and beaches. <br></br>Participate in cleanup events or organize your own to make a real difference in your community.</h3>
          <div className='flex justify-center items-center gap-20 pt-5'>
            <Link to="./admin/login"  className='bg-gradient-to-r from-blue-500 to-green-200  pt-2 pb-2 pl-4 pr-4 text-2xl font-bold border-green-200-2 rounded-lg shadow-2xl hover:bg-green-200 text-white translate-x-2'>Admin</Link>
            <Link to="./user/login" className='bg-gradient-to-r from-blue-500 to-green-200  pt-2 pb-2 pl-4 pr-4 text-2xl font-bold border-green-200-2 rounded-lg shadow-2xl hover:bg-green-200 text-white translate-x-2'>User</Link>
          </div>
        </div>
      </div>

    <Footer/>

    </div>
  );
}

export default App;
