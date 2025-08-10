import express from 'express'
import { loginHotelOwner, registerHotelOwner, getOrders, getHotelInfo, getAllHotels} from '../controllers/hotelOwnerController.js';
import authMiddleware from '../middleware/auth.js';


const hotelRouter = express.Router();

hotelRouter.post("/register",registerHotelOwner);
hotelRouter.post("/login",loginHotelOwner);
hotelRouter.get("/getOrders",authMiddleware,getOrders);
hotelRouter.get("/info",authMiddleware,getHotelInfo);
hotelRouter.get("/allHotels",getAllHotels);

export default hotelRouter;