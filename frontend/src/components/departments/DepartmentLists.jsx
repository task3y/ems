import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import {colums, DepartmentButtons } from '../../utils/DepartmentHelper';
import axios from 'axios';

const DepartmentLists = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    // Fetch department data from the server and update the state
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/department', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.data.success) {
          const data = response.data.departments.map((department) => ({
            _id: department._id,
            departmentName: department.departmentName,
            actions: (<DepartmentButtons _id={department._id} />),
            status: department.status,
          }));
          setDepartments(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  const filteredDepartments = departments.filter((dept) =>
    dept.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <>
      {depLoading ? <div>Loading departments...</div> : (
        <div>
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4 ml-3 mt-4">
              Manage Departments
            </h3>
          </div>
          <div className="flex items-center justify-between mb-2 ml-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100">
                  <span className="material-symbols-rounded text-gray-600 text-lg">
                  format_list_bulleted
                  </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Department List
              </h2>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <span className="material-symbols-rounded absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                  search
                </span>
              </div>
                <Link to="/admin-dashboard/add-department" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mr-2 rounded-xl text-sm font-medium transition">+ Add Department</Link>
            </div>
          </div>
          <div>
            <DataTable 
              columns={colums} 
              data={departments}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default DepartmentLists;