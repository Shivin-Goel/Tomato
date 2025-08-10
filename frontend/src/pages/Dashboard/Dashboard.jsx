import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './Dashboard.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import HotelDetail from '../../Components/HotelDetail/HotelDetail'
import AddFoodItem from '../../Components/AddFoodItem/AddFoodItem'
import ListFoodItem from '../../Components/ListFoodItem/ListFoodItem'
import GetAllOrders from '../../Components/GetAllOrders/GetAllOrders'

const Dashboard = () => {

    const [selectedComponent, setSelectedComponent] = useState('details');

    const renderComponent = () => {
        switch (selectedComponent) {
          case 'add':
            return <AddFoodItem />;
          case 'list':
            return <ListFoodItem />;
          case 'orders':
            return <GetAllOrders />;
          default:
            return <HotelDetail />;
        }
      };

  return (
    <div className='dashboard-content'>
        <Sidebar setSelectedComponent={setSelectedComponent}/>
        {renderComponent()}
    </div>
  )
}

export default Dashboard