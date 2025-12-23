import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import Header from './components/header/header'
import Footer from './components/footer/footer'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-white '>
      <div className='w-full block'>
        <Header />
        <main className='mt-5 mb-10 text-1xl text-blue-950 font-semibold' >
        TODO: 
         <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App