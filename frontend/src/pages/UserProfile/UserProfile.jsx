import React, { useContext, useEffect, useState } from 'react';
import './UserProfile.css';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

const UserProfile = () => {
  const { url, token } = useContext(StoreContext);
  const [allOrders, setAllOrders] = useState([]); // Initialize allOrders as an empty array
  const [foodItemsDetails, setFoodItemsDetails] = useState([{}]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(url + "/api/user/myOrders", {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        const orders = response.data.orders;
        setAllOrders(orders);

        const foodDetailsPromises = orders.flatMap(order =>
          order.items.map(item => fetchFood(item.foodItemId))
        );

        const foodDetails = await Promise.all(foodDetailsPromises);

        const foodDetailsMap = {};

        foodDetails.forEach(detail => {
          if (detail && detail._id) {
            foodDetailsMap[detail._id] = detail;
          }
        });
        
        setFoodItemsDetails(foodDetailsMap);
      } else {
        alert("Error fetching orders");
        console.log(response.data.error);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchFood = async (id) => {
    try {
      const response = await axios.get(url + `/api/user/${id}`);
      if (response.data.success) {
        return response.data.foodDetail[0];
      } else {
        console.error("Error fetching food item detail:", response.data.error);
        return null;
      }
    } catch (error) {
      console.error("Error fetching food item detail:", error);
      return null;
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {allOrders.map((order, index) => (
          <div key={index} className="my-orders-order">
            <p>
              {order.items.map((item, itemIndex) => {
                const foodItem = foodItemsDetails[item.foodItemId];
                const itemDetail = foodItem ? `${foodItem.name} x ${item.quantity}` : "Loading...";
                return itemIndex === order.items.length - 1 ? itemDetail : `${itemDetail}, `;
              })}
            </p>
            <p>${order.totalPrice}.00</p>
            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
            <button onClick={fetchOrders}>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;