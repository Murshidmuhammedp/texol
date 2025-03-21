import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';

export const signUp = async (req, res, next) => {
    try {
        const { fullName, email, mobile, status, password } = req.body;
        if (!fullName || !email || !mobile || !status || !password) {
            return res.status(404).json({ message: "All Inputfield is Required." })
        };

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(200).json({ message: "E-mail already registered" });
        };
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            email,
            mobile,
            status,
            password: hashedPassword
        });
        await newUser.save();
        return res.status(201).json({ message: "Registered successfully", data: newUser });

    } catch (error) {
        next(error)
    };
};

export const signIn = async (req, res, next) => {
    try {
        const { mobile, password } = req.body;

        if (!mobile || !password) {
            return res.status(400).json({ success: false, message: "Mobile number and password are required." });
        };

        const validUser = await User.findOne({ mobile });

        if (!validUser) {
            return res.status(401).json({ success: false, message: "User not found." });
        };

        const validpassword = bcrypt.compareSync(password, validUser.password);

        if (!validpassword) {
            return res.status(401).json({ success: false, message: "Invalid username or password." });
        };

        if (validUser.isDeleted == true) {
            return res.status(400).json({ success: false, message: "Your account is suspended." });
        };

        // Generate JWT
        const token = Jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        const { password: hashedPassword, ...rest } = validUser._doc;
        // cookie setting 
        // res.cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + 60 * 1000) });
        return res.status(200).json({ message: "successfully logged in", token, data: rest });
    } catch (error) {
        next(error);
    }
};