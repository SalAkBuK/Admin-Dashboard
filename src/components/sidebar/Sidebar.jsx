import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { AiFillDashboard } from "react-icons/ai";
import { TiChartBar } from "react-icons/ti";
import { FcInspection } from "react-icons/fc";
import { MdOutlineAccountBalance } from "react-icons/md";
import { HiBanknotes } from "react-icons/hi2";
import { FaPeopleArrows } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import profile from '../../assets/img/profile.png';

const Sidebar = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleBackButtonClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="h-screen bg-[#0A0D1C]  shadow-lg">
      <div className="flex flex-col gap-3 w-full text-slate-300 h-full justify-between">
        <div className="flex flex-col gap-10 px-4 mt-10">
          <div className="flex items-center justify-center gap-2">
            <img src={profile} alt="Profile" />
          </div>
          <div className="flex flex-col gap-5 text-md">
            <Link to="/dashboard" className="flex items-center gap-2 whitespace-nowrap hover:text-slate-100 cursor-pointer">
              <AiFillDashboard size={20} />
              <span>Dashboard</span>
            </Link>
            <Link to="/users" className="flex items-center gap-2 whitespace-nowrap hover:text-slate-100 cursor-pointer">
              <TiChartBar size={20} />
              <span>Users</span>
            </Link>
            <Link to="/inspection-bookings" className="flex items-center gap-2 whitespace-nowrap hover:text-slate-100 cursor-pointer">
              <FcInspection size={20} />
              <span>Inspection Bookings</span>
            </Link>
            <Link to="/auction-list" className="flex items-center gap-2 whitespace-nowrap hover:text-slate-100 cursor-pointer">
              <MdOutlineAccountBalance size={20} />
              <span>Auction List</span>
            </Link>
            <Link to="/upload-car-details" className="flex items-center gap-2 whitespace-nowrap hover:text-slate-100 cursor-pointer">
              <HiBanknotes size={20} />
              <span>Upload Car Details</span>
            </Link>
            <Link to="/beneficiary" className="flex items-center gap-2 whitespace-nowrap hover:text-slate-100 cursor-pointer">
              <FaPeopleArrows size={20} />
              <span>Transactions</span>
            </Link>
            {/* Back button to go to the previous page */}
            <button
              onClick={handleBackButtonClick} // Attach the click handler
              className="px-4 py-2 mt-12 rounded-full bg-blue-900 text-white text-bold shadow-sm hover:bg-blue-400 transition-colors "
            >
              Back
            </button>
          </div>
        </div>
        <div className="flex items-center text-md px-4 mb-4 gap-2 whitespace-nowrap hover:text-slate-100 cursor-pointer">
          <IoSettingsOutline size={20} />
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
