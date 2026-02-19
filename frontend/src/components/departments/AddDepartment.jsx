import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
    const [departmentName, setDepartmentName] = useState({
        departmentName: '',
        description: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartmentName(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/department/add', departmentName, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            if(response.data.success) {
                navigate('/admin-dashboard/departments');
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
            <div className="flex items-center justify-center gap-3 mb-8">
      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
      <div className="w-10 h-1 bg-blue-300 rounded-full"></div>
      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
    </div>
            <h3 className="text-3xl font-bold flex items-center justify-center mb-10 text-gray-800">
                Add Department
            </h3>
            <form onSubmit={handleSubmit}>
                <div >
                    <label htmlFor="departmentName" 
                    className='text-sm font-medium text-gray-700 mb-2 block'>Department Name</label>
                    <div >
                        <input 
                        type="text"
                        id="deparntmetName" 
                        name="departmentName" 
                        onChange={handleChange}
                        placeholder='Department Name' 
                        className="border border-gray-200 rounded-xl p-4 mb-6 bg-white w-full" />
                    </div>
                </div>
                <div >
                    <label 
                    htmlFor="description" 
                    className='text-sm font-medium text-gray-700 mb-2 block'>Description</label>
                    <div >
                        <textarea 
                        id="description" 
                        name="description" 
                        onChange={handleChange}
                        placeholder='Description'  
                        className="border border-gray-200 rounded-xl p-6 bg-white mb-6 w-full"/>
                    </div>
                </div>
                <div>
                    <button 
                    type="submit" 
                    className="w-full bg-blue-600 mb-70 text-white py-3 rounded-xl hover:bg-blue-700 transition">
                        Add Department
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddDepartment;