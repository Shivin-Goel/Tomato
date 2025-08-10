import express from 'express'
import { loginUser, myFoodItemDetail, myOrders, registerUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/myOrders",authMiddleware,myOrders);
userRouter.get("/:foodId",myFoodItemDetail)

export default userRouter;