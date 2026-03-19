import React from 'react';
import { Link } from 'react-router-dom';

const UpcomingTimeOff = () => {
  const data = [
    {
      date: 'Dec 23–27, 2024',
      type: 'Annual Leave',
      days: 5,
      status: 'Approved',
    },
    {
      date: 'Jan 15, 2025',
      type: 'Personal Leave',
      days: 1,
      status: 'Pending',
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">Upcoming Time Off</h2>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-gray-800">{item.date}</h3>
              <p className="text-sm text-gray-500">
                {item.type} • {item.days} day{item.days > 1 && 's'}
              </p>
            </div>

            <span
              className={`text-xs px-3 py-1 rounded-full ${
                item.status === 'Approved'
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* 🔹 Leave Balance Component */
const LeaveBalances = () => {
  const balances = [
    { name: 'Annual Leave', used: 7, total: 25 },
    { name: 'Sick Leave', used: 2, total: 10 },
    { name: 'Personal Leave', used: 1, total: 3 },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
      <h2 className="text-lg font-semibold mb-6">Leave Balances</h2>

      {balances.map((item, index) => {
        const percent = (item.used / item.total) * 100;

        return (
          <div key={index} className="mb-6 last:mb-0">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-gray-800">{item.name}</span>
              <span className="text-gray-500">
                {item.total - item.used} days available
              </span>
            </div>

            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${percent}%` }}
              />
            </div>

            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Used: {item.used}</span>
              <span>Total: {item.total}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* 🔹 Main Page */
const list = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Time Off Dashboard
          </h1>
          <p className="text-sm text-gray-500">Employee ID: EMP001234</p>
        </div>

        <Link
          to="/employee-dashboard/add-leave"
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          + New Request
        </Link>
      </div>

      {/* TOP */}
      <UpcomingTimeOff />

      {/* MIDDLE */}
      <LeaveBalances />

      {/* BOTTOM */}
      <UpcomingTimeOff />
    </div>
  );
};

export default list;
