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
import ProductDetails from './components/main/ProductDetails';
import UpdateProductForm from './components/main/UpdateProductForm';
import UpdateAuctionProductForm from './components/main/UpdateAuctionProductForm';
import UsedCarsList from './components/main/UsedCarsList';
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
    <div className="flex min-h-screen bg-black">
  {/* Render the sidebar only if it's not the login page */}
  {!isLoginPage && (
    <section className="w-[10%] sm:w-[15%] h-full bg-gray-900">
      <Sidebar />
    </section>
  )}
  
  <section 
    className={`flex flex-col ${isLoginPage ? 'w-full' : 'w-[90%] sm:w-[85%]'} h-full overflow-y-auto`}
  >
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
            <Route path="/used-cars" element={<UsedCarsList />}/>
            <Route path="/used-car-details/:productId" element={<ProductDetails />} />
            <Route path="/update-car-details/:productId" element={<UpdateProductForm />} />
            <Route path="/update-auction-car-details/:auctionId" element={<UpdateAuctionProductForm/>} />
          </Route>
        </Routes>
      </section>
    </div>
  );
};

export default App;
