import mongoose, { Schema } from "mongoose";

const salarySchema = new Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    baseSalary: { type: Number, required: true },
    allowance: { type: Number },
    deduction: { type: Number },
    netSalary: { type: Number },
    payDay: { type: Date, required: true },
    createdAt: {type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now }
    
})

const Salary = mongoose.model("Salary", salarySchema);

export default Salary;