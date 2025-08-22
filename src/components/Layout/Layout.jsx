import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"  
import { ToastContainer, toast } from 'react-toastify';

function Layout() {
  const [tokenReady, setTokenReady] = useState(false); 

  useEffect(() => {
    
    fetch(`${import.meta.env.VITE_API_ENDPOINT}/server/token`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        toast.error(`Failed to get token - refresh page, then contact support if issue persists.`);
        setTokenReady(true); 
        return null;
      }
      return response.json();
    })
    .then(data => {
      if (data) {
        toast.success('Guest user logged in!');
      }

      setTokenReady(true);
    })
    .catch(error => {
      console.error('Layout: Token fetch error:', error);
      setTokenReady(true);  
    });
  }, [])

  return (
    <div className="app">
        <Navbar tokenReady={tokenReady} /> 

        <div className="app-content flex-grow pb-10">
            <Outlet/>
        </div>

        <div className="">
            <Footer/>
        </div>
        <ToastContainer position="top-right" autoClose={4000} />
    </div>
  )
}

export default Layout