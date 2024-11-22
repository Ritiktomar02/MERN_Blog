const express=require("express");

const router=express.Router();



const {createBlog,deleteBlog,getAllBlogs,getSingleBlogs,getMyBlogs,updateBlog}=require("../controller/Blog_Controller");
const { isAuthenticated,isAdmin} = require("../middleware/AuthUser");

router.post("/create", isAuthenticated, isAdmin("admin"), createBlog);
router.delete("/delete/:id", isAuthenticated, isAdmin("admin"), deleteBlog);
router.get("/all-blogs", getAllBlogs);
router.get("/single-blog/:id", isAuthenticated, getSingleBlogs);
router.get("/my-blog", isAuthenticated, isAdmin("admin"), getMyBlogs);
router.put("/update/:id", isAuthenticated, isAdmin("admin"), updateBlog);


module.exports=router;