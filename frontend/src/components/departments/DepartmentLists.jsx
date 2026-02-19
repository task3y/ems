import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import {colums, DepartmentButtons } from '../../utils/DepartmentHelper';
import axios from 'axios';

const DepartmentLists = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false); 
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
            actions: (<DepartmentButtons />),
            status: department.status,
          }));
          setDepartments(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
      }
    } finally {      setDepLoading(false);  }
  };
    fetchDepartments();
  }, []);


  return (
    <>{depLoading ? <div>Loading departments...</div> : (
      <div>
        <div>
          <h3>
            Manage Departments
          </h3>
        </div>
        <div>
          <input type="text" placeholder='Search Department' />
          <Link to="/admin-dashboard/add-department">Add Department</Link>
        </div>
        <div>
          <DataTable 
          columns={colums} 
          data={departments}></DataTable>
        </div>
      </div>
    )}
    </>
  )
}

export default DepartmentLists;