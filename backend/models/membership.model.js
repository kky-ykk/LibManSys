
import mongoose from "mongoose";
import { type } from "os";

const memberShipSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    membershipType:{
        type:String,
        enum:['1','2','3']
    },
    userId: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required:true
        }
    

},{timestamps:true});

export const MemberShip=mongoose.model('MemberShip',memberShipSchema);