import {Message} from "../models/message.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/Api.Error.js";
import { ApiResponse } from "../utils/Api.Response.js";
import { v2 as cloudinary } from "cloudinary";
import {User} from "../models/user.model.js";
import { getReceiverSocketId, io } from "../utils/socket.js";

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
});

const sendMessage=asyncHandler(async(req,res)=>{
    const {text}=req.body;
    const media=req?.files?.media;
    const {id:receiverId}=req.params;
    const senderId=req.user._id;

    const receiver=await User.findById(receiverId);
    if(!receiver){
        throw new ApiError(400,"Receiver not found",);
    }
    const sanitizedText=text?.trim()||"";
    if(!sanitizedText&&!media){
        throw new ApiError(400,"Provide the details")
    }
    let mediaUrl="";
    if(media){
        try {
            const uploadReponse=await cloudinary.uploader.upload(
            media.tempFilePath,{
                resource_type:"auto",    // auto detect the format of the media
                folder:"CHAT_APP_MEDIA",
                transformation:[
                    {width:1080,height:1080,crop:"limit"},
                    {quality:"auto"},
                    {fetch_format:"auto"},
                ],
            }
        );
        mediaUrl=uploadReponse?.secure_url;
        } catch (error) {
            throw new ApiError(400,`${error}|| Error while uploading the media files`)
        }
    }
    const newMessage=await Message.create({
        senderId,
        receiverId,
        text:sanitizedText,
        media:mediaUrl,
    });
    const receiverSocketId=getReceiverSocketId(receiverId);
    if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage",newMessage)
    }
    return res.status().json(new ApiResponse(200,newMessage));
})

export{getAllUsers,getMessages,sendMessage};