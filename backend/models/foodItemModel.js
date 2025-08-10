import mongoose from "mongoose";

const foodItemSchema  = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'hotelOwner', required: true },
    imageUrl:{type:String, required:true}
});

const foodItemModel = mongoose.models.foodItem || mongoose.model("foodItem",foodItemSchema);
export default foodItemModel;