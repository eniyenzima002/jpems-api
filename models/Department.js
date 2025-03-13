import mongoose from "mongoose";
import Employee from "./Employee.js";
import Inquire from "./Inquire.js";
import Salary from "./Salary.js";
import User from "./User.js";

const departmentSchema = new mongoose.Schema({
    depart: { type: String, required: true },
    description: { type: String, required: true },
    createAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

departmentSchema.pre("deleteOne", {document: true, query: false}, async function (next) {
    try {
        const employees = await Employee.find({ department: this._id });
        const empIds = employees.map(emp => emp._id)

        await Employee.deleteMany({ department: this._id });
        await Inquire.deleteMany({ employeeId: { $in: empIds } });
       // await User.deleteMany({ employeeId: { $in: empIds } });
        await Salary.deleteMany({ employeeId: { $in: empIds } });

        next();
        
    } catch (error) {
        next(error);

    }
})

const Department = mongoose.model("Department", departmentSchema);

export default Department