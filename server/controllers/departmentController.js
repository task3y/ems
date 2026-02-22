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

const editDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findById({_id: id})
        return res.status(200).json({ success: true, department }); 
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Server error' });
    }
}

const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;   
        const { departmentName, description } = req.body;
        const updatedDepartment = await Department.findByIdAndUpdate(id, { 
            departmentName, description 
        }, { new: true });
        return res.status(200).json({ success: true, message: 'Department updated successfully', department: updatedDepartment });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Server error' });
    }
}

const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;   
        const deletedDepartment = await Department.findByIdAndDelete(id, { new: true });

        return res.status(200).json({ success: true, message: 'Department deleted successfully', department: deletedDepartment });
        
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Server error' });
    }
}
  
export {
    addDepartment,
    getDepartment,
    editDepartment,
    updateDepartment,
    deleteDepartment
}