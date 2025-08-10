import mongoose from "mongoose";

const hotelOwnerSchema  = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    hotelName: { type: String, required: true },
    profileUrl: {type:String}
});

const hotelOwnerModel = mongoose.models.hotelOwner || mongoose.model("hotelOwner",hotelOwnerSchema);
export default hotelOwnerModel;