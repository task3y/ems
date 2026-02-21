import { Link, useNavigate } from "react-router-dom";
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

const DepartmentButtons = ({ _id }) => {
    const navigate = useNavigate();
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
  <button className="w-9 h-9 flex items-center justify-center rounded-xl transition hover:bg-red-100">
    <span className="material-symbols-rounded text-red-600 text-xl">
      delete
    </span>
  </button>

</div>

    )
}

export { colums, DepartmentButtons };