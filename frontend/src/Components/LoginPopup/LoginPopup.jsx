import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify'

const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken, userType, setUserType } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Login");

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onLogin = async (e) => {
        e.preventDefault();
        let newUrl = url;
        if (currState === "Login") {
            newUrl += `/api/${userType}/login`;
        } else {
            newUrl += `/api/${userType}/register`;
        }

        // console.log(newUrl)

        try {

            const response = await axios.post(newUrl, data);

            if (response.data.success) {

                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false);

                // alert(`${userType} login successfully`);
                toast.success(`${userType} login successfully`);
            } else {
                toast.error(response.data.message);
                // alert(response.data.message);
            }

        } catch (error) {
            console.error("Error logging in or registering:", error);
            alert("An error occurred. Please try again.");
        }
    };

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData(data => ({ ...data, [name]: value }));
    };

    const handleUserTypeChange = (e) => {
        const value = e.target.value;
        setUserType(value);
        if (value === "hotel") {
            setCurrState("Login"); // Ensure that the state is set to "Login" if userType is hotel
        }
    };

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Sign Up" && userType !== "hotel" && (
                        <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />
                    )}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />

                    <select name="userType" onChange={handleUserTypeChange} value={userType} required>
                        <option value="user">Normal User</option>
                        <option value="hotel">Hotel Owner</option>
                    </select>
                </div>

                <button type='submit'>
                    {currState === "Sign Up"
                        ? "Create account"
                        : "Login"}
                </button>

                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy</p>
                </div>
                {currState === "Login" && userType !== "hotel" && (
                    <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click Here</span></p>
                )}
                {currState === "Sign Up" && (
                    <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                )}
            </form>
        </div>
    );
};

export default LoginPopup;
