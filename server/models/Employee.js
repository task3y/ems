import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: Number, required: true },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  payroll: { type: Number, required: true },
  payroll_id: { type: String, required: true, unique: true },
  joiningDate: { type: Date, default: Date.now },
  contractType: {
    type: String,
    enum: ["Full-Time", "Part-Time", "Contract"],
    default: "Full-Time",
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive", "On Leave"],
    default: "Active",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
