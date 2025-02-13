import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCar, FaUsers, FaDollarSign, FaChartLine } from 'react-icons/fa';

const Main = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isDashboard = location.pathname === '/dashboard';

  // Dashboard Stats Data
  const stats = [
    { title: 'Total Cars', value: 40, icon: <FaCar className="text-white text-3xl" />, color: 'bg-blue-600' },
    { title: 'Total Users', value: 7, icon: <FaUsers className="text-white text-3xl" />, color: 'bg-green-600' },
    { title: 'Total Revenue', value: '30,000', icon: <FaDollarSign className="text-white text-3xl" />, color: 'bg-yellow-600' },
    { title: 'Active Listings', value: 20, icon: <FaChartLine className="text-white text-3xl" />, color: 'bg-purple-600' },
  ];

  return (
    <div className=" bg-[#0A0D1C] text-white p-4 md:p-6">
      {/* Header with Title & Logout */}
      <div className='flex flex-col sm:flex-row justify-between items-center mb-6 gap-4'>
        <h1 className='text-xl md:text-3xl font-bold bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text'>
          Admin Portal
        </h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-full bg-blue-900 text-white shadow-md hover:bg-blue-700 transition-all w-full sm:w-auto"
        >
          Logout
        </button>
      </div>

      {/* Show Dashboard Stats Only on /dashboard */}
      {isDashboard ? (
        <div className="bg-[#0A0D1C]  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className={`p-6 rounded-lg shadow-lg ${stat.color} flex items-center space-x-4`}>
              <div className="p-4 rounded-full bg-white bg-opacity-20">{stat.icon}</div>
              <div>
                <h3 className="text-md sm:text-lg font-semibold">{stat.title}</h3>
                <p className="text-xl sm:text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Render Other Pages Here
        <div className="mt-4">{children}</div>
      )}
    </div>
  );
};

export default Main;
