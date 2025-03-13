import mongoose, { Schema } from "mongoose";

const inquireSchema = new Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    inquireType: {
        type: String,
        enum: ["Sick", "Personal", "Vacation", "Resign", "Funds", "Work", "Food", "Recommendation"],
        required: true
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    },
    appliedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    
});

const Inquire = mongoose.model("Inquire", inquireSchema);

export default Inquire