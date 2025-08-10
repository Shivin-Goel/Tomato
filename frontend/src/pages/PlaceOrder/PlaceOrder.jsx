import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify'

const PlaceOrder = () => {
    const { cartItems, clearCart, fetchFoodDetails, foodDetails, url, token } = useContext(StoreContext);
    const navigate = useNavigate();

    const cartItemsArray = Object.entries(cartItems);

    useEffect(() => {
        cartItemsArray.forEach(([id]) => {
            fetchFoodDetails(id);
        });
    }, [cartItemsArray, fetchFoodDetails]);

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        hostel: "",
        room: "",
        phone: "",
    });

    const [total, setTotal] = useState(0);

    useEffect(() => {
        const calculateTotal = () => {
            const totalPrice = cartItemsArray.reduce((acc, [id, item]) => acc + (foodDetails[id]?.price || 0) * item.quantity, 0);
            setTotal(totalPrice);
        };

        calculateTotal();
    }, [cartItemsArray, foodDetails]);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const placeOrder = async (e) => {
        e.preventDefault();

        try {
            const items = cartItemsArray.map(([id, item]) => ({
                foodItemId: id,
                quantity: item.quantity,
            }));

            const totalPrice = total;

            const order = {
                items,
                totalPrice,
                hotelId: cartItemsArray.length ? cartItemsArray[0][1].hotelId : null,
                address: data,
            };

            const response = await axios.post(`${url}/api/order/orders`, order, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.success) {
                // alert('Order placed successfully!');
                toast.success(response.data.message);
                clearCart();
                navigate('/user/profile');
            } else {
                toast.error('Failed to place order');
                // alert('Failed to place order');
            }
        } catch (error) {
            console.log('Error placing order:', error);
            alert('An error occurred while placing the order');
        }
    };

    return (
        <form onSubmit={placeOrder} className="place-order">
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
                    <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
                </div>
                <div className="multi-fields">
                    <input required name='hostel' onChange={onChangeHandler} value={data.hostel} type="text" placeholder='Hostel' />
                    <input required name='room' onChange={onChangeHandler} value={data.room} type="text" placeholder='Room' />
                </div>
                <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
            </div>

            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>$ {total}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>$ {total === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>$ {total === 0 ? 0 : total + 2}</b>
                        </div>
                    </div>
                    <button type='submit'>PLACE ORDER</button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
