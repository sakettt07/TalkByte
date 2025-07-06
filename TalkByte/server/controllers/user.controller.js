import { User } from "../models/user.model.js";
import { ApiError } from "../utils/Api.Error.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/Api.Response.js";
import bcrypt from "bcryptjs";
import { sendToken } from "../utils/sendToken.js";
import { v2 as cloudinary } from "cloudinary";

const registerUser = asyncHandler(async (req, res, next) => {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
        throw new ApiError(400, "Invalid email format");
    }
    if (password.length < 8) {
        throw new ApiError(400, "Password must be atleast 8 characters long");
    }

    const registeredUser = await User.findOne({ email });
    if (registeredUser) {
        throw new ApiError(400, "User already registered please login");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        fullname,
        email,
        password: hashedPassword,
        avatar: {
            public_id: "",
            url: ""
        }
    })

    sendToken(user, "User registered successfully", 201, res);
});

const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new ApiError(400, "Invalid email or password");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new ApiError(400, "Invalid email or password");
    }
    sendToken(user, "User logged in successfully", 200, res);

})

const logout = asyncHandler(async (req, res) => {
    res.cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    return res.status(200).json(new ApiResponse(200, {}, "User logged out successfully"));
})

const getMyProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    console.log(user)
    return res.status(200).json(new ApiResponse(200, user, "User profile fetched successfully"));
});
const updateProfile = asyncHandler(async (req, res) => {
    const { fullname, email } = req.body;
    if (fullname?.trim().length === 0 || email?.trim().length === 0) {
        throw new ApiError(400, "All fields are required");
    }
    const avatar = req.files?.avatar;
    let cloudinaryResponse = {};
    if (avatar) {
        try {
            const oldAvatarPublicId = req.user?.avatar?.public_id;
        if (oldAvatarPublicId && oldAvatarPublicId.length > 0) {
            await cloudinary.uploader.destroy(oldAvatarPublicId);
        }
    
    cloudinaryResponse = await cloudinary.uploader.upload(avatar.tempFilePath, {
        folder: "UserAvatars",
        transformation: [
            {
                width: 300,
                height: 300,
                crop: "limit",
            },
            {
                quality: "auto",
            },
            {
                fetch_format: "auto"
            },
        ]
    })
        } catch (error) {
            console.log("Cloudinary error",error);
            throw new ApiError(500, "Error uploading avatar to cloudinary");
        }
    }

    let data={fullname, email};
    if (avatar&&cloudinaryResponse?.secure_url&&cloudinaryResponse?.public_id) {
        data.avatar = {
            public_id: cloudinaryResponse?.public_id,
            secure_url: cloudinaryResponse?.secure_url,
        }
    };

    const user=await User.findByIdAndUpdate(req.user._id, data, {new:true, runValidators:true});
    return res.status(200).json(new ApiResponse(200, user, "Profile updated successfully"));
})

export { registerUser, login, logout, getMyProfile, updateProfile };