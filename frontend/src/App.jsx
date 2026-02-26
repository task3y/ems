import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import EmployeeDashboard from './pages/EmployeeDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import DepartmentLists from './components/departments/DepartmentLists';
import AdminSummary from './components/dashboard/AdminSummary';
import AddDepartment from './components/departments/AddDepartment';
import EditDepartment from './components/departments/EditDepartment';
import EmployeeLists from './components/employee/EmployeeLists';
import AddEmployee from './components/employee/AddEmployee';
import View from './components/employee/View';
import Edit from './components/employee/Edit';
import Salary from './components/employee/Salary';
import Leave from './components/employee/Leave';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={['admin']}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />} />
          <Route
            path="/admin-dashboard/departments"
            element={<DepartmentLists />}
          />
          <Route
            path="/admin-dashboard/add-department"
            element={<AddDepartment />}
          />
          <Route
            path="/admin-dashboard/department/:id"
            element={<EditDepartment />}
          />
          <Route
            path="/admin-dashboard/employees"
            element={<EmployeeLists />}
          />
          <Route
            path="/admin-dashboard/add-employee"
            element={<AddEmployee />}
          />
          <Route path="/admin-dashboard/employees/:id" element={<Edit />} />
          <Route
            path="/admin-dashboard/employees/view/:id"
            element={<View />}
          />
          <Route
            path="/admin-dashboard/employees/salary/:id"
            element={<Salary />}
          />
          <Route
            path="/admin-dashboard/employees/leave/:id"
            element={<Leave />}
          />
        </Route>

        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
