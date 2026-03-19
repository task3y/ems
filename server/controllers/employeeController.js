import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const addEmployee = async (req, res) => {
  try {
    const {
      username,
      name,
      email,
      phoneNumber,
      employeeId,
      department,
      password,
      payroll,
      payroll_id,
      contractType,
      status,
      role,
    } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "User already exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    const savedUser = await newUser.save();

    // create employee
    const newEmployee = new Employee({
      userId: savedUser._id, // ⭐ IMPORTANT
      employeeId,
      name,
      email,
      phoneNumber,
      department,
      payroll,
      payroll_id,
      contractType,
      status,
    });

    const savedEmployee = await newEmployee.save();

    return res.status(201).json({
      success: true,
      employee: savedEmployee,
    });
  } catch (error) {
    console.log("ADD EMPLOYEE ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate("department");

    res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};
const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findOne({
      $or: [{ _id: id }, { userId: id }],
    }).populate("department");

    if (!employee) {
      return res.status(404).json({
        success: false,
        error: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    console.log("GET EMPLOYEE ERROR:", error);

    return res.status(500).json({
      success: false,
      error: "Server error",
    });
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

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Update employee server error",
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEmployee = await Employee.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
      employee: deletedEmployee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

const fetchEmployeesByDepID = async (req, res) => {
  try {
    const { id } = req.params;
    const employees = await Employee.find({ department: id });

    res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

export {
  addEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  fetchEmployeesByDepID,
};
