import { Book } from "../models/book.model.js";
import { BooKIssue } from "../models/issueBook.model.js";
import { User } from "../models/user.model.js";



export const addIssueBook= async (req,res)=>{
    try {
        const {name,issueDate,returnDate,bookId}=req.body;

        const userId=req.id;
        const newData = {name, issueDate, returnDate, bookId, userId}

        let ress=await Book.findById({_id:bookId});
        let quantity=ress.quantity;
        // if(quantity==0){
        //     return res.status(400).json({
        //         "cannot issue book!"
        //     });
        // }
        await Book.findByIdAndUpdate(bookId,{quantity:quantity-1});

        console.log("ress bookId:",ress);

        const newBook = new BooKIssue(newData);
        const response = await newBook.save();

        return res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"internal server error!"
        })
    }
}

export const showIssueBook=async (req,res)=>{
    try {
        
        const userId=req.id;

        const user=User.find(userId);
        // console.log(userId);
        let ress=null;

        if(user.role==="admin"){
            ress=await BooKIssue.find();   
        }else
            ress=await BooKIssue.find({userId:userId}).populate({
                path: "bookId"
            });        
        res.status(200).json({
            issuedBooks:ress
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"internal server error!"
        })
    }
} 

export const deleteIssueBook=async (req,res)=>{
    try {
        
        const id=req.body.id;
        

        const ress=await BooKIssue.deleteOne({_id:id});

                
        res.status(200).json({
            issuedBooks:ress
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"internal server error!"
        })
    }
} 