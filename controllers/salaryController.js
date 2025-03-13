import Salary from "../models/Salary.js";
import Employee from "../models/Employee.js";

export const addSalary = async (req, res) => {

    try {
        const { employeeId, baseSalary, allowance, deduction, payDay } = req.body;

        const totalSalary = parseInt(baseSalary) + parseInt(allowance) - parseInt(deduction);

        const newSalary = new Salary({ employeeId, baseSalary, allowance, deduction, netSalary: totalSalary, payDay });
        await newSalary.save();
        // console.log("Salary Two", newSalary)

        return res.status(201).json({ success: true, message: "Salary added." });

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, error: "Server error in add salary." });
    }
}

export const getSalary = async (req, res) => {
    try {
        const { id, role } = req.params;
        let salary;

        if (role === "admin") {
            salary = await Salary.find({ employeeId: id }).populate("employeeId", "employeeId");
        } else {
            const employee = await Employee.findOne({ userId: id })
            salary = await Salary.find({ employeeId: employee._id }).populate("employeeId", "employeeId");
        }

        return res.status(201).json({ success: true, salary });
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, error: "Server error in add salary." });
    }
}