import React from 'react';
import DataTable from 'react-data-table-component';
import { colums, EmployeeButtons } from '../../utils/EmployeeHelper';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeLists = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Fetch employee data from the server and update the state
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/employee', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data.success) {
          const data = response.data.employees.map((employee) => ({
            _id: employee._id,
            employeeName: employee.name,
            payroll: employee.payroll_id,
            department: employee.department?.departmentName,
            actions: <EmployeeButtons _id={employee._id} />,
            status: employee.status,
            joiningDate: employee.joiningDate,
            contractType: employee.contractType,
          }));
          setEmployees(data);
          setFilteredData(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const filteredEmployees = (e) => {
    const records = employees.filter((emp) =>
      emp.employeeName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(records);
    setSearchTerm(e.target.value);
  };

  return (
    <>
      {empLoading ? (
        <div>Loading employees...</div>
      ) : (
        <div className="p-8 bg-gray-50 min-h-screen">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Employee</h1>
              <p className="text-sm text-gray-500 mt-1">
                View and manage employee
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                to="/admin-dashboard/add-employee"
                className="bg-blue-600 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
              >
                + Add Employee
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="bg-orange-100 text-orange-500 p-2 rounded-lg">
                  👥
                </div>
                <span>
                  Total Employee :{' '}
                  <span className="font-semibold text-gray-800">
                    1285 persons
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Search payroll or name"
                  className="w-72 px-4 py-2 rounded-xl border border-gray-200 
                     focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                />

                <button className="px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50">
                  Filter
                </button>

                <button className="px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50">
                  Sort
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
              <DataTable
                columns={colums}
                data={filteredData}
                highlightOnHover
              />
            </div>
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 text-sm text-gray-600">
              <span>Showing 1 to 10 of 100 entries</span>

              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center">
                  1
                </button>
                <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center">
                  2
                </button>
                <button className="px-3 py-1 rounded-lg border border-gray-200">
                  Back
                </button>
                <button className="px-3 py-1 rounded-lg border border-gray-200">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeLists;
