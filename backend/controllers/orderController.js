import orderModel from "../models/orderModel.js";

const placeOrder = async (req,res)=>{
    try {
        const order = new orderModel({
            ...req.body,
            userId: req.user._id,
        });

        await order.save();

        res.json({ success: true, message: "Order Placed", order: order });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

const updateStatus = async (req,res) => 
{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Status Updated"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export {placeOrder,updateStatus};