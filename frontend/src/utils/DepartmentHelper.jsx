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

const DepartmentButtons = () => {
    return (
        <div>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    )
}

export { colums, DepartmentButtons };