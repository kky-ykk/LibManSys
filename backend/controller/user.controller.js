
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
         
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal Server error!"
        })
    }
}


export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        //check password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        //token generations
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role
        }

        // returning cookies and data
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome  ${user.fullname}`,
            user,
            success: true,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal Server error!"
        })
    }
}

export const getAllUsers=async (req,res)=>{
    try {
        const ress=await User.find();

        return res.status(200).json({
            ress,
            status:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal Server error!"
        })
    }
}

export const updateUser=async (req,res)=>{
    try {

        const {_id,fullname,email,phoneNumber,role}=req.body;

        // console.log(_id,fullname,email,phoneNumber,role);

        const ress=await User.findByIdAndUpdate(_id,{fullname,email,phoneNumber,role})



        return res.status(200).json({
            ress,
            status:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal Server error!"
        })
    }
}


