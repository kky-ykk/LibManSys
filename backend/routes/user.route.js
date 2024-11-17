import express from "express";
import { getAllUsers, login, register, updateUser } from "../controller/user.controller.js";

const router = express.Router();

router.route("/post").post( register);
router.route("/get").post( login);
router.route("/getall").get( getAllUsers);
router.route("/update").patch( updateUser);


export default router;
