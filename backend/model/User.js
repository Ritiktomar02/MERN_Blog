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
  role: {
    type: String,
    required: true,
    enum: ["user", "admin"],
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
},{timestamps:true})

module.exports=mongoose.model("User",UserSchema);