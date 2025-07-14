import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { connectSocket } from "../../lib/socket";

export const getUser=createAsyncThunk("user/me",async(_,thunkAPI)=>{
    try {
        const res=await axiosInstance.get("/user/me");
        connectSocket(res.data.user);
        return res.data.user;
    } catch (error) {
        console.log("Error while fetching the data",error);
        return thunkAPI.rejectWithValue(error.response?.data||"Failed to fetch the user");
    }
});
const authSlice=createSlice({
    name:"auth",
    initialState:{
        user:null,
        isSigningUp:false,
        isLoggingIn:false,
        isUpdatingProfiel:false,
        isCheckingAuth:false,
        onlineUser:[],
    },
    reducers:{
        setOnlineUsers(state,action){
            state.onlineUser=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getUser.fulfilled,(state,action)=>{
            state.user=action.payload;
            state.isCheckingAuth=false;
        })
        .addCase(getUser.rejected,(state,action)=>{
            state.user=null;
            state.isCheckingAuth=false;
        })
    }
});

export const {setOnlineUsers}=authSlice.actions;

export default authSlice.reducer;