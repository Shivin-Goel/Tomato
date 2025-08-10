import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from "validator";
import orderModel from "../models/orderModel.js";
import foodItemModel from "../models/foodItemModel.js";

const loginUser = async (req,res) => {
    const {email,password} = req.body;

    try {
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false,message:"User Doesn't exist"});
        }

        const isMatched = await bcrypt.compare(password,user.password)
        
        if(!isMatched){
            return res.json({success:false,message:"Incorrect credentials"});
        }

        const token = createToken(user._id);
        return res.json({success:true,token:token,user:user});


    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

const registerUser = async (req,res) => {
    const {name,password,email} = req.body;
    // console.log(req.body);

    try {
        
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already exists"})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }

        if(password.length < 8){
            return res.json({success:false,message:"Password must be 8 character long"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save();

        const token = createToken(user._id);
        res.json({success:true,token:token,user:user});

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"});
    }
}

const myOrders = async (req,res) => {
    try {
        // console.log(req.user);
        const orders = await orderModel.find({ userId: req.user._id });
        res.json({ success: true, message: "Your orders loaded", orders:orders });
        
    } catch (error) {
        
        console.log(error)
        res.json({ success: false, message: "Error" });
    }
}

const myFoodItemDetail = async (req,res) => {
    try {
        const foodDetail = await foodItemModel.find({ _id: req.params.foodId });
        res.json({ success: true, foodDetail: foodDetail });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export {loginUser,registerUser,myOrders,myFoodItemDetail}