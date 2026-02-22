import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const colums = [
    {
        name: "Department ID",
        selector: (row) => row._id,
    },
    {
        name: "Department Name",
        selector: (row) => row.departmentName,
    },
    {
        name: "Total Employees",
        selector: (row) => row.totalEmployees,

    },
    {
        name:"Status",
        selector: (row) => row.status,
    },
    {
        name: "Actions",
        selector: (row) => row.actions,
    }
]

const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this department?");
        if (confirmDelete) {
        try {
            const response = await axios.delete(`http://localhost:5000/api/department/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                onDepartmentDelete(id);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    }    
}
    return (
        <div className="flex items-center gap-3">

  {/* Edit */}
  <button className="w-9 h-9 flex items-center justify-center rounded-xl transition hover:bg-blue-100"
    onClick={() => navigate(`/admin-dashboard/department/${_id}`)}>
    <span className="material-symbols-rounded text-blue-600 text-xl">
      edit
    </span>
  </button>

  {/* Delete */}
  <button className="w-9 h-9 flex items-center justify-center rounded-xl transition hover:bg-red-100"
    onClick={() => handleDelete(_id)}>
    <span className="material-symbols-rounded text-red-600 text-xl">
      delete
    </span>
  </button>

</div>

    )
}

export { colums, DepartmentButtons };