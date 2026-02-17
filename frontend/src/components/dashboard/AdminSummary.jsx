import React from 'react'
import SummaryCard from '../SummaryCard'

const AdminSummary = () => {
  return (
    <div className='p-6'>
        <h3 className='text-2xl font-bold'>Dashboard Overview</h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
            <SummaryCard text="Total Employee" number={100} icon={<i className="material-symbols-rounded">group</i>} color="bg-blue-100"/>
            <SummaryCard text="Total Departments" number={10} icon={<i className="material-symbols-rounded">apartment</i>} color="bg-green-100"/>
            <SummaryCard text="Monthly Salary" number={25} icon={<i className="material-symbols-rounded">euro_symbol</i>} color="bg-yellow-100"/>
        </div>
        <div className='mt-12'>
            <h4 className='text-2xl font-bold'>Leave Details</h4>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                <SummaryCard text="Pending Leaves" number={5} icon={<i className="material-symbols-rounded">pending</i>} color="bg-yellow-100"/>
                <SummaryCard text="Approved Leaves" number={15} icon={<i className="material-symbols-rounded">check_circle</i>} color="bg-green-100"/>
                <SummaryCard text="Rejected Leaves" number={5} icon={<i className="material-symbols-rounded">cancel</i>} color="bg-red-100"/>
                <SummaryCard text="Cancelled Leaves" number={0} icon={<i className="material-symbols-rounded">close</i>} color="bg-gray-100"/>
            </div>
        </div>
    </div>
  )
}

export default AdminSummary