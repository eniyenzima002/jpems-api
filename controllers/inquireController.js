import Inquire from "../models/Inquire.js";
import Employee from "../models/Employee.js"

export const addInquire = async (req, res) => {
  try {
      const { userId, inquireType, startDate, endDate, reason } = req.body;

      const employee = await Employee.findOne({ userId });
      
      const newInquire = new Inquire({ employeeId: employee._id, inquireType, startDate, endDate, reason });
      
    await newInquire.save();
    // console.log("Salary Two", newInquire)

    return res.status(201).json({ success: true, message: "Inquire added." });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, error: "Server error in add Inquire." });
  }
};

export const getInquiry = async (req, res) => {
  try {
    const { id, role } = req.params;
    let inquire;

    if (role === "admin") {
      inquire = await Inquire.find({ employeeId: id });

    } else {
      const employee = await Employee.findOne({ userId: id });
      inquire = await Inquire.find({ employeeId: employee._id });
      
    }
    
    return res.status(200).json({ success: true, inquire });

  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, error: "Server error in get Inquiries." });
  }
}

export const getInquires = async (req, res) => {
  try {
    const inquires = await Inquire.find().populate({
      path: "employeeId",
      populate: [
        { path: "department", select: "depart" },
        { path: "userId", select: "name" }
      ]
    })
    
    return res.status(200).json({ success: true, inquires });

  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, error: "Server error in get Inquiries." });
  }
}

export const getInquiryDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const inquire = await Inquire.findById({ _id: id }).populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "depart"
        },
        {
          path: "userId",
          select: 'profileImage name'
        }
      ]
    })
    
    return res.status(200).json({ success: true, inquire });

  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, error: "Server error in get inquire detail." });
  }
}

export const updateInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const inquire = await Inquire.findByIdAndUpdate({ _id: id }, { status: req.body.status });
    if (!inquire) {
      return res.status(404).json({ success: false, error: "Inquire not found." });
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, error: "Server error in update Inquire status." });
  }
}
