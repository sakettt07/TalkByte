import Message from "../models/message.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/Api.Error.js";
import { ApiResponse } from "../utils/Api.Response.js";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/user.model.js";

const getAllUsers=asyncHandler(async(req,res,next)=>{
    const user= req.user;
    const filteredUsers=await User.find({_id:{$ne:user._id}}).select('-password');
    return res.status(200).json(new ApiResponse(200,filteredUsers,"All users fetched successfully"));
});

const getMessages=asyncHandler(async(req,res,next)=>{
    const receiverId=req.params.id;
    const senderId=req.user._id;
    const receiver=await User.findById(receiverId);

    if(!receiver){
        throw new ApiError(400,"Receiver not found");
    }
    const messages=await Message.find({
        $or:[
            {senderId:senderId,receiverId:receiverId},
            {senderId:receiverId,receiverId:senderId}
        ]
    }).sort({createdAt:1});

    return res.status(200).json(new ApiResponse(200,messages,"Messages fetched successfully"));
})

export{getAllUsers,getMessages,sendMessage};