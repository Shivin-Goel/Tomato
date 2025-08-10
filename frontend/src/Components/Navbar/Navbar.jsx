import React, { useContext, useState, useEffect } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';


const Navbar = ({setShowLogin}) => {

    const [menu, setMenu] = useState("home");
    const {token,setToken,userType,setUserType,cartItems} = useContext(StoreContext);
    const navigate = useNavigate();

    const objLength = Object.entries(cartItems).length;


    useEffect(() => {
        // Retrieve token and userType from localStorage when the component mounts
        const storedToken = localStorage.getItem('token');
        const storedUserType = localStorage.getItem('userType');
        if (storedToken) {
            setToken(storedToken);
        }
        if (storedUserType) {
            setUserType(storedUserType);
        }
    }, [setToken, setUserType]);



    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        setToken("");
        setUserType("");
        navigate("/");
    }

    // Store token and userType in localStorage whenever they change
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);


    useEffect(() => {
        if (userType) {
            localStorage.setItem('userType', userType);
        } else {
            localStorage.removeItem('userType');
        }
    }, [userType]);


    return (
        <div className='navbar'>
            <Link to='/' onClick={() => setMenu("home")}><img src={assets.logo} alt="" className='logo' /></Link>
            <ul className="navbar-menu">
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
                <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
                <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={objLength === 0 ? "" : "dot"}></div>
                </div>

                {/* {console.log(token)} */}

                {!token ? <button onClick={() => setShowLogin(true)}>Sign in</button>
                    :
                    <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="" />
                        <ul className="nav-profile-dropdown">

                        {userType === "user" 
                            ? <li onClick={() => navigate('/user/profile')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                            : <li onClick={() => navigate('/hotel/dashboard')}><img src={assets.bag_icon} alt="" /><p>Dashboard</p></li>
                        }

                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar