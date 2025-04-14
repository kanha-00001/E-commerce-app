const bcrypt = require("bcryptjs");

const User = require("../models/User");

//register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;


  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};


const login = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
    res.status().json({
      success: false,
      message: "some error ocured",
    });
  }
};


module.exports = { registerUser };


























module.exports ={ registerUser};