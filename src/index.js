import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Support from './pages/Support';
import UserLogin from './components/User/UserLogin'
import UserSignup from './components/User/UserSignup'
import UserDashBoard from './components/User/UserDashBoard'
import AdminLogin from './components/Admin/AdminLogin'
import AdminSignup from './components/Admin/AdminSignup'
import AdminDashBoard from './components/Admin/AdminDashboard'
import NotFound from './pages/NotFound';
const router = createBrowserRouter([
 {path:"/", element:<App/>},
 {path:"/user/login" , element:<UserLogin/>},
 {path:"/user/signup" , element:<UserSignup/>},
 {path:"/admin/signup", element:<AdminSignup/>},
 {path:"/admin/login", element:<AdminLogin/>},
 {path:"/user/dashboard" , element:<UserDashBoard/>},
 {path:"/admin/dashboard", element:<AdminDashBoard/>},
 {path:"/support" , element:<Support/>},
 {path:'*',element: <NotFound/>}

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
