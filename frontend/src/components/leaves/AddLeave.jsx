import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddLeave = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [leave, setLeave] = useState({
    userId: user._id,
    leaveType: '',
    duration: 'Full Day',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5000/api/leave/add`,
        leave,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        navigate('/employee-dashboard/leaves');
      }
    } catch (error) {
      console.log(error);
      console.log('FULL ERROR:', error);
      console.log('BACKEND ERROR:', error.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">
          Request Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Leave Type + Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Leave Type */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Leave Type *
              </label>
              <select
                name="leaveType"
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-50 border rounded-lg"
              >
                <option value="">Select leave type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Annual Leave">Annual Leave</option>
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Duration *
              </label>
              <div className="space-y-2">
                <label>
                  <input
                    type="radio"
                    name="duration"
                    value="Full Day"
                    checked={leave.duration === 'Full Day'}
                    onChange={handleChange}
                  />{' '}
                  Full Day
                </label>

                <label>
                  <input
                    type="radio"
                    name="duration"
                    value="Half Day"
                    checked={leave.duration === 'Half Day'}
                    onChange={handleChange}
                  />{' '}
                  Half Day
                </label>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-6">
            <input
              type="date"
              name="startDate"
              value={leave.startDate}
              onChange={handleChange}
              className="p-3 border rounded-lg"
              required
            />

            <input
              type="date"
              name="endDate"
              value={leave.endDate}
              onChange={handleChange}
              className="p-3 border rounded-lg"
              required
            />
          </div>

          {/* Reason */}
          <textarea
            name="reason"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Reason"
          />

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button type="button" className="px-6 py-3 border rounded-lg">
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeave;
