import React, { useEffect, useState } from 'react';
import EditModal from './EditModal';
import Main from './Main';
import InspectionBookingsRow from './InspectionBookingRow';
import axios from 'axios';

function InspectionBookings() {
  const [users, setUsers] = useState([]); // Store users fetched from the API
  const [selectedUser, setSelectedUser] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get("http://167.99.228.40:5000/api/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.data || !Array.isArray(response.data)) {
          console.error("Invalid data format received:", response.data);
          return;
        }

        // Ensure correct date parsing before sorting
        const sortedBookings = response.data
  .slice() // Avoid mutating original data
  .sort((a, b) => {
    const dateA = new Date(a.date);  // Use the correct date field
    const dateB = new Date(b.date);  // Use the correct date field
    return dateB - dateA; // Sort in descending order (newest first)
  });


        // Format time with AM/PM
        const formattedBookings = sortedBookings.map((booking) => {
          let formattedTime = "";

          if (booking.time) {
            const [hours, minutes] = booking.time.split(":"); // Assuming HH:MM format
            const date = new Date();
            date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);

            formattedTime = date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });
          }

          // Add formattedDate to the booking object
          const formattedDate = new Date(booking.date).toLocaleDateString(); // Format booking date
          return { ...booking, formattedTime, formattedDate }; // Add formattedDate
        });

        setUsers(formattedBookings); // Store formatted data in users state
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings(); // Ensure the API call is made inside useEffect
  }, []);

  
  
  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(`http://167.99.228.40:5000/api/items/${userId}`);
  
      if (response.status === 200) {
        // Remove from UI after successful deletion
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
                alert("User deleted successfully");
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user");
    }
  };
  

  const handleSave = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setSelectedUser(null);
  };



  // Pagination logic
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1); // Reset to first page
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='bg-[#1E223D]'>
      <Main />

      <div className="w-full max-w-5xl bg-[#0b213e] p-10 rounded-xl shadow-lg text-white mt-2 mb-10">
        <h2 className="text-lg font-semibold mb-10">Total Bookings</h2>

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

       {/* Table header */}
      {/* Table header */}
      <div className="grid grid-cols-6 gap-x-12 font-semibold text-[#bfcde0] pl-6 pb-3 border-b border-[#394a6d] items-center">
  <span className="text-left">Name</span>
  <span className="text-left pl-5">Contact</span>
  <span className="text-left pl-20">Email</span>
  <span className="text-left pl-20">Date</span>
  <span className="text-left pl-8 ">Time</span>
  <span className="text-left ">Action</span> {/* Align Action column to the right */}
</div>


{/* User rows container with spacing */}
{/* User rows container with spacing */}
<div className="space-y-4"> {/* Adds vertical gap between rows */}
  {paginatedUsers.map((user, index) => (
    <InspectionBookingsRow
      key={user.id} // still using the user.id for React key (but won't display it)
      user={{ ...user, id: undefined, time: user.formattedTime, formattedDate: user.formattedDate }} // Remove the id here
      onEdit={() => handleEdit(user)}
      onDelete={() => handleDelete(user.id)}
    />
  ))}
</div>




        {/* Pagination controls */}
        <div className="flex justify-center mt-6 ">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 mx-1 rounded ${currentPage === index + 1 ? 'bg-[#4b4cfe] text-white' : 'bg-[#394a6d] text-[#bfcde0]'} hover:bg-[#3738ff]`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <EditModal
          user={selectedUser}
          isOpen={!!selectedUser}
          onSave={handleSave}
          onClose={() => setSelectedUser(null)}
        />
      </div>
    </div>
  );
}

export default InspectionBookings;
