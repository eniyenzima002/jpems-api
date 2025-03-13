import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { addInquire, getInquires, getInquiry, getInquiryDetail, updateInquiry } from "../controllers/inquireController.js";

const router = express.Router();

router.post("/add", authMiddleware, addInquire);
router.get("/detail/:id", authMiddleware, getInquiryDetail);
router.get("/:id/:role", authMiddleware, getInquiry);
router.get("/", authMiddleware, getInquires);
router.put("/:id", authMiddleware, updateInquiry);

export default router