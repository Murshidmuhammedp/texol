import jwt from "jsonwebtoken";
import User from "../models/userSchema";

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) return res.status(403).json({ message: "No token provided.Please Login with Google" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded._id)
        req.user = user._id;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" }); 
    }
};

export default verifyToken;