import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { addEmployee, fetchEmployeeByDepId, getEmployee, getEmployees, updateEmployee, upload, } from "../controllers/employeeController.js";

const router = express.Router();

router.get("/", authMiddleware, getEmployees);
router.get("/:id", authMiddleware, getEmployee);
router.get("/department/:id", authMiddleware, fetchEmployeeByDepId);
router.put("/:id", authMiddleware, updateEmployee);
// router.delete("/:id", authMiddleware, deleteDepartment);
router.post("/add", authMiddleware, upload.single("image"), addEmployee);

export default router