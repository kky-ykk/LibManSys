
import mongoose from "mongoose";
import { type } from "os";

const issuesSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    userId: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ,
    issueDate:{
        type: Date,
        default:Date.now
    },
    returnDate:{
        type: Date,
        default:Date.now
    },
    bookId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
        }
    ]

},{timestamps:true});

export const BooKIssue=mongoose.model('BookIssue',issuesSchema);