import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get('http://localhost:5000/api/department', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return departments;
};

// fetching employees of a department for salary form

const getEmployees = async (id) => {
  let employees;
  try {
    const response = await axios.get(
      `http://localhost:5000/api/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return employees;
};

const colums = [
  {
    name: 'Employee Name',
    selector: (row) => row.employeeName,
  },
  {
    name: 'Payroll',
    selector: (row) => row.payroll,
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
        'Cybersecurity: ': 'bg-red-500',
        'Data & Analytics': 'bg-cyan-500',
        'Sales & Marketing': 'bg-orange-500',
        'Human Resources': 'bg-emerald-500',
      };

      const dotColor = departmentColors[row.department] || 'bg-gray-400';

      return (
        <div className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs font-medium">
          <span className={`w-2 h-2 ${dotColor} rounded-full`}></span>
          {row.department}
        </div>
      );
    },
  },
  {
    name: 'Status',
    selector: (row) => {
      const statusStyles = {
        Active: 'bg-green-50 text-green-600',
        Inactive: 'bg-red-50 text-red-600',
        'On Leave': 'bg-yellow-50 text-yellow-600',
      };

      return (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium ${
            statusStyles[row.status] || 'bg-gray-100 text-gray-600'
          }`}
        >
          {row.status}
        </span>
      );
    },
  },
  {
    name: 'Joining Date',
    selector: (row) => {
      const formattedDate = new Date(row.joiningDate).toLocaleDateString(
        'en-US',
        {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        }
      );

      return (
        <div className="flex items-center gap-2 text-gray-600 text-xs font-medium">
          <span className="material-symbols-rounded text-gray-300 text-base">
            calendar_today
          </span>
          <span>{formattedDate}</span>
        </div>
      );
    },
  },
  {
    name: 'ContractType',
    selector: (row) => {
      const typeStyles = {
        'Full-Time': 'bg-blue-50 text-blue-600',
        'Part-Time': 'bg-green-50 text-green-600',
        Contract: 'bg-purple-50 text-purple-600',
      };

      return (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium ${typeStyles[row.contractType] || 'bg-gray-100 text-gray-600'}`}
        >
          {row.contractType}
        </span>
      );
    },
  },
  {
    name: 'Actions',
    selector: (row) => row.actions,
  },
];

const EmployeeButtons = ({ _id, onEmployeeDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3">
      <button
        className="w-9 h-9 flex items-center justify-center rounded-xl transition hover:bg-blue-100"
        onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}
      >
        <span className="material-symbols-rounded text-blue-600">edit</span>
      </button>
      <button
        className="w-9 h-9 flex items-center justify-center rounded-xl transition hover:bg-green-100"
        onClick={() => navigate(`/admin-dashboard/employees/salary/${_id}`)}
      >
        <span className="material-symbols-rounded text-green-600">money</span>
      </button>
      <button
        className="w-9 h-9 flex items-center justify-center rounded-xl transition hover:bg-yellow-100"
        onClick={() => navigate(`/admin-dashboard/employees/view/${_id}`)}
      >
        <span className="material-symbols-rounded text-yellow-600">
          account_box
        </span>
      </button>
      <button
        className="w-9 h-9 flex items-center justify-center rounded-xl transition hover:bg-red-100"
        onClick={() => navigate(`/admin-dashboard/employees/leave/${_id}`)}
      >
        <span className="material-symbols-rounded text-red-600">priority</span>
      </button>
    </div>
  );
};
export { colums, EmployeeButtons, fetchDepartments, getEmployees };
