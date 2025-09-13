import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import './HotelList.css'
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';

const HotelList = ({ onSelectHotel }) => {
    const [hotels, setHotels] = useState([]);
    const { url } = useContext(StoreContext);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get(url + '/api/hotel/allHotels');
                setHotels(response.data.hotels);
            } catch (error) {
                console.error('Failed to fetch hotels', error);
            }
        };

        fetchHotels();
    }, []);

    return (
        <div className='explore-hotel' id='explore-menu'>
            <h2>Explore our canteen</h2>
            <p className='explore-hotel-text'> Choose from a diverse menu featuring a delectable array of dishes. Where flavors dance on your palate, each dish a symphony of taste, crafted with passion and served with warmth, inviting you to savor moments of culinary delight. </p>

            <div className="explore-hotel-list">
                {hotels.map(hotel => {
                    return (
                        <div onClick={() => onSelectHotel(hotel._id)} key={hotel._id} className='explore-hotel-list-item'>
                            <img src={hotel.profileUrl || assets.profile_icon} alt="" />
                            <p>{hotel.hotelName}</p>
                        </div>
                    )
                })}
            </div>


        </div>
    );
};

export default HotelList;
