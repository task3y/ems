import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDepartments, getEmployees } from '../../utils/EmployeeHelper';

const AddSalary = () => {
  const [salary, setSalary] = useState({
    employee: '',
    month: '',
    year: new Date().getFullYear(),
    earnings: [
      { title: 'Basic Salary', amount: 0 },
      { title: 'Fixed Allowance', amount: 0 },
      { title: 'House Rent Allowance', amount: 0 },
      { title: 'Shift Bonus', amount: 0 },
    ],

    deductions: [
      { title: 'Provident Fund', amount: 0 },
      { title: 'Loan', amount: 0 },
      { title: 'Professional Tax', amount: 0 },
      { title: 'Security Deposit', amount: 0 },
      { title: 'Off Days', amount: 0 },
    ],
  });
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);

  const navigate = useNavigate();

  const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value);
    setEmployees(emps);
  };

  const handleChange = (e) => {
    const { value } = e.target;

    setSalary((prev) => ({
      ...prev,
      employee: value,
    }));
  };

  const handleEarningChange = (index, value) => {
    const updatedEarnings = [...salary.earnings];
    updatedEarnings[index].amount = Number(value);

    setSalary((prev) => ({
      ...prev,
      earnings: updatedEarnings,
    }));
  };

  const handleDeductionChange = (index, value) => {
    const updatedDeductions = [...salary.deductions];
    updatedDeductions[index].amount = Number(value);

    setSalary((prev) => ({
      ...prev,
      deductions: updatedDeductions,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/salary/add`,
        salary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.data.success) {
        navigate('/admin-dashboard/employees');
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
        console.log(error.response?.data?.message);
      }
    }
  };

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const totalEarnings = salary.earnings.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  const totalDeductions = salary.deductions.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  const netSalary = totalEarnings - totalDeductions;
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm p-8 space-y-10"
      >
        {/* Department & Employee Selection */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Employee Selection
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Department */}
            <div>
              <label htmlFor="department" className="block text-gray-600 mb-2">
                Department
              </label>

              <select
                name="department"
                onChange={handleDepartment}
                required
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Department</option>
                {departments.map((dep) => (
                  <option key={dep._id} value={dep._id}>
                    {dep.departmentName}
                  </option>
                ))}
              </select>
            </div>

            {/* Employee */}
            <div>
              <label htmlFor="employee" className="block text-gray-600 mb-2">
                Employee
              </label>

              <select
                name="employee"
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <hr />

        <div>
          <label className="block text-gray-600 mb-2">Month</label>
          <select
            value={salary.month}
            onChange={(e) =>
              setSalary((prev) => ({
                ...prev,
                month: e.target.value,
              }))
            }
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3"
            required
          >
            <option value="">Select Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-600 mb-2">Year</label>
          <input
            type="number"
            value={salary.year}
            onChange={(e) =>
              setSalary((prev) => ({
                ...prev,
                year: Number(e.target.value),
              }))
            }
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3"
            required
          />
        </div>
        {/* Earnings Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-6">Earnings</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 mb-2">
                Basic Salary (PKR)
              </label>
              <input
                type="number"
                value={salary.earnings[0].amount}
                onChange={(e) => handleEarningChange(0, e.target.value)}
                className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-4 py-3 text-gray-800
focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">
                Fixed Allowance (PKR)
              </label>
              <input
                type="number"
                value={salary.earnings[1].amount}
                onChange={(e) => handleEarningChange(1, e.target.value)}
                className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-4 py-3 text-gray-800
focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">
                House Rent Allowance (PKR)
              </label>
              <input
                type="number"
                value={salary.earnings[2].amount}
                onChange={(e) => handleEarningChange(2, e.target.value)}
                className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-4 py-3 text-gray-800
focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">
                Shift Bonus (PKR)
              </label>
              <input
                type="number"
                value={salary.earnings[3].amount}
                onChange={(e) => handleEarningChange(3, e.target.value)}
                className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-4 py-3 text-gray-800
focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
              />
            </div>
          </div>
        </section>

        <hr />

        {/* Deductions Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Deductions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 mb-2">
                Provident Fund (PKR)
              </label>
              <input
                type="number"
                value={salary.deductions[0].amount}
                onChange={(e) => handleDeductionChange(0, e.target.value)}
                className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-4 py-3 text-gray-800
focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">Loan (PKR)</label>
              <input
                type="number"
                value={salary.deductions[1].amount}
                onChange={(e) => handleDeductionChange(1, e.target.value)}
                className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-4 py-3 text-gray-800
focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">
                Professional Tax (PKR)
              </label>
              <input
                type="number"
                value={salary.deductions[2].amount}
                onChange={(e) => handleDeductionChange(2, e.target.value)}
                className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-4 py-3 text-gray-800
focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">
                Security Deposit (PKR)
              </label>
              <input
                type="number"
                value={salary.deductions[3].amount}
                onChange={(e) => handleDeductionChange(3, e.target.value)}
                className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-4 py-3 text-gray-800
focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">Off Days (PKR)</label>
              <input
                type="number"
                value={salary.deductions[4].amount}
                onChange={(e) => handleDeductionChange(4, e.target.value)}
                className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-4 py-3 text-gray-800
focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
              />
            </div>
          </div>
        </section>

        <hr />

        {/* Summary */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-6">Summary</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-600 mb-2">Total Earnings</label>
              <input
                type="number"
                readOnly
                value={totalEarnings}
                className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-4 py-3 text-gray-800
focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">
                Total Deductions
              </label>
              <input
                type="number"
                readOnly
                value={totalDeductions}
                className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-4 py-3 text-gray-800
focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">Net Salary</label>
              <input
                type="number"
                readOnly
                value={netSalary}
                className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-4 py-3 text-gray-800
focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
              />
            </div>
          </div>
        </section>

        {/* Button */}
        <div className="pt-6">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition"
          >
            Save Salary
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSalary;
