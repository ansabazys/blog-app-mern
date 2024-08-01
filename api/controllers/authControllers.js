import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Register
export const regUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hashSync(password, salt);
    const newUser = await User({ username, email, password: hashPassword });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Login
export const logInUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    const validateUser = await bcrypt.compare(req.body.password, user.password);
    if (!validateUser) {
      res.status(401).json({ message: "Wrong credentials" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );
    const { password, ...info } = user._doc;
    res.cookie("token", token).status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }   
};

//Logout
export const logOutUser = async (req, res) => {
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .send({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

//Refetch user
export const refetchUser = (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      return res.status(403).json({ message: "Token not valid" });
    }
    res.status(200).json(data);
  });
};
