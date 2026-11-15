
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/sendEmail");

const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        console.log("1. Request received");

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            otp
        });

        await newUser.save();

        if (newUser) {
            const message = `Welcome to Shopnext! Your OTP for registration is ${otp}`;

            await sendEmail(
                email,
                "OTP for registration",
                message
            );
        }

        const jwtToken = jwt.sign(
            {
                email: newUser.email,
                _id: newUser._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h"
            }
        );

        return res.status(201).json({
            message: "User registered successfully",
            success: true,
            token: jwtToken,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                verified: newUser.verified
            }
        });

    } catch (error) {
        console.log("REGISTER ERROR:", error);

        return res.status(500).json({
            message: "Error registering user",
            error: error.message
        });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const jwtToken = jwt.sign(
            {
                email: user.email,
                _id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h"
            }
        );

        return res.status(200).json({
            message: "User logged in successfully",
            success: true,
            token: jwtToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.log("LOGIN ERROR:", error);

        res.status(500).json({
            message: "Error logging in",
            error: error.message
        });
    }
};


const getusers = async (req, res) => {
    try {
        const allusers = await User.find()
            .select("-password -otp")
            .sort({ _id: -1 });

        if (!allusers || allusers.length === 0) {
            return res.json({
                success: true,
                users: [],
                message: "No users found"
            });
        }

        res.json({
            success: true,
            users: allusers
        });

    } catch (err) {
        console.log("ERROR:", err);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// UPDATE USER PROFILE
const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        // Check required fields
        if (!name || !email) {
            return res.status(400).json({
                message: "Name and email are required"
            });
        }

        // Find logged-in user
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Check if email is already used by another user
        const existingUser = await User.findOne({
            email: email.trim().toLowerCase(),
            _id: { $ne: user._id }
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Email is already registered"
            });
        }

        // Update user details
        user.name = name.trim();
        user.email = email.trim().toLowerCase();

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.log("UPDATE PROFILE ERROR:", error);

        return res.status(500).json({
            message: "Error updating profile",
            error: error.message
        });
    }
};

const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;

        // Check all fields
        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check new password match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "New passwords do not match"
            });
        }

        // Password length
        if (newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters"
            });
        }

        // Find logged-in user
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect"
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getusers,
    updateProfile,
    changePassword
};
   
