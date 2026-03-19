import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const EmployeeSidebar = () => {
  const { user } = useAuth();
  return (
    <div className="w-64 h-screen sticky top-0 bg-gray-100 border-r border-gray-200 p-6 flex flex-col">
      {/* Logo + Title */}
      <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-xl bg-orange-400 flex items-center justify-center text-white text-xl font-bold shadow-md">
          EM
        </div>

        <div>
          <h2 className="font-semibold text-lg">Employee MS</h2>
          <p className="text-gray-500 text-sm">ems@company.com</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col gap-3 flex-1">
        <NavLink
          to="/employee-dashboard"
          end
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition flex items-center gap-3 ${
              isActive
                ? 'bg-white text-black shadow-sm font-medium'
                : 'text-gray-600 hover:bg-gray-200'
            }`
          }
        >
          <span className="material-symbols-rounded">dashboard</span>
          <span className="font-medium">Dashboard</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/profile/${user._id}`}
          end
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition flex items-center gap-3 ${
              isActive
                ? 'bg-white text-black shadow-sm font-medium'
                : 'text-gray-600 hover:bg-gray-200'
            }`
          }
        >
          <span className="material-symbols-rounded">group</span>
          <span className="font-medium">My Profile</span>
        </NavLink>

        <NavLink
          to="/employee-dashboard/leaves"
          end
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition flex items-center gap-3 ${
              isActive
                ? 'bg-white text-black shadow-sm font-medium'
                : 'text-gray-600 hover:bg-gray-200'
            }`
          }
        >
          <span className="material-symbols-rounded">event</span>
          <span className="font-medium">Leaves</span>
        </NavLink>

        <NavLink
          to="/employee-dashboard/salary"
          end
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition flex items-center gap-3 ${
              isActive
                ? 'bg-white text-black shadow-sm font-medium'
                : 'text-gray-600 hover:bg-gray-200'
            }`
          }
        >
          <span className="material-symbols-rounded">currency_rupee</span>
          <span className="font-medium">Salary</span>
        </NavLink>

        <NavLink
          to="/employee-dashboard/settings"
          end
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition flex items-center gap-3 ${
              isActive
                ? 'bg-white text-black shadow-sm font-medium'
                : 'text-gray-600 hover:bg-gray-200'
            }`
          }
        >
          <span className="material-symbols-rounded">settings</span>
          <span className="font-medium">Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default EmployeeSidebar;
