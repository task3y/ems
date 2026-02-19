import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  departmentName: { type: String, required: true },
  description: { type: String, default: '' },
  status: {
      type: String,
      enum: ["Active", "Inactive", "Archived"],
      default: "Active",},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Department = mongoose.model('Department', departmentSchema);

export default Department;