import foodItemModel from '../models/foodItemModel.js';
// import UploadFile from '../helper/upload.js';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dhaldgpy6',
    api_key: '619899177357359',
    api_secret: '5NGq36A-hq6YQ_cDZtbDpip2eoU',
});

const getFoodItemsByHotel = async (req, res) => {
    try {
        const foods = await foodItemModel.find({ hotelId: req.params.hotelId });
        res.json({ success: true, items: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

const addFoodItem = async (req, res) => {

    const imgUrl = req.body.imageUrl;
    const response = await cloudinary.uploader.upload_large(imgUrl)

    // console.log(response);


    const item = new foodItemModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        hotelId: req.user._id,
        imageUrl: response.secure_url
    })


    try {
        await item.save();
        res.json({ success: true, message: "Food Item Added", item: item });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


const updateFoodItem = async (req, res) => {
    try {
        const item = await foodItemModel.findOneAndUpdate(
            { _id: req.params.itemId, hotelId: req.user._id },
            req.body,
            { new: true }
        );

        if (!item) {
            console.log(error);
            res.json({ success: false, message: "Food Item Not Found" });
        }

        res.json({ success: true, message: "Food Item Updated", item: item });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

const getFoodByFoodId = async (req, res) => {
    try {
        const foodItem = await foodItemModel.findById(req.params.id);
        if (!foodItem) {
            return res.json({ message: 'Food item not found' });
        }
        res.json(foodItem);
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Server error' });
    }
}

export { addFoodItem, getFoodItemsByHotel, updateFoodItem, getFoodByFoodId };