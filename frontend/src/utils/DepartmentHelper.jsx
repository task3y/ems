import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const colums = [
  {
    name: 'Department ID',
    selector: (row) => row._id,
  },
  {
    name: 'Department',
    cell: (row) => {
      const departmentColors = {
        'Software Development': 'bg-blue-500',
        'Quality Assurance': 'bg-green-500',
        DevOps: 'bg-purple-500',
        'IT Support': 'bg-yellow-500',
        'Product Management': 'bg-pink-500',
        'UI/UX Design': 'bg-indigo-500',
        Cybersecurity: 'bg-red-500',
        'Data & Analytics': 'bg-cyan-500',
        'Sales & Marketing': 'bg-orange-500',
        'Human Resources': 'bg-emerald-500',
      };

      const dotColor = departmentColors[row.departmentName] || 'bg-gray-400';

      return (
        <div className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs font-medium">
          <span className={`w-2 h-2 ${dotColor} rounded-full`}></span>
          {row.departmentName}
        </div>
      );
    },
  },
  {
    name: 'Total Employees',
    selector: (row) => row.totalEmployees,
  },
  {
    name: 'Status',
    selector: (row) => row.status,
  },
  {
    name: 'Actions',
    selector: (row) => row.actions,
  },
];

const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this department?'
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        if (response.data.success) {
          onDepartmentDelete(id);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    }
  };
  return (
    <div className="flex items-center gap-3">
      {/* Edit */}
      <button
        className="w-9 h-9 flex items-center justify-center rounded-xl transition hover:bg-blue-100"
        onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
      >
        <span className="material-symbols-rounded text-blue-600 text-xl">
          edit
        </span>
      </button>

      {/* Delete */}
      <button
        className="w-9 h-9 flex items-center justify-center rounded-xl transition hover:bg-red-100"
        onClick={() => handleDelete(_id)}
      >
        <span className="material-symbols-rounded text-red-600 text-xl">
          delete
        </span>
      </button>
    </div>
  );
};

export { colums, DepartmentButtons };
