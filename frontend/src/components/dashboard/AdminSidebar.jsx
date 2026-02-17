
import { NavLink } from 'react-router-dom'

const AdminSidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-100 border-r border-gray-200 p-6 flex flex-col">
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4 mb-8">
    {/* Logo Box */}
    <div className="w-14 h-14 rounded-xl bg-orange-400 flex items-center justify-center text-white text-xl font-bold shadow-md">
        EM
    </div>
    {/* Title + Email */}
    <div>
        <h2 className="font-semibold text-lg">Employee MS</h2>
        <p className="text-gray-500 text-sm">admin@gmail.com</p>
    </div>

    </div>
        <div className="flex flex-col gap-3">
            <NavLink to="/admin-dashboard" className={({ isActive }) =>`px-4 py-2 rounded-lg transition flex items-center gap-3 ${isActive ? "bg-white text-black shadow-sm font-medium": "text-gray-600 hover:bg-gray-200"}`}
            end >
                <span className="material-symbols-rounded">dashboard</span>
                <span className="font-medium">Dashboard</span>
            </NavLink>
            <NavLink to="/admin-dashboard/employees" className={({ isActive }) =>`px-4 py-2 rounded-lg transition flex items-center gap-3 ${isActive ? "bg-white text-black shadow-sm font-medium": "text-gray-600 hover:bg-gray-200"}`}
            end >
                <span className="material-symbols-rounded">group</span>
                <span className="font-medium">Employees</span>
            </NavLink>
            <NavLink to="/admin-dashboard/departments" className={({ isActive }) =>`px-4 py-2 rounded-lg transition flex items-center gap-3 ${isActive ? "bg-white text-black shadow-sm font-medium": "text-gray-600 hover:bg-gray-200"}`}
            end >
                <span className="material-symbols-rounded">apartment</span>
                <span className="font-medium">Departments</span>
            </NavLink>
            <NavLink to="/admin-dashboard/leaves" className={({ isActive }) =>`px-4 py-2 rounded-lg transition flex items-center gap-3 ${isActive ? "bg-white text-black shadow-sm font-medium": "text-gray-600 hover:bg-gray-200"}`}
            end >
                <span className="material-symbols-rounded">event</span>
                <span className="font-medium">Leaves</span>
            </NavLink>
            <NavLink to="/admin-dashboard/salary" className={({ isActive }) =>`px-4 py-2 rounded-lg transition flex items-center gap-3 ${isActive ? "bg-white text-black shadow-sm font-medium": "text-gray-600 hover:bg-gray-200"}`}
            end >
                <span className="material-symbols-rounded">currency_rupee</span>
                <span className="font-medium">Salary</span>
            </NavLink>
            <NavLink to="/admin-dashboard/settings" className={({ isActive }) =>`px-4 py-2 rounded-lg transition flex items-center gap-3 ${isActive ? "bg-white text-black shadow-sm font-medium": "text-gray-600 hover:bg-gray-200"}`}
            end >
                <span className="material-symbols-rounded">settings</span>
                <span className="font-medium">Settings</span>
            </NavLink>
        </div>
    </div>
  )
}

export default AdminSidebar