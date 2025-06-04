import { useState } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'

// Pages
import LoginPage from './pages/Login'
import SignupPage from './pages/SignUp'

function App() {

  return (
    <div className='flex flex-col bg-slate-700 min-h-screen'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<h1>Home page</h1>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
      </Routes>
    </div>
  )
}

export default App
