import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { addMemberShip, getMembership } from "../controller/memberShip.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated,addMemberShip);
router.route("/get").get(isAuthenticated,getMembership);

export default router;
