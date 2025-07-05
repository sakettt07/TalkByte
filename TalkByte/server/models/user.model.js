import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    avatar:{
        public_id:String,
        url:String
    },
},{timestamps:true});

 userSchema.methods.generateToken=function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET_KEY, {expiresIn:process.env.JWT_EXPIRE});
  }

export const User=mongoose.model("User",userSchema);