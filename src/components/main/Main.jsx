import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {  
    // Clear the token from localStorage to log the user out
    localStorage.removeItem('token');
    
    // Redirect the user to the login page
    navigate('/login');
  };

  // Check if the current route is the dashboard
  const isDashboard = location.pathname === '/dashboard';

  return (
    <div >
    <div className='flex flex-col md:flex-row bg-[#0A0D1C]'>
      <section className='w-auto md:w-[70%] h-full'>
        <div className='w-full flex items-center justify-between'>
          <div className='text-indigo-950 m-4 font-bold text-xl md:text-2xl text-transparent bg-clip-text bg-indigo-100 from-indigo-800 to-pink-800'>
            Admin Portal
          </div>
        </div>

        {/* Conditionally render the Total Revenue Chart */}
      
      </section>
      
      <section className='w-full md:w-[30%] bg-[#0A0D1C] h-full'>
        <div className='flex flex-col m-4'>
          <div className='hidden md:flex gap-4 items-center justify-end px-4 text-indigo-950 dark:text-slate-800'>
            <button
              onClick={handleLogout} // Trigger logout on button click
              className="flex items-center px-4 py-2 rounded-full bg-blue-900 text-white text-bold shadow-sm hover:bg-blue-400 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </section>
    </div>
    </div>
  );
};

export default Main;
