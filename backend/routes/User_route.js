const express=require("express");

const router=express.Router();



const {signup}=require("../controller/User_Controller");

router.post("/signup",signup);


module.exports=router;