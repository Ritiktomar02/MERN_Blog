const express=require("express");

const router=express.Router();



const {signup,login,logout,getMyProfile,getAdmins}=require("../controller/User_Controller");
const { isAuthenticated } = require("../middleware/AuthUser");

router.post("/signup",signup);
router.post("/login",login)
router.post("/logout",isAuthenticated,logout)
router.get("/my-profile", isAuthenticated, getMyProfile);
router.get("/admins", getAdmins);


module.exports=router;