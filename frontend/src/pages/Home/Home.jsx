import React, { useState } from 'react'
import Header from '../../Components/Header/Header'
import HotelList from '../../Components/HotelList/HotelList'
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay'

const Home = () => {

    const [selectedHotelId, setSelectedHotelId] = useState(null);

    const handleSelectHotel = (hotelId) => {
        setSelectedHotelId(hotelId);
      };

  return (
    <div>
        <Header />
        <HotelList onSelectHotel={handleSelectHotel} />
        {selectedHotelId &&<FoodDisplay hotelId={selectedHotelId} />}
    </div>
  )
}

export default Home 