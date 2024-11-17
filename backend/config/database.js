const mongoose=require("mongoose");

require("dotenv").config();

exports.connect=()=>{

    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("Database connected successfully");
    })
    .catch((err)=>{
        console.log("Database not connected successfully");
        console.error("Error: ",err)
        process.exit(1);
    })
}