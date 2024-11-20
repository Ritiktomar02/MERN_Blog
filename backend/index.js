const express=require("express");
const app=express();
const fileupload=require("express-fileupload");
require("dotenv").config();

const PORT= process.env.PORT || 4000

app.use(express.json());

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