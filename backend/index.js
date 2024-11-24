const express=require("express");
const cors=require("cors")
const fileupload=require("express-fileupload");
const cookieParser =require("cookie-parser");
const app=express();
require("dotenv").config();

const PORT= process.env.PORT || 4000

app.use(express.json());
app.use(cookieParser())
app.use(
    cors({
      origin: process.env.FRONTEND_URL,  // Only allow requests from your frontend URL
      credentials: true,  // Allow cookies to be sent
      methods: ["GET", "POST", "PUT", "DELETE"],  // Only allow these methods
    })
  );

app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}))
const user_route=require("./routes/User_route");
app.use("/api/v1/user",user_route)

const blog_route=require("./routes/Blog_route");
app.use("/api/v1/blog",blog_route)

require("./config/cloudinary").cloudinaryconnect();
require("./config/database").connect();
app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`);
})