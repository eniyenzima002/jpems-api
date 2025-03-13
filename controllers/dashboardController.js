import Department from "../models/Department.js";
import Employee from "../models/Employee.js"
import Inquire from "../models/Inquire.js";

export const getSummary = async (req, res) => {
    try {
        const totalEmployees = await Employee.countDocuments();
        const totalDepartments = await Department.countDocuments();

        const totalSalaries = await Employee.aggregate([
            { $group: { _id: null, totalSalary: { $sum: "$salary" } } }
        ]);

        const employeeAppliedForInquire = await Inquire.distinct("employeeId");

        const inquireStatus = await Inquire.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        const inquireSummary = {
            appliedFor: employeeAppliedForInquire.length,
            approved: inquireStatus.find(item => item._id === "Approved")?.count || 0,
            rejected: inquireStatus.find(item => item._id === "Rejected")?.count || 0,
            pending: inquireStatus.find(item => item._id === "Pending")?.count || 0,
        }

        return res.status(200).json({
            success: true,
            totalEmployees,
            totalDepartments,
            totalSalary: totalSalaries[0]?.totalSalary || 0,
            inquireSummary
        })

    } catch (error) {
        return res.status(500).json({ success: false, error: "Error in dashboard summary." });
    }
}