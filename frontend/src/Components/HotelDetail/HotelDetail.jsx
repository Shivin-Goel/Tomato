import React, { useContext, useEffect, useState } from 'react';
import './HotelDetail.css';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

const HotelDetail = () => {
    const { onLoad, hotelInfo, token } = useContext(StoreContext);

    useEffect(() => {
        if (token) {
            onLoad(token);
        }
    }, [token, onLoad]);

    // const hotelDetails = {
    //     name: 'Sunshine Hotel',
    //     email: 'contact@sunshinehotel.com',
    //     owner: 'John Doe'
    // };

    return (
        <div className='hotel-detail'>
            <h2>Hotel Details</h2>
            <div className='detail'>
                <strong>Hotel Name:</strong> {hotelInfo.hotelName}
            </div>
            <div className='detail'>
                <strong>Email:</strong> {hotelInfo.email}
            </div>
            <div className='detail'>
                <strong>Owner:</strong> {hotelInfo.name}
            </div>
            <div className='detail'>
                <img className='hotel-profile' src={hotelInfo.profileUrl} alt="" />
            </div>
        </div>
    );
};

export default HotelDetail;
