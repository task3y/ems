import React from 'react';
import { Plus, Calendar, Download, FileText, Phone } from 'lucide-react';
import { useAuth } from '../../context/authContext';

const EmployeeSummary = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gray-100 overflow-y-auto min-h-screen p-6 font-inter">
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">
          Hey, {user.username}! 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Welcome back to your dashboard. Here's what's happening today.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

        <div className="space-y-3">
          <button className="flex items-center gap-3 w-full border border-gray-200 rounded-lg px-4 py-3 hover:bg-gray-50 transition">
            <Plus size={18} />
            Raise Request
          </button>

          <button className="flex items-center gap-3 w-full border border-gray-200 rounded-lg px-4 py-3 hover:bg-gray-50 transition">
            <Calendar size={18} />
            Apply Leave
          </button>

          <button className="flex items-center gap-3 w-full border border-gray-200 rounded-lg px-4 py-3 hover:bg-gray-50 transition">
            <Download size={18} />
            Download Payslip
          </button>
        </div>
      </div>

      {/* Company News */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText size={18} />
          <h2 className="text-lg font-semibold">Company News & Updates</h2>
        </div>

        {/* News Card */}
        <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-md mb-3">
          <h3 className="font-medium text-gray-900">
            New Healthcare Guidelines Released
          </h3>
          <p className="text-gray-600 text-sm">
            Updated protocols for patient care and safety measures.
          </p>
          <span className="text-xs text-gray-500">2 hours ago</span>
        </div>

        {/* News Card */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
          <h3 className="font-medium text-gray-900">Staff Appreciation Week</h3>
          <p className="text-gray-600 text-sm">
            Join us for special events and recognition ceremonies.
          </p>
          <span className="text-xs text-gray-500">1 day ago</span>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Phone size={18} />
          <h2 className="text-lg font-semibold">Emergency Contacts</h2>
        </div>

        <div className="divide-y divide-gray-200">
          <div className="flex justify-between py-3">
            <span>Security</span>
            <span className="font-medium">+91 98765 43210</span>
          </div>

          <div className="flex justify-between py-3">
            <span>Medical Emergency</span>
            <span className="font-medium">+91 98765 43211</span>
          </div>

          <div className="flex justify-between py-3">
            <span>IT Helpdesk</span>
            <span className="font-medium">+91 98765 43212</span>
          </div>

          <div className="flex justify-between py-3">
            <span>HR Department</span>
            <span className="font-medium">hr@company.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSummary;
