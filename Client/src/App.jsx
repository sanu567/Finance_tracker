import { useContext } from 'react'
import React, { useState, useEffect } from 'react';
import { Route, Routes,Navigate } from 'react-router-dom'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
 import { ToastContainer } from 'react-toastify';


function App() {
 
  return (
    <>
      <div>
        <ToastContainer />
         <Routes>
          <Route path="/" element={<Signup />} />
          <Route path='/home' element={<Home/>}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
