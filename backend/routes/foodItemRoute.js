import express from 'express'
import authMiddleware from '../middleware/auth.js';
import { addFoodItem,updateFoodItem,getFoodItemsByHotel,getFoodByFoodId } from '../controllers/foodItemController.js'

const foodRouter = express.Router();

foodRouter.get("/:hotelId/items",getFoodItemsByHotel);
foodRouter.post("/items",authMiddleware,addFoodItem);
foodRouter.put("/items/:itemId",authMiddleware,updateFoodItem);
foodRouter.get("/:id",getFoodByFoodId)
// foodRouter.post("/addPhoto",uploader.single("file"),addPhoto)

export default foodRouter;