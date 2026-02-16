import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import EmployeeDashboard from './pages/EmployeeDashboard';

function App() {

  return (
   <BrowserRouter>
     <Routes>
       <Route path='/' element={<Navigate to="/admin-dashboard" />} />
       <Route path='/login' element={<Login/>} />
       <Route path='/admin-dashboard' element={<AdminDashboard />} />
       <Route path='/employee-dashboard' element={<EmployeeDashboard />} />
     </Routes>
   </BrowserRouter>
  );
}

export default App;
