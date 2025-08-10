import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'hotelOwner', required: true },
    items: [{
        foodItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'foodItem', required: true },
        quantity: { type: Number, required: true },
    }],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['Food Processing','Out for delivery', 'Delivered', 'Cancelled'], default: 'Food Processing' },
    createdAt: { type: Date, default: Date.now },
    address:{type:Object,required:true},
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;