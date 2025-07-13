import app from "./app.js";
import {v2 as cloudinary} from 'cloudinary';
import colors from 'colors';
import http from 'http'
import { initSocket } from "./utils/socket.js";

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const server=http.createServer(app);
initSocket(server);

server.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT} in Dev mode`.blue.bold);
})