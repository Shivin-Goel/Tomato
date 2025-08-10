import React, { useContext, useEffect, useState } from 'react';
import './GetAllOrders.css';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';


const GetAllOrders = () => {

    const { url, token } = useContext(StoreContext);
    const [allOrders, setAllOrders] = useState([]);
    const [foodItemsDetails, setFoodItemsDetails] = useState([{}]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(url + "/api/hotel/getOrders", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            // console.log(response.data.orders)

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
    }

    const fetchFood = async (id) => {
        try {
            const response = await axios.get(url + `/api/user/${id}`);


            console.log(response.data.foodDetail[0]);


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

    const statusHandler = async (e, orderId) => {
        const response = await axios.post(url + "/api/order/status", {
            orderId,
            status: e.target.value
        })

        if (response.data.success) {
            await fetchOrders();
        }
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className='my-orders hotel'>
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
                        <p className="order-item-name">
                        {
                            order.address.firstName + " " + order.address.lastName + " " + order.address.hostel + " " + order.address.phone 
                        }
                        </p>
                        {/* <p className='order-item-phone'>{order.address.phone}</p> */}
                        
                        <p>${order.totalPrice}.00</p>
                        {/* {console.log(order.address)} */}
                        
                        <select onChange={(e) => statusHandler(e, order._id)} value={order.status}>
                            <option value="Food Processing">Food Processing</option>
                            <option value="Out for delivery">Out for delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GetAllOrders
