const User=require("../model/User");
const cloudinary=require("cloudinary").v2;
const bcrypt=require("bcryptjs");

exports.signup=async(req,res)=>{

    try{
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: "User photo is required" });
          }

          const { photo } = req.files;

          const allowedFormats = ["image/jpeg", "image/png", "image/webp"];

          if (!allowedFormats.includes(photo.mimetype)) {
            return res.status(400).json({
              message: "Invalid photo format. Only jpg and png are allowed",
            });
          }


        const {name,email,phone,role,password}=req.body;
        if(!name || !email || !phone || !role || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const user=await User.findOne({email});
        if (user) {
            return res
              .status(400)
              .json({
                success:false,
                 message: "User already exists with this email" 
                });
          }
          
          const cloudinaryResponse = await cloudinary.uploader.upload(
            photo.tempFilePath
          );
          if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.log(cloudinaryResponse.error);
          }
          
          const hashedPassword = await bcrypt.hash(password, 10);

          const result=await User.create({name:name,email:email,phone:phone,role:role,password:hashedPassword,photo: {
        public_id: cloudinaryResponse.public_id, url: cloudinaryResponse.url },});

          res.status(200).json({
            success:true,
            result,
            message:"User sign up successfully"
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({ 
            message:err.message,
            error: "Internal Server error" });
    }
}