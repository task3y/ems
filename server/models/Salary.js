import mongoose from "mongoose";

const salaryItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
});

const salarySchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    month: { type: String, required: true },
    year: { type: Number, required: true },

    earnings: [salaryItemSchema],
    deductions: [salaryItemSchema],

    totalEarnings: { type: Number, default: 0 },
    totalDeductions: { type: Number, default: 0 },
    netSalary: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Salary = mongoose.model("Salary", salarySchema);

export default Salary;
