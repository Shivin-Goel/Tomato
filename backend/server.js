import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import { v2 as cloudinary } from 'cloudinary';
import { connectDB } from './config/db.js';
import 'dotenv/config.js';
import userRouter from './routes/userRoute.js';
import hotelRouter from './routes/hotelOwnerRoute.js';
import foodRouter from './routes/foodItemRoute.js';
import orderRouter from './routes/orderRoute.js';
import { fileURLToPath } from "url";

import path from "path";

// db connection
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app config
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cors());
// app.use(fileUpload({
//     useTempFiles:true
// }))

// app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// api endpoint
app.use("/api/user",userRouter)
app.use("/api/hotel",hotelRouter)
app.use("/api/hotel",foodRouter)
app.use("/api/order",orderRouter)


// app.get("/",(req,res)=>{
//     res.send("API working")
// })

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// app.use('*',function(req,res){
//     res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
//   });

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})

// "scripts": {
    // "start": "nodemon server.js",
    // "server": "nodemon server.js"
//   },
