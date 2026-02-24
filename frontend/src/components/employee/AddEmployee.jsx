import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchDepartments } from '../../utils/EmployeeHelper';

const AddEmployee = () => {
  const [departments, setDepartments] = useState([]);
  const [employeeName, setEmployeeName] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    status: 'Active',
    department: '',
    role: '',
    password: '',
    payroll: '',
    payroll_id: '',
    contractType: 'Full-Time',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeName((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/employee/add',
        employeeName,
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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <div className="w-10 h-1 bg-blue-300 rounded-full"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
        </div>
        <h3 className="text-3xl font-bold flex items-center justify-center mb-10 text-gray-800">
          Add Employee
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Employee Name
              </label>
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  placeholder="Insert Name"
                  className="border border-gray-200 rounded-lg p-3 bg-white w-full"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Username
              </label>
              <div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  onChange={handleChange}
                  placeholder="username"
                  className="border border-gray-200 rounded-lg p-3 bg-white w-full"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Email
              </label>
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Insert Email"
                  className="border border-gray-200 rounded-lg p-3 bg-white w-full"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Phone Number
              </label>
              <div>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="border border-gray-200 rounded-lg p-3 bg-white w-full"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Password
              </label>
              <div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="*********"
                  className="border border-gray-200 rounded-lg p-3 bg-white w-full"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="department"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Department
              </label>
              <div>
                <select
                  name="department"
                  onChange={handleChange}
                  required
                  className="border border-gray-200 rounded-lg p-3 bg-white w-full"
                >
                  <option value="">Select Department</option>
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.departmentName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="role"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Role
              </label>
              <div>
                <select
                  name="role"
                  onChange={handleChange}
                  className="border border-gray-200 rounded-lg p-3 bg-white w-full"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="payroll"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Payroll
              </label>
              <div>
                <input
                  type="number"
                  id="payroll"
                  name="payroll"
                  onChange={handleChange}
                  placeholder="Payroll"
                  className="border border-gray-200 rounded-lg p-3 bg-white w-full"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="payroll_id"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Payroll ID
              </label>
              <div>
                <input
                  type="text"
                  id="payroll_id"
                  name="payroll_id"
                  onChange={handleChange}
                  placeholder="Payroll ID"
                  className="border border-gray-200 rounded-lg p-3 bg-white w-full"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="contractType"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Contract Type
              </label>
              <div>
                <select
                  name="contractType"
                  onChange={handleChange}
                  className="border border-gray-200 rounded-lg p-3 bg-white w-full"
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="status"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Status
              </label>
              <div>
                <select
                  name="status"
                  onChange={handleChange}
                  className="border border-gray-200 rounded-lg p-3 bg-white w-full"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Add Employee
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
