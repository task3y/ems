import Salary from "../models/Salary.js";

const addSalary = async (req, res) => {
  try {
    const {
      employee,
      month,
      year,
      earnings,
      deductions,
      totalEarnings,
      totalDeductions,
      netSalary,
    } = req.body;

    const newSalary = new Salary({
      employee,
      month,
      year,
      earnings,
      deductions,
      totalEarnings,
      totalDeductions,
      netSalary,
    });

    await newSalary.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: " salary add server error" });
  }
};

const getSalary = async (req, res) => {
  try {
    const { id } = req.params;
    const salary = await Salary.find({ employee: id }).populate("employee");
    return res.status(200).json({ success: true, salary });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: " get salary server error" });
  }
};
export { addSalary, getSalary };
