import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { connectSocket, disconnectSocket } from "../../lib/socket";
import toast from "react-hot-toast";

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

export const logout=createAsyncThunk("/user/logout",async(_,thunkAPI)=>{
    try {
        await axiosInstance.get("/user/logout");
        disconnectSocket();
        toast.success("Logged out Successfully");
        return null;
    } catch (error) {
        toast.error(`${error.response.data.message} || Error occurred while logging out from the application`);
        return thunkAPI.rejectWithValue(error.response.data.message);

    }
});
export const login=createAsyncThunk("/user/login",async(data,thunkAPI)=>{
    try {
        const res=await axiosInstance.post("/user/login",data);
        connectSocket(res.data);
        toast.success("Logged in Successfully");
        return res.data;
    } catch (error) {
                toast.error(`${error.response.data.message}`);
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});
export const register=createAsyncThunk("/user/register",async(data,thunkAPI)=>{
    try {
        const res=await axiosInstance.post("/user/register",data);
        connectSocket(res.data);
        toast.success("Registered Successfully");
        return res.data;
    } catch (error) {
        toast.error(`${error.response.data.message}`);
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})
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
        }).addCase(logout.fulfilled,(state)=>{
            state.user=null;
        }).addCase(logout.rejected,(state)=>{
            state.user=state.user
        }).addCase(login.pending,(state)=>{
            state.isLoggingIn=true;
        }).addCase(login.fulfilled,(state,action)=>{
            state.user=action.payload
            state.isLoggingIn=false;
        }).addCase(login.rejected,(state)=>{
            state.isLoggingIn=false
        }).addCase(register.pending,(state)=>{
            state.isSigningUp=true;
        }).addCase(register.fulfilled,(state,action)=>{
            state.user=action.payload;
            state.isSigningUp=false;
        }).addCase(register.rejected,(state)=>{
            state.isSigningUp=false;
        })
    }
});

export const {setOnlineUsers}=authSlice.actions;

export default authSlice.reducer;