
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import bookRoute from "./routes/book.route.js"
import issueBookRoute from "./routes/issueBook.model.js";
import memberShipRoute from "./routes/memberShip.route.js";

dotenv.config({});

const app=express();

//middleware
app.use(express.json());               // parsess incoming  request with JSON objects 
app.use(express.urlencoded({extended:true}));                          //parses incoming request  with  URL encoded payload
// app.use(cookieParser());

// const corsOptions={
//     origin:'http//locahost:5173',
//     credentials:true
// }
app.use(cors());



app.get("/",(req,res)=>{
    return res.status(200).json({
        message:"Welcome to Library!"
    })
})

// using apis here
app.use("/api/user", userRoute);
app.use("/api/book",bookRoute);
app.use("/api/issueBook",issueBookRoute);
app.use("/api/memberShip",memberShipRoute);


const PORT=process.env.PORT;

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server listening to port:${PORT}`)
});