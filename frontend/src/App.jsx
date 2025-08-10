import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import LoginPopup from './Components/LoginPopup/LoginPopup';
import Home from './pages/Home/Home';
import UserProfile from './pages/UserProfile/UserProfile';
import Footer from './Components/Footer/Footer';
import Dashboard from './pages/Dashboard/Dashboard';
import AddFoodItem from './Components/AddFoodItem/AddFoodItem'
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';

const App = () => {

  const [showLogin,setShowLogin] = useState(false);
  // const [isDashboardOpen,setIsDashboardopen] = useState(true);


  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}

      <div className='app'>
        <Navbar setShowLogin = {setShowLogin}/> 
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/hotel/dashboard' element={<Dashboard />}/>
          <Route path='/hotel/dashboard/add' element={<AddFoodItem/>}/>
          <Route path='/user/profile' element={<UserProfile />}/>
          <Route path='/cart' element={<Cart/>} />
          <Route path='/address' element={<PlaceOrder/>} />

        </Routes>
      </div>

      <Footer />
    </>
  )
}

export default App