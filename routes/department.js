import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { addDepartment, updateDepartment, getDepartment, getDepartments, deleteDepartment } from "../controllers/departmentController.js";

const router = express.Router();

router.get("/", authMiddleware, getDepartments);
router.get("/:id", authMiddleware, getDepartment);
router.put("/:id", authMiddleware, updateDepartment);
router.delete("/:id", authMiddleware, deleteDepartment);
router.post("/add", authMiddleware, addDepartment);

export default router