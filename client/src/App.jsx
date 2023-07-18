import './App.css'
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Loading } from './components/loading/loading'
import { Login } from './components/login/login'
import { Register } from './components/register/register'
import { DashBoard } from './components/dashboard/dashboard'
import { useNavigate } from 'react-router-dom'

import Cookies from 'js-cookie'

function App() {
  const [showLoading, setShowLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) navigate('/')
    if (token) navigate('/dashboard')
  }, [])

  return (
    <Routes>
      {showLoading ? <Route path="/" element={<Loading />} /> : <Route path="/" element={<Login />} />}
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<DashBoard />} />
    </Routes>
  )
}

export default App
