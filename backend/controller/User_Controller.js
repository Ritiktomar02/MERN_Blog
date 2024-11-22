const User=require("../model/User");
const cloudinary=require("cloudinary").v2;
const bcrypt=require("bcryptjs");
const createTokenAndSaveCookies=require('../jwt/AuthToken')
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


           let token=await createTokenAndSaveCookies(result._id,res);
           console.log("Token: ",token);
          res.status(200).json({
            success:true,
            result,
            token:token,
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

exports.login=async(req,res)=>{

  try{
      const {email,password}=req.body;


      if (!email || !password ) {
        return res.status(400).json({
          success:false,
          message:"please fill all the details",
      })
      }

       const user=await User.findOne({email});
       
        if(!user){
            return res.status(400).json({
                success:false,
                message:"you need to sign up first",
            })
        }
        
        console.log(user);
        console.log(user.password)
        const isMatch = await bcrypt.compare(password, user.password);
       if (!isMatch) {
         return res.status(400).json({ message: "Invalid  password" });
    }

    let token = await createTokenAndSaveCookies(user._id, res);
    console.log("Login: ", token);
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: token,
    });
  }
  catch(err){
    console.log(err);
    return res.status(500).json({message:err.message, error: "Internal Server error" });
 
  }
}

exports.logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};


exports.getMyProfile = async (req, res) => {
  const user = await req.user;
  res.status(200).json({ user });
};

exports.getAdmins = async (req, res) => {
  const admins = await User.find({ role: "admin" });
  res.status(200).json({ admins });
};