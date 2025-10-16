import { useContext } from 'react'
import React, { useState, useEffect } from 'react';
import { Route, Routes,Navigate } from 'react-router-dom'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
 import { ToastContainer } from 'react-toastify';


function App() {
   // Initialize user from localStorage
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(storedUser || null);

  // Keep localStorage in sync when `user` changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <>
      <div>
        <ToastContainer />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/signup" />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;