import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"
import { useEffect } from "react"

function Layout() {

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
        console.error('Failed to get token:', response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log('Token response:', data);
    })
    .catch(error => {
      console.error('Token fetch error:', error);
    });
  }, [])

  return (
    <div className="app">
        <Navbar/>

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