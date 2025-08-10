import express from 'express'
import {placeOrder , updateStatus} from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';

const orderRouter = express.Router();

orderRouter.post('/orders',authMiddleware,placeOrder);
orderRouter.post("/status",updateStatus)

export default orderRouter;
