import mongoose from "mongoose";

export const connectDB=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI,{
            dbName:process.env.DB_NAME,
        });
        console.log(`\n Mongo connected port : --- ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(`MongoDb connection error ${error}`.red.bold);
        process.exit(1);
        
    }
    
}