import './App.css'
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Loading } from './components/loading/loading'
import { Login } from './components/login/login'

function App() {
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return <Routes>{showLoading ? <Route path="/" element={<Loading />} /> : <Route path="/" element={<Login />} />}</Routes>
}

export default App
