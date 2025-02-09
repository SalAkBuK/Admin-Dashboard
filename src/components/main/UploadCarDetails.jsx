import React from 'react';
import { Link } from 'react-router-dom';
import { FaCar, FaGavel } from 'react-icons/fa'; // Example icons, replace with actual images if needed
import Main from './Main';

function UploadCarDetails() {
  return (
    <div className="bg-[#1E223D] w-full min-h-screen">
      <Main />
      <div className="flex items-center justify-center w-full max-w-4xl bg-[#0b213e] p-10 rounded-xl shadow-lg text-white ml-2 mt-2">
        <div className="space-y-4">
          <button className="px-8 py-3 rounded-full relative flex h-[50px] w-full max-w-xs items-center justify-center overflow-hidden bg-gray-800 text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-orange-600 before:duration-500 before:ease-out hover:shadow-orange-600 hover:before:h-56 hover:before:w-60">
            <Link to="/upload-auction-cars" className="relative z-10 flex items-center space-x-2">
              <FaGavel className="text-xl mr-8" /> {/* Auction icon */}
              <span>Auction Platform</span>
            </Link>
          </button>

          <button className="px-8 py-3 rounded-full relative flex h-[50px] w-full max-w-xs items-center justify-center overflow-hidden bg-gray-800 text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-blue-600 before:duration-500 before:ease-out hover:shadow-red-400 hover:before:h-56 hover:before:w-60">
            <Link to="/upload-used-cars" className="relative z-10 flex items-center space-x-2">
              <FaCar className="text-xl mr-8" /> {/* Used car icon */}
              <span>Used Cars List</span>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadCarDetails;
