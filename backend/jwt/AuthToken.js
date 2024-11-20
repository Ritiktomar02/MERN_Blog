const jwt=require("jsonwebtoken");
const User=require('../model/User')

require("dotenv").config();

const createTokenAndSaveCookies = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
  res.cookie("jwt", token, {
    httpOnly: true, // Temporarily set to false for testing
    secure: true,
    sameSite: "lax",
  });
  await User.findByIdAndUpdate(userId, { token });
  return token;
};

module.exports=createTokenAndSaveCookies
