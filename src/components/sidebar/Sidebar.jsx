import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillDashboard } from "react-icons/ai";
import { TiChartBar } from "react-icons/ti";
import { FcInspection } from "react-icons/fc";
import { MdOutlineAccountBalance } from "react-icons/md";
import { HiBanknotes } from "react-icons/hi2";
import { FaPeopleArrows } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import profile from '../../assets/img/profile.png';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <div className="h-screen bg-[#0A0D1C] shadow-lg w-16 md:w-60 transition-all duration-300">
      <div className="flex flex-col gap-3 w-full text-slate-300 h-full justify-between">
        <div className="flex flex-col gap-10 px-2 md:px-4 mt-10">
          <div className="flex items-center justify-center gap-2">
            <img src={profile} alt="Profile" className="w-10 h-10 md:w-auto md:h-auto" />
          </div>
          <div className="flex flex-col gap-5 text-md">
            <Link to="/dashboard" className="flex items-center gap-2 hover:text-slate-100 cursor-pointer">
              <AiFillDashboard size={20} />
              <span className="hidden md:inline">Dashboard</span>
            </Link>
            <Link to="/users" className="flex items-center gap-2 hover:text-slate-100 cursor-pointer">
              <TiChartBar size={20} />
              <span className="hidden md:inline">Users</span>
            </Link>
            <Link to="/inspection-bookings" className="flex items-center gap-2 hover:text-slate-100 cursor-pointer">
              <FcInspection size={20} />
              <span className="hidden md:inline">Inspection Bookings</span>
            </Link>
            <Link to="/auction-list" className="flex items-center gap-2 hover:text-slate-100 cursor-pointer">
              <MdOutlineAccountBalance size={20} />
              <span className="hidden md:inline">Auction List</span>
            </Link>
            <Link to="/used-cars" className="flex items-center gap-2 hover:text-slate-100 cursor-pointer">
              <MdOutlineAccountBalance size={20} />
              <span className="hidden md:inline">Used Cars List</span>
            </Link>
            <Link to="/upload-car-details" className="flex items-center gap-2 hover:text-slate-100 cursor-pointer">
              <HiBanknotes size={20} />
              <span className="hidden md:inline">Upload Car Details</span>
            </Link>
            <Link to="/beneficiary" className="flex items-center gap-2 hover:text-slate-100 cursor-pointer">
              <FaPeopleArrows size={20} />
              <span className="hidden md:inline">Transactions</span>
            </Link>
            {/* Back button */}
            <button
              onClick={handleBackButtonClick}
              className="px-2 md:px-4 py-2 mt-12 rounded-full bg-blue-900 text-white text-bold shadow-sm hover:bg-blue-400 transition-colors"
            >
              <span className="hidden md:inline">Back</span>
              <span className="md:hidden">←</span>
            </button>
          </div>
        </div>
        <div className="flex items-center text-md px-2 md:px-4 mb-4 gap-2 hover:text-slate-100 cursor-pointer">
          <IoSettingsOutline size={20} />
          <span className="hidden md:inline">Settings</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
