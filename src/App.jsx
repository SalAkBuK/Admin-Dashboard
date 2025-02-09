import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Main from './components/main/Main';
import UserTable from './components/main/UserTable';
import InspectionBookings from './components/main/InspectionBookings';
import AuctionList from './components/main/AuctionList';
import AuctionDetails from './components/main/AuctionDetails';
import UploadCarDetails from './components/main/UploadCarDetails';
import UploadAuctionCars from './components/main/UploadAuctionCars';
import AdminLogin from './components/main/AdminLogin';
import PrivateRoute from './components/main/PrivateRoute';
import UploadUsedCars from './components/main/UploadUsedCars';
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();

  // Check if the current route is the login page
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="flex h-screen bg-black">
      {/* Render the sidebar only if it's not the login page */}
      {!isLoginPage && (
        <section className="w-[10%] sm:w-[15%]">
          <Sidebar />
        </section>
      )}
      <section className={`flex flex-col ${isLoginPage ? 'w-full' : 'w-[90%] sm:w-[85%]'} overflow-auto`}>
        <Routes>
          {/* Redirect root path to /login */}
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<AdminLogin />} />

          {/* Protect the dashboard routes using PrivateRoute */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Main />} />
            <Route path="/users" element={<UserTable />} />
            <Route path="/inspection-bookings" element={<InspectionBookings />} />
            <Route path="/auction-list" element={<AuctionList />} />
            <Route path="/auction-details/:auctionId" element={<AuctionDetails />} />
            <Route path="/upload-car-details" element={<UploadCarDetails />} />
            <Route path="/upload-auction-cars" element={<UploadAuctionCars />} />
            <Route path="/upload-used-cars" element={<UploadUsedCars />}/>
          </Route>
        </Routes>
      </section>
    </div>
  );
};

export default App;
