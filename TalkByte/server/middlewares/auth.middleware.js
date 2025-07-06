import jwt from 'jsonwebtoken';
import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/Api.Error.js';
import {User} from '../models/user.model.js';

export const isAuthenticated=asyncHandler(async(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            throw new ApiError(401,'Please login to access this resource');
        }
        const decodeData=jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user=await User.findById(decodeData.id);

        next();
    } catch (error) {
        throw new ApiError(401,error?.message||"Invalid token");
    }
})