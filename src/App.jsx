import React from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nopage from './Pages/Nopage';
import Home from './Pages/Home';
const App = () => {
  return (
    <>
      <BrowserRouter>
     
      

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="*" element={<Nopage/>} />
       
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
