import multer from "multer";
import User from "../models/User.js";
import Employee from "../models/Employee.js";
import bcrypt from "bcrypt"
import path from "path"
import Departmetn from "../models/Department.js"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

export const upload = multer({ storage: storage });

// ADD EMPLOYEE
export const addEmployee = async (req, res) => {

    try {
        const {
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role
        } = req.body
    
        const user = await User.findOne({ email });
    
        if (user) {
            return res.status(400).json({ success: false, error: "User already exist as employee here." });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            profileImage: req.file ? req.file.filename : "",
        })
    
        const savedUser = await newUser.save();
    
        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary
        })

        await newEmployee.save();

        res.status(201).json({ success: true, message: "Employee created" });
        
    } catch (error) {
        console.log("Server err: ", error.message)
        return res.status(500).json({success: false, error: "Server error in add employee."})
    }

}

// GET ALL EMPLOYEES
export const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate("userId", { password: 0 }).populate("department");
        return res.status(200).json({ success: true, employees });

    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error in get all employees." });
    }
}

// GET EMPLOYEE
export const getEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        let employee;
        employee = await Employee.findById({ _id: id }).populate("userId", { password: 0 }).populate("department");

        if (!employee) {
           employee = await Employee.findOne({ userId: id }).populate("userId", { password: 0 }).populate("department");
        }

        return res.status(200).json({ success: true, employee });

    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error in get one employee." });
    }
}

export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            maritalStatus,
            designation,
            department,
            salary,
        } = req.body;

        const employee = await Employee.findById({ _id: id });
        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found." });
        }

        const user = await User.findById({ _id: employee.userId });
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found." });
        }

        const updateUser = await User.findByIdAndUpdate({ _id: employee.userId }, { name });
        const updateEmployee = await Employee.findByIdAndUpdate({ _id: id }, { maritalStatus, designation, salary, department });

        if (!updateEmployee || !updateUser) {
            return res.status(404).json({ success: false, error: "Document not found." });
        }

        return res.status(200).json({ success: true, message: "EMployee updated." });

    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error in get one employee." });
    }
}

export const fetchEmployeeByDepId = async (req, res) => {
    try {
        const { id } = req.params;
        const employees = await Employee.find({ department: id })
        return res.status(200).json({ success: true, employees });

    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error in get employee by dep ID." });
    }
}