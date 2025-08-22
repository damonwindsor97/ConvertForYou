import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"  

function Layout() {
  const [tokenReady, setTokenReady] = useState(false); 

  useEffect(() => {
    console.log('Layout: Starting token fetch...');
    
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
        console.error('Layout: Failed to get token:', response.status);
        setTokenReady(true); 
        return null;
      }
      return response.json();
    })
    .then(data => {
      if (data) {
        console.log('Layout: Token response:', data);
      }
      console.log('Layout: Setting tokenReady to true');
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
    </div>
  )
}

export default Layout