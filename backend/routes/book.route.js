import express from "express";
import { addBook, deleteBook, getAllBook, getBook, updateBook } from "../controller/book.controller.js";

const router = express.Router();

router.route("/post").post( addBook );
router.route("/getall").get(getAllBook );
router.route("/get").post( getBook);
router.route("/update").patch(updateBook);
router.route("/delete").delete(deleteBook);

export default router;
