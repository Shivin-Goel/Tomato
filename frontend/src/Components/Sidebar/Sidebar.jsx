import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'

const Sidebar = ({setSelectedComponent }) => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <div onClick={() => setSelectedComponent('details')} className="sidebar-option">
                <img src={assets.profile_icon} alt="" />
                <p>Profile Details</p>
            </div>
            <div onClick={() => setSelectedComponent('add')} className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Add Items</p>
            </div>
            <div onClick={() => setSelectedComponent('list')} className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>List Items</p>
            </div>
            <div onClick={() => setSelectedComponent('orders')} className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Orders</p>
            </div>
        </div>
    </div>
  )
}

export default Sidebar