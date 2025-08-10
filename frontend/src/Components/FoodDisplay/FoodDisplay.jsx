import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import './FoodDisplay.css'

const FoodDisplay = ({ hotelId }) => {
    const [foodItems, setFoodItems] = useState([]);
    const { url } = useContext(StoreContext);

    useEffect(() => {
        const fetchFoodItems = async () => {
            try {
                const response = await axios.get(url + `/api/hotel/${hotelId}/items`);
                setFoodItems(response.data.items);
            } catch (error) {
                console.error('Failed to fetch food items', error);
            }
        };

        if (hotelId) {
            fetchFoodItems();
        }
    }, [hotelId]);

    // console.log(foodItems)

    return (
        <div className='food-display' id='food-display'>
            <h2>Food Items</h2>
            <div className="food-display-list">
                {/* {foodItems.map(item => (
                    <li key={item._id}>{item.name} - ${item.price}</li>
                ))} */}


                {foodItems.map((item, index) => {
                    
                    return (
                        <FoodItem
                            key={index}
                            id={item._id}
                            name={item.name}
                            price={item.price}
                            description={item.description}
                            image={item.imageUrl}
                            hotelId={hotelId}
                        />
                    )

                })}


            </div>
        </div>
    )
}

export default FoodDisplay