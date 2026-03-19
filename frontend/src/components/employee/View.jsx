import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

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
          setEmployee(response.data.employee);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!employee) return <p>Employee not found</p>;

  return (
    <div>
      <div className="bg-gray-50 min-h-screen p-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          {/* Profile Header */}
          <div className="flex justify-between items-start">
            {/* Left Profile */}
            <div className="flex gap-6">
              <img
                src="https://randomuser.me/api/portraits/men/44.jpg"
                alt="profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
              />

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {employee?.name}
                  </h2>
                  <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
                    {employee?.contractType}
                  </span>
                </div>

                <p className="text-gray-500 text-sm">
                  {employee.department?.departmentName}
                </p>

                <div className="flex flex-wrap gap-6 text-gray-600 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-rounded text-gray-500">
                      mail
                    </span>
                    {employee?.email}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="material-symbols-rounded text-gray-500">
                      call
                    </span>
                    {employee?.phoneNumber}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="material-symbols-rounded text-gray-500">
                      location_on
                    </span>
                    San Francisco, CA
                  </div>
                </div>

                <p className="text-sm text-gray-500">
                  Payroll ID: {employee?.payroll_id}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 hover:shadow-sm transition">
              <p className="text-sm text-gray-500">Monthly Salary</p>
              <h3 className="text-xl font-semibold text-blue-700 mt-1">
                ${employee.payroll}
              </h3>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6 hover:shadow-sm transition">
              <p className="text-sm text-gray-500">Attendance Rate</p>
              <h3 className="text-xl font-semibold text-green-700 mt-1">96%</h3>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 hover:shadow-sm transition">
              <p className="text-sm text-gray-500">Performance Rating</p>
              <h3 className="text-xl font-semibold text-yellow-700 mt-1 flex items-center gap-1">
                ⭐ 4.6
              </h3>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 hover:shadow-sm transition">
              <p className="text-sm text-gray-500">Leave Balance</p>
              <h3 className="text-xl font-semibold text-purple-700 mt-1">
                8 days
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
