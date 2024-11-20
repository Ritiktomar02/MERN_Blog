const mongoose=require("mongoose");
const validator=require("validator");

const UserSchema=new mongoose.Schema({

   name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
 
  role: {
    type: String,
    required: true,
    enum: ["user", "admin"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },

  photo: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  token:{
    type:String,
  }
},{timestamps:true})

module.exports=mongoose.model("User",UserSchema);