import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const url = "https://tomato-backend-lutg.onrender.com";
    const [token, setToken] = useState("");
    const [userType, setUserType] = useState("user");

    const [cartItems, setCartItems] = useState({});

    const [hotelInfo, setHotelInfo] = useState({});
    const [foodDetails, setFoodDetails] = useState({});

    useEffect(() => {
        // Check if token exists in localStorage on component mount (or page refresh)
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            // Perform any necessary actions with the token, like fetching hotel info
            onLoad(storedToken);
        }
    }, []);

    const onLoad = async (token) => {
        try {

            const response = await axios.get(url + "/api/hotel/info", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.success) {
                const info = response.data.info;
                setHotelInfo(info);

            } else {
                alert(response.data.message);
            }

        } catch (error) {
            alert("An error occurred. Please try again.");
            console.log(error)
        }
    }

    const addToCart = (id, hotelId) => {
    setCartItems((prevItems) => {
        // If cart already has items from a different hotel
        const existingHotelIds = Object.values(prevItems).map(item => item.hotelId);
        if (existingHotelIds.length > 0 && existingHotelIds[0] !== hotelId) {
            alert("You can only order from one hotel at a time!");
            return prevItems; // do not update cart
        }

        // Otherwise, add/update the item
        return {
            ...prevItems,
            [id]: {
                quantity: (prevItems[id]?.quantity || 0) + 1,
                hotelId: hotelId
            }
        };
    });
};


    const removeFromCart = (id) => {
        setCartItems((prevItems) => {
            const newItems = { ...prevItems };
            if (newItems[id]) {
                newItems[id].quantity -= 1;
                if (newItems[id].quantity <= 0) {
                    delete newItems[id];
                }
            }
            return newItems;
        });
    };

    const clearCart = () => {
        setCartItems({});
    };


    const fetchFoodDetails = async (id) => {
        if (!foodDetails[id]) {
            const response = await axios.get(`${url}/api/hotel/${id}`);
            setFoodDetails((prevDetails) => ({
                ...prevDetails,
                [id]: response.data,
            }));
        }
    };

    const contextValue = {
        token,
        setToken,
        url,
        userType,
        setUserType,
        hotelInfo,
        onLoad,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        fetchFoodDetails,
        foodDetails,
    }


    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
