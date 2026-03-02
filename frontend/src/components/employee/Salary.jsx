import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Salary = () => {
  const [salaries, setSalaries] = useState([]);
  const [filteredSalaries, setFilteredSalaries] = useState([]);
  const { id } = useParams();
  let sno = 1;

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/salary/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const filterSalaries = (e) => {
    const q = e.target.value;

    const filteredRecords = salaries.filter((salary) =>
      salary.employeeId.employeeName.toLowerCase().includes(q.toLowerCase())
    );

    setFilteredSalaries(filteredRecords);
  };

  return (
    <>
      {filteredSalaries === null ? (
        <div>Loading . . . </div>
      ) : (
        <div>
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <div className="flex items-center gap-3 text-3xl font-bold text-gray-900">
              <span>Salary Records</span>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search payroll or name"
                onChange={filterSalaries}
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
          {filteredSalaries?.length > 0 ? (
            <div>
              <div className="bg-white overflow-hidden">
                <table className="w-full text-sm text-left ">
                  {/* Table Head */}
                  <thead className="bg-white border-b border-gray-200 text-bold text-xs">
                    <tr>
                      <th className="px-6 py-4 font-inter">Sno</th>
                      <th className="px-6 py-4 font-inter">Name</th>
                      <th className="px-6 py-4 font-inter">Email</th>
                      <th className="px-6 py-4 font-inter">Contract Type</th>
                      <th className="px-6 py-4 font-inter">Salary</th>
                      <th className="px-6 py-4 font-inter">Deductions</th>
                      <th className="px-6 py-4 font-inter">Total</th>
                      <th className="px-6 py-4 font-inter">Month</th>
                      <th className="px-6 py-4 font-inter">Year</th>
                    </tr>
                  </thead>
                  {/* Table Body */}
                  <tbody className="divide-y divide-gray-200">
                    {filteredSalaries.map((salary) => (
                      <tr
                        key={salary._id}
                        className="hover:bg-gray-50 transition duration-200"
                      >
                        <td className="px-6 py-4 text-xs font-inter">
                          {sno++}
                        </td>
                        <td className="px-6 py-4 text-xs font-inter">
                          {salary.employee.name}
                        </td>
                        <td className="px-6 py-4 text-xs font-inter">
                          {salary.employee.email}
                        </td>
                        <td className="px-6 py-4 text-xs font-inter ">
                          {salary.employee.contractType}
                        </td>
                        <td className="px-6 py-4 text-xs font-inter text-green-500">
                          + ₹ {salary.totalEarnings}
                        </td>
                        <td className="px-6 py-4 text-xs font-inter text-red-500">
                          - ₹ {salary.totalDeductions}
                        </td>
                        <td className="px-6 py-4  text-xs font-inter text-gray-500">
                          ₹ {salary.netSalary}
                        </td>
                        <td className="px-6 py-4 text-xs font-inter">
                          {salary.month}
                        </td>
                        <td className="px-6 py-4  text-xs font-inter">
                          {salary.year}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div> No Records </div>
          )}
        </div>
      )}
    </>
  );
};

export default Salary;
