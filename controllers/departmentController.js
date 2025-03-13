import Department from "../models/Department.js";

export const addDepartment = async (req, res) => {
    try {
        const { depart, description } = req.body;
        if (!depart || !description) {
            return res.status(500).json({ success: false, error: "Fill all fields." });
        }

        const newDepart = new Department({
            depart,
            description
        });

        await newDepart.save()
        return res.status(201).json({ success: true, department: newDepart });
        
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error in add department." });
    }
}

export const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        return res.status(200).json({ success: true, departments });

    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error in get departments." });
    }
}

export const getDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findById({ _id: id });
        return res.status(200).json({ success: true, department });

    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error in get one department." });
    }
}

export const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { depart, description } = req.body;

        const updatedDepart = await Department.findByIdAndUpdate({ _id: id }, {
            depart, description
        });
        
        return res.status(201).json({ success: true, updatedDepart });

    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error in update department." });
    }
}

export const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDepart = await Department.findById({ _id: id });
        await deletedDepart.deleteOne();

        return res.status(200).json({ success: true, deletedDepart });
        
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error in delete department." });
    }
}