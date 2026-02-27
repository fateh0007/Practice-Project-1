// import dotenv from "dotenv";
import {app} from "./app.js";
import connectDB from "./db/index.js";

// dotenv.config({
//   path: "./.env"
// });

connectDB()
.then(()=>{
  app.listen(process.env.PORT || 5002,()=>{
    console.log(`Server is running on port ${process.env.PORT || 5002}`);
  })
})
.catch((err)=>{
  console.log("MongoDB connection failed !!! ", err);
})
