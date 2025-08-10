import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js';
import hotelOwnerModel from '../models/hotelOwnerModel.js';

const authMiddleware = async(req,res,next) => {

    try {

        const token = req.header('Authorization').replace('Bearer ', '');
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        const user = await userModel.findOne({ _id: token_decode.id }) || await hotelOwnerModel.findOne({ _id: token_decode.id });

        if (!user) {
            res.json({success:false, messgae:"User not found , Please login"});
        }

        req.user = user;
        next();

    } catch (error) {
        console.log(error);
        res.json({success:false, messgae:"error"});
    }
}

export default authMiddleware;