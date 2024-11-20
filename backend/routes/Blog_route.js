const express=require("express");

const router=express.Router();



const {createBlog}=require("../controller/Blog_Controller");

router.post("/createBlog",createBlog);


module.exports=router;