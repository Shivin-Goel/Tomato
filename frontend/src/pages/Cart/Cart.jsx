import React, { useContext, useEffect } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
    const { cartItems, clearCart, removeFromCart, addToCart, fetchFoodDetails, foodDetails, url, token } = useContext(StoreContext);
    const navigate = useNavigate();

    const cartItemsArray = Object.entries(cartItems);

    useEffect(() => {
        cartItemsArray.forEach(([id]) => {
            fetchFoodDetails(id);
        });
    }, [cartItemsArray]);

    const placeOrder = async () => {
        try {
            const items = cartItemsArray.map(([id, item]) => ({
                foodItemId: id,
                quantity: item.quantity,
            }));

            console.log(cartItemsArray[0])

            const totalPrice = cartItemsArray.reduce((acc, [id, item]) => acc + foodDetails[id]?.price * item.quantity, 0);

            const order = {
                items,
                totalPrice,
                hotelId: cartItemsArray[0][1].hotelId, // Assuming all items are from the same hotel
            };

            const response = await axios.post(`${url}/api/order/orders`, order, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.success) {
                alert('Order placed successfully!');
                clearCart();
                navigate('/orders');
            } else {
                alert('Failed to place order');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('An error occurred while placing the order');
        }
    };

    return (
        <div className='cart'>
            <h2>Your Cart</h2>
            {cartItemsArray.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul>
                    {cartItemsArray.map(([id, item]) => (
                        <li key={id}>
                            <p>Item: {foodDetails[id]?.name || 'Loading...'}</p>
                            <p>Description: {foodDetails[id]?.description || 'Loading...'}</p>
                            <p>Price: ${foodDetails[id]?.price || 'Loading...'}</p>
                            <p>Quantity: {item.quantity}</p>
                            {/* <p>Hotel ID: {item.hotelId}</p> */}
                            <div className='cart-item-controls'>
                                <button onClick={() => removeFromCart(id)}>-</button>
                                <button onClick={() => addToCart(id, item.hotelId)}>+</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={clearCart}>Clear Cart</button>
            <button onClick={()=>navigate('/address')}>Proceed to checkOut</button>
            {/* <button onClick={placeOrder}>Place Order</button> */}
        </div>
    );
}

export default Cart;
