import Department from '../models/Department.js';


const addDepartment = async (req, res) => {
    try {
        const { departmentName, description } = req.body;
        const newDepartment = new Department({
            departmentName,
            description
        });
        await newDepartment.save();
        return res.status(201).json({ success: true, message: 'Department added successfully', department: newDepartment });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
    // Logic to add a department
    res.status(201).json({ message: 'Department added successfully' });
}

const getDepartment = async (req, res) => {
    try {
        const departments = await Department.find({});
        res.status(200).json({ success: true, departments });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
}


export {
    addDepartment,
    getDepartment
}