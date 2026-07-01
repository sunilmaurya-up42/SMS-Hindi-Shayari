import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    env.JWT_SECRET,
    {
      expiresIn: "15m"
    }
  );
};

export default generateAccessToken;
