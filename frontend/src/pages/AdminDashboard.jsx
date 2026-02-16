import AdminSidebar from "../components/dashboard/AdminSidebar";
import { useAuth } from "../context/authContext"

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <AdminSidebar />
    </div>

  )
}

export default AdminDashboard;