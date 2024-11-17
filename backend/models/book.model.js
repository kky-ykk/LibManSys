import mongoose from "mongoose";
import { type } from "os";

const bookSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    author:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    quantity:{
        type:Number
    },
    serialNumber:{
        type:String,
        required:true,
        unique:true
    },
    imageUrl:{
        type:String,
       default:"https://static.vecteezy.com/system/resources/thumbnails/009/384/332/small_2x/old-vintage-book-clipart-design-illustration-free-png.png" 
    }

},{timestamps:true});

export const Book=mongoose.model('Book',bookSchema);