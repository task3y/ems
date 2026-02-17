import React from 'react'

const SummaryCard = ({icon, text, number, color}) => {
  return (
    <div className='bg-white border border-gray-200 rounded-2xl p-6 flex items-center justify-between w-full max-w-xl'>
        <div>
            <p className="text-gray-500 text-lg">{text}</p>
            <h2 className="text-3xl font-semibold mt-2">{number}</h2>
        </div>
        <div className={`w-16 h-16 rounded-xl ${color} flex items-center justify-center`}>
            {icon}
        </div>
    </div>
  )
}

export default SummaryCard;