import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import ProtectedRoute from './components/layout/ProtectedRoute'
import Register from './pages/Register'
import Todos from './pages/Todos'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route
          path="/todos"
          element={
            <ProtectedRoute>
              <Todos/>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/todos" replace/>}/> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
