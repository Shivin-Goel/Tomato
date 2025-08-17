import hotelOwnerModel from '../models/hotelOwnerModel.js';
import orderModel from '../models/orderModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from "validator";

const loginHotelOwner = async (req, res) => {

    const { password, email } = req.body;

    try {
        const hotelOwner = await hotelOwnerModel.findOne({ email });

        if (!hotelOwner) {
            return res.json({ success: false, message: "User Doesn't exist" });
        }

        const isMatched = await bcrypt.compare(password, hotelOwner.password)

        if (!isMatched) {
            return res.json({ success: false, message: "Incorrect credentials" });
        }

        const token = createToken(hotelOwner._id);
        return res.json({ success: true, token: token, hotelOwner: hotelOwner });


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }

}


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}


const registerHotelOwner = async (req, res) => {
    const { name, password, email, hotelName } = req.body;

    try {

        const exists = await hotelOwnerModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "Hotel already exists" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be 8 character long" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newHotelOwner = new hotelOwnerModel({
            name: name,
            email: email,
            password: hashedPassword,
            hotelName: hotelName
        })

        const hotelOwner = await newHotelOwner.save();

        const token = createToken(hotelOwner._id);
        res.json({ success: true, token: token, hotelOwner: hotelOwner });

    } catch (error) {

        console.log(error)
        res.json({ success: false, message: "Error" });
    }
}

const getOrders = async (req, res) => {
    try {
        // console.log(req.user);
        const orders = await orderModel.find({ hotelId: req.user._id });
        res.json({ success: true, message: "Your orders loaded", orders: orders });

    } catch (error) {

        console.log(error)
        res.json({ success: false, message: "Error" });
    }
}

const getHotelInfo = async (req, res) => {

    const { name, email, hotelName, _id, profileUrl } = req.user;
    // console.log(req.user);


    try {

        const info = {
            name,
            email,
            hotelName,
            profileUrl,
            _id
        }

        // console.log(info)

        res.json({ success: true, info: info });

    } catch (error) {

        console.log(error)
        res.json({ success: false, message: "Error" });
    }
}


const getAllHotels = async (req, res) => {
    try {
        const hotels = await hotelOwnerModel.find();
        res.json({success:true, hotels : hotels});
    } catch (error) {
        res.json({success:false, error: 'Failed to fetch hotels' });
    }
}

export { registerHotelOwner, loginHotelOwner, getOrders, getHotelInfo, getAllHotels };
