import Employee from "../models/Employee.js";
import Department from "../models/Department.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const addEmployee = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    const {
      username,
      name,
      email,
      phoneNumber,
      department,
      password,
      payroll,
      payroll_id,
      contractType,
      status,
      role,
    } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User alreaady registered" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
      role,
    });
    await newUser.save();

    const newEmployee = new Employee({
      name,
      email,
      phoneNumber,
      department,
      payroll,
      payroll_id,
      contractType,
      status,
    });
    await newEmployee.save();
    return res.status(201).json({
      success: true,
      message: "Employee added successfully",
      employee: newEmployee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate("department");
    res.status(200).json({ success: true, employees });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};
const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    console.log("GET EMPLOYEE CONTROLLER HIT");
    const employeeToView = await Employee.findById({ _id: id }).populate(
      "department",
    );
    console.log("AFTER POPULATE:", employeeToView);
    console.log("POPULATED EMP:", employeeToView);
    res.status(200).json({ success: true, employee: employeeToView });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const editEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employeeToEdit = await Employee.findById({ _id: id }).populate(
      "department",
    );
    return res.status(200).json({ success: true, employee: employeeToEdit });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phoneNumber, department, payroll, contractType, status } =
      req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        name,
        phoneNumber,
        department,
        payroll,
        contractType,
        status,
      },
      { new: true },
    );
    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "update employees Server error" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id, { new: true });

    return res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
      employee: deletedEmployee,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

export {
  addEmployee,
  getEmployees,
  editEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
