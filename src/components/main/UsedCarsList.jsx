import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Main from "./Main"; // Assuming Main is a shared component for the page header/navigation
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BidderDetailsModal from "./BidderDetailsModal"; // Import the modal component

function UsedCarsList() {
  const [products, setProducts] = useState([]); // Store fetched products
  const [filteredProducts, setFilteredProducts] = useState([]); // Store filtered products
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://167.99.228.40:5000/api/products"
        );

        if (response.data && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
          setFilteredProducts(response.data.products);
          console.log("Fetched products:", response.data.products);
        } else {
          console.error(
            "API response does not contain a products array:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts(); // Call the function inside useEffect
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const handleViewDetails = (productId) => {
    navigate(`/used-car-details/${productId}`);
  };
  const handleUpdateDetails = (productId) => {
    navigate(`/update-car-details/${productId}`);
  };

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(
        `http://167.99.228.40:5000/api/products/${productId}`
      );
  
      if (response.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
        setFilteredProducts((prevFiltered) =>
          prevFiltered.filter((product) => product._id !== productId)
        );
  
        alert("Product deleted successfully");
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    }
  };
  

  // Filter products based on search term
  const filteredData = filteredProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-[#1E223D] min-h-screen overflow-x-hidden">
 <Main/>
  
    <div className="w-full max-w-5xl bg-[#0b213e] p-10 gap-10 rounded-xl shadow-lg text-white ml-2 mt-2 overflow-y-auto sm:max-h-screen">
      <h2 className="text-lg font-semibold mb-4">Product List</h2>
  
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
  
      {/* Scrollable Table Container */}
      <div className="overflow-x-auto">
        {/* Table header */}
        <div className="grid grid-cols-6 gap-4 font-semibold text-[#bfcde0] pl-1 pb-3 border-b border-[#394a6d] items-center min-w-[600px]">
          <span className="text-center">Image</span>
          <span className="text-center">Title</span>
          <span className="text-center">Price</span>
          <span className="text-center">Model</span>
          <span className="text-center">Status</span>
          <span className="text-center">Actions</span>
        </div>
  
        {/* Product rows */}
        {paginatedData.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-6 gap-4 mt-3 py-2 items-center text-white rounded-lg bg-zinc-600 mb-2 min-w-[600px]"
          >
            <div className="flex justify-center">
              <img
                src={product.images[0] || "/placeholder.jpg"}
                alt={product.title || "No Title"}
                className="w-20 h-20 rounded-full"
                style={{ objectFit: "cover" }}
              />
            </div>
            <span className="text-center">{product.title || "Unknown"}</span>
            <span className="text-center">Pkr.{product.price || "N/A"}</span>
            <span className="text-center">{product.model || "Unknown"}</span>
            <span className="text-center">{product.status || "No Status"}</span>
  
            {/* Action buttons */}
            <div className="flex gap-4 justify-center">
              <FaEye
                onClick={() => handleViewDetails(product._id)}
                className="cursor-pointer text-[#4b4cfe] hover:text-[#3738ff]"
              />
              <FaEdit
                onClick={() => handleUpdateDetails(product._id)}
                className="cursor-pointer text-[#4b4cfe] hover:text-[#3738ff]"
              />
              <FaTrash
                onClick={() => handleDelete(product._id)}
                className="cursor-pointer text-[#dc3545] hover:text-[#b52a38]"
              />
            </div>
          </div>
        ))}
      </div>
  
      {/* Pagination controls */}
      <div className="flex justify-center mt-6">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 mx-1 rounded ${
              currentPage === index + 1
                ? "bg-[#4b4cfe] text-white"
                : "bg-[#394a6d] text-[#bfcde0]"
            } hover:bg-[#3738ff]`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  
    {/* Modal for displaying bidder details */}
    {showModal && (
      <BidderDetailsModal
        showModal={showModal}
        setShowModal={setShowModal}
        bidderDetails={modalData}
      />
    )}
  </div>
  
  );
}

export default UsedCarsList;
