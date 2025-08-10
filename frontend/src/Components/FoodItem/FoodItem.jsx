import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({ id, name, price, description, hotelId, image }) => {

    const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
    // console.log(imageUrl)
    return (
        <div className='food-item'>
            <div className="food-item-image-container">
                <img src={image} className='food-item-image' alt="" />
                {
                    !cartItems[id] ? <img className='add' onClick={() => addToCart(id,hotelId)} src={assets.add_icon_white}></img>
                        : <div className='food-item-counter'>
                            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                            <p>{cartItems[id].quantity}</p>
                            <img onClick={() => addToCart(id,hotelId)} src={assets.add_icon_green} alt="" />
                        </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>

                <p className="food-item-description">
                    {description}
                </p>

                <p className="food-item-price">
                    ${price}
                </p>
            </div>
        </div>
    )
}

export default FoodItem