import { User } from "../models/user.model.js";
import { ApiError } from "../utils/Api.Error.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";
import { sendToken } from "../utils/sendToken.js";

const registerUser=asyncHandler(async(req,res,next)=>{
    const {fullname,email,password}=req.body;
    if(!fullname||!email||!password){
        throw new ApiError(400,"All fields are required");
    }

    const emailRegex=/^\S+@\S+\.\S+$/;
    if(!emailRegex.test(email)){
        throw new ApiError(400,"Invalid email format");
    }
    if(password.length<8){
        throw new ApiError(400,"Password must be atleast 8 characters long");
    }

    const registeredUser=await User.findOne({email});
    if(registeredUser){
        throw new ApiError(400,"User already registered please login");
    }
    const hashedPassword=await bcrypt.hash(password,10);

    const user=await User.create({
        fullname,
        email,
        password:hashedPassword,
        avatar:{
            public_id:"",
            url:""
        }
    })

    sendToken(user,"User registered successfully",201,res);
});

const login=asyncHandler(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email||!password){
        throw new ApiError(400,"All fields are required");
    }
    const user=await User.findOne({email}).select("+password");
    if(!user){
        throw new ApiError(400,"Invalid email or password");
    }
    const isPasswordMatch=await bcrypt.compare(password,user.password);
    if(!isPasswordMatch){
        throw new ApiError(400,"Invalid email or password");
    }
    sendToken(user,"User logged in successfully",200,res);

})

const logout=asyncHandler(async(req,res,next)=>{
    res.cookie("token","",{
        expires:new Date(Date.now()),
        httpOnly:true,
    })
    res.status(200).json({
        success:true,
        message:"User logged out successfully",
    })
})

export{registerUser,login,logout};