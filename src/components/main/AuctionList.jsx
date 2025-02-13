import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import Main from './Main'; // Assuming Main is a shared component for the page header/navigation
import car from '../../assets/img/Auto Experts/car6.jpg';
import car2 from '../../assets/img/Auto Experts/cars.jpg';
import socket from './socket'; // Assuming you have socket setup for real-time updates
import axios from 'axios';
import BidderDetailsModal from './BidderDetailsModal';  // Import the modal component
import { useNavigate } from 'react-router-dom';
import { formatDateToPKT } from '../../../components/utils'; 

function AuctionList() {
  const [auctions, setAuctions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [cars, setCars] = useState([]); // Initialize cars as an empty array
  const [selectedBidderId, setSelectedBidderId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [bidderDetails, setBidderDetails] = useState(null);
  
  const navigate = useNavigate();

  const fetchAuctions = async () => {
    try {
      const response = await axios.get("http://167.99.228.40:5000/api/cars");
  
      // Sort auctions so that "IN-PROGRESS" appears first
      const sortedAuctions = response.data.sort((a, b) => 
        a.status === "IN-PROGRESS" ? -1 : 1
      );
      console.log(sortedAuctions);
  
      setAuctions(sortedAuctions);
      setCars(sortedAuctions); // Assuming the auction data is embedded in the 'cars' field
    } catch (error) {
      console.error("Error fetching auctions:", error);
    }
  };
  
  useEffect(() => {
    fetchAuctions(); // Fetch auctions data on component mount
  
    socket.on("updateCar", (updatedCar) => {
      console.log("Updated Car:", updatedCar);
      setAuctions((prevAuctions) =>
        prevAuctions
          .map((auction) =>
            auction._id === updatedCar._id ? { ...auction, ...updatedCar } : auction
          )
          .sort((a, b) => (a.status === "IN-PROGRESS" ? -1 : 1)) // Ensure sorting after update
      );
    });
  
    return () => {
      socket.off("updateCar"); // Clean up socket listener
    };
  }, []);
  


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleViewDetails = (auctionId) => {
    navigate(`/auction-details/${auctionId}`);
  };
  

  const handleEdit = (auctionId) => {
    // Open edit modal or handle edit logic
     navigate(`/update-auction-car-details/${auctionId}`)
    console.log('Edit auction:', auctionId);
  };

  const handleDelete = async (auctionId) => {
    try {
      const response = await axios.delete(`http://167.99.228.40:5000/api/items/${auctionId}`);
  
      if (response.status === 200) {
        // Remove from UI after successful deletion
        setAuctions((prevAuctions) => prevAuctions.filter((auction) => auction._id !== auctionId));
        alert("Auction deleted successfully");
      } else {
        alert("Failed to delete auction");
      }
    } catch (error) {
      console.error("Error deleting auction:", error);
      alert("Error deleting auction");
    }
  };
  
  

  // Filter auctions based on search term
  const filteredAuctions = auctions.filter((auction) =>
    auction.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredAuctions.length / itemsPerPage);
  const paginatedAuctions = filteredAuctions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Fetch bidder details when the admin clicks on a bidder ID
  const handleBidderClick = async (bidderId) => {
    try {
      const response = await axios.get(`http://167.99.228.40:5000/api/bids/bidder/${bidderId}`);
      const bidderDetails = response.data;
      console.log("Bidder Details:", bidderDetails); // Debug log
      
      // Open the modal and display bidder details
      setModalData(bidderDetails);
      setShowModal(true); // Show the modal
    } catch (error) {
      console.error("Error fetching bidder details:", error);
    }
  };
  const handlePageChange = (page) => {
  setCurrentPage(page);
};



  return (
    <div className="w-full bg-[#1E223D] overflow-auto min-h-screen">
    <Main />
  
    <div className="w-full bg-[#0b213e] p-10 gap-10 rounded-xl shadow-lg text-white ml-2 mt-2">
      <h2 className="text-lg font-semibold mb-4">Auction List</h2>
  
      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by title..."
          className="w-full px-4 py-2 bg-[#394a6d] text-white rounded-md focus:outline-none"
        />
      </div>
  
      {/* Items per page dropdown */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <label className="mr-2">Show:</label>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="bg-[#394a6d] text-white px-2 py-1 rounded"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>
      </div>
  
      {/* Table wrapper for responsiveness */}
      <div className="overflow-x-auto w-full">
        <div className="min-w-max md:min-w-full grid grid-cols-7 gap-4 font-semibold text-[#bfcde0] pl-1 pb-3 border-b border-[#394a6d] items-center">
          <span className="text-center">Image</span>
          <span className="text-center">Title</span>
          <span className="text-center">Initial Bid</span>
          <span className="text-center">Highest Bid</span>
          <span className="text-center">End Time</span>
          <span className="text-center">Top 3 Bids</span>
          <span className="text-center">Status</span>
        </div>
  
        {/* Auction rows */}
        {paginatedAuctions.map((auction) => (
          <div
            key={auction._id}
            className="grid grid-cols-7 gap-4 mt-3 py-2 items-center text-white rounded-lg bg-zinc-600 mb-2 min-w-max md:min-w-full whitespace-nowrap"
          >
            <div className="flex justify-center">
              <img
                src={auction.images[0] || auction.image || '/placeholder.jpg'}
                alt={auction.title || 'No Title'}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
              />
            </div>
            <span className="text-center text-sm md:text-base">{auction.title || 'Unknown Title'}</span>
            <span className="text-center text-sm md:text-base">Pkr. {auction.initialBid || 'N/A'}</span>
            <span className="text-center text-sm md:text-base">
              {auction.highestBid ? `Pkr. ${auction.highestBid.bidAmount}` : 'No bids yet'}
            </span>
            <span className="text-center text-sm md:text-base">{formatDateToPKT(auction.auctionEndTime) || 'No End Time'}</span>
  
            {/* Top 3 Bids Section */}
            <div className="text-center text-xs md:text-sm">
              {auction.topBids && auction.topBids.length > 0 ? (
                <ul className="list-disc pl-3">
                  {auction.topBids.slice(0, 3).map((bid, index) => (
                    <li key={index} className="flex flex-col md:flex-row items-center space-x-2">
                      <span className="text-xs md:text-sm">Pkr. {bid.bidAmount}</span>
                      <span
                        className="text-xs text-blue-500 truncate max-w-[100px] md:max-w-[150px] hover:underline cursor-pointer"
                        title={bid.bidderId}
                        onClick={() => handleBidderClick(bid.bidderId)}
                      >
                        {bid.bidderId ? `${bid.bidderId.slice(0, 8)}...` : 'Unknown'}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No top bids available</p>
              )}
            </div>
  
            {/* Status */}
            <span className="text-center text-sm md:text-base">{auction.status || 'No Status'}</span>
  
            {/* Actions */}
            <div className="flex gap-2 justify-center">
              <FaEye onClick={() => handleViewDetails(auction._id)} className="cursor-pointer text-[#4b4cfe] hover:text-[#3738ff]" />
              <FaEdit onClick={() => handleEdit(auction._id)} className="cursor-pointer text-[#4b4cfe] hover:text-[#3738ff]" />
              <FaTrash onClick={() => handleDelete(auction._id)} className="cursor-pointer text-[#dc3545] hover:text-[#b52a38]" />
            </div>
          </div>
        ))}
      </div>
  
      {/* Pagination controls */}
      <div className="flex justify-center mt-6">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 mx-1 rounded ${
              currentPage === index + 1 ? 'bg-[#4b4cfe] text-white' : 'bg-[#394a6d] text-[#bfcde0]'
            } hover:bg-[#3738ff]`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  
    {/* Modal for displaying bidder details */}
    {showModal && (
      <BidderDetailsModal showModal={showModal} setShowModal={setShowModal} bidderDetails={modalData} />
    )}
  </div>
  
  
  



    
  );
}

export default AuctionList;
