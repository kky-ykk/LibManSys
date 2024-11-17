import { MemberShip } from "../models/membership.model.js";


export const addMemberShip=async (req,res)=>{
    try {
        const {name,membershipType}=req.body;

        const userId=req.id;

        const ress=await MemberShip.create({
            name,
            membershipType,
            userId
        })

        res.status(200).json({
            message:"Membership taken successfully",
            memberShip:ress
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"internal server error!"
        })
    }
}

export const getMembership=async (req,res)=>{

    try {
        
        const ress=await MemberShip.find();

        res.status(200).json({
            memberShip:ress
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"internal server error!"
        })
    }

}