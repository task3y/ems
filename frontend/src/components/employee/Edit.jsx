import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDepartments } from '../../utils/EmployeeHelper';

const Edit = () => {
  const [employee, setEmployee] = useState({
    name: '',
    phoneNumber: '',
    department: '',
    payroll: '',
    salary: 0,
    contractType: '',
    status: '',
  });
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/employee/${id}`,
        employee,
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

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        console.log('FULL RESPONSE:', response);
        console.log('DATA:', response.data);
        console.log('EMP:', response.data.employee);

        if (response.data.success) {
          const employee = response.data.employee;
          setEmployee((prev) => ({
            ...prev,
            name: employee.name,
            phoneNumber: employee.phoneNumber,
            department: employee.department,
            payroll: employee.payroll,
            contractType: employee.contractType,
            status: employee.status,
          }));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
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
          Edit Employee
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
                  value={employee.name}
                  onChange={handleChange}
                  placeholder="Insert Name"
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
                  value={employee.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
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
                  value={employee.payroll}
                  onChange={handleChange}
                  placeholder="Payroll"
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
                  value={employee.contractType}
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
                  value={employee.status}
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
                Update Employee
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
