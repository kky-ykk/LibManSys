
import { Book } from "../models/book.model.js";

export const addBook = async (req, res) => {
    try {
        const { name, author, description, quantity, serialNumber,imageUrl } = req.body;
         console.log(name, author, description, quantity, serialNumber,imageUrl);
        if (!name || !author || !serialNumber ) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        const book = await Book.findOne({ name });
        if (book) {
            return res.status(400).json({
                message: 'Book already exist with this name.',
                success: false,
            })
        }
        
        await Book.create({
            name, 
            author, 
            description, 
            quantity, 
            serialNumber,
            imageUrl
        });

        return res.status(201).json({
            message: "Book added successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}


export const getAllBook = async (req, res) => {
    try {
        
        let books = await Book.find();
        if (!books) {
            return res.status(400).json({
                message: "fail to get books",
                success: false,
            });
        }


        // returning cookies and data
        return res.status(200).json({
            message: `All books here`,
            books,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


export const getBook = async (req, res) => {
    try {
        const {author,name}=req.body;
        
        //using finding object 
        let obj;
        if(author){
            obj = {author:author}
        }
        else{
            obj={name:name}
        }

        if (!obj) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };


        let books = await Book.find(obj);
        if (!books) {
            return res.status(400).json({
                message: "fail to get books",
                success: false,
            });
        }


        // returning cookies and data
        return res.status(200).json({
            messsage:"Books founded",
            books,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateBook = async (req, res) => {
    try {
        
        const {_id,quantity,name,description,imageUrl} = req.body;

        console.log(req.body);

        if (!quantity && !id) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };


        let books = await Book.findByIdAndUpdate(_id,{quantity,name,description,imageUrl});
        if (!books) {
            return res.status(400).json({
                message: "fail to get books",
                success: false,
            });
        }


        // returning cookies and data
        return res.status(200).json({
            books,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const deleteBook = async (req, res) => {
    try {
        
        const {id} = req.body;

        if ( !id) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };


        let ress = await Book.findByIdAndDelete(id);
        if (!ress) {
            return res.status(400).json({
                message: "fail to get books",
                success: false,
            });
        }


        // returning cookies and data
        return res.status(200).json({
            message:"book deleted successfully",
            ress,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
