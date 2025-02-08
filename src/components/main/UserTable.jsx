import React, { useEffect, useState } from 'react';
import UserTableRow from './UserTableRow';
import EditModal from './EditModal';
import Main from './Main';
import axios from 'axios';

function UserTable() {
  const [users, setUsers] = useState([]);
  const [displayCount, setDisplayCount] = useState(5);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users from the API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://167.99.228.40:5000/api/auth/members', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(response.data); // Store data in users state
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const handleViewMore = () => {
    setDisplayCount((prevCount) => prevCount + 5);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const handleSave = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setSelectedUser(null);
  };

  const handleDelete = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  return (
    <div>
  <Main />

  <div className="w-full max-w-4xl bg-[#0b213e] p-10 rounded-xl shadow-lg text-white ml-2 mt-2">
  <h2 className="text-lg font-semibold mb-10 text-center">Total Members</h2>
  
  {/* Header Row */}
  <div className="grid grid-cols-4 font-semibold text-[#bfcde0] pb-3 border-b border-[#394a6d] text-center">
    <span>User Name</span>
    <span>Email</span>
    <span>Subscription Status</span>
    <span>Action</span>
  </div>

  {/* Data Rows */}
  {users.slice(0, displayCount).map((user) => (
    <div key={user.id} className="grid grid-cols-4 text-[#bfcde0] pb-3 pt-3 text-center items-center">
      <span>{user.name}</span>
      <span>{user.email}</span>
      <div className="flex justify-center">
  <span 
    className={`inline-flex w-20 px-4 py-2 rounded-full text-center font-medium 
    ${user.subscriptionStatus === 'active' 
      ? "bg-green-500 text-white hover:bg-green-600" 
      : "bg-red-500 text-white hover:bg-red-600"}`}
  >
    {user.subscriptionStatus === 'active' ? 'Active' : 'Inactive'}
  </span>
</div>


      <span className="flex justify-center gap-2">
  <button 
    onClick={() => handleEdit(user)} 
    className="w-24 px-4 py-2 bg-blue-500 rounded-full text-white text-center font-medium hover:bg-blue-600"
  >
    Edit
  </button>
  <button 
    onClick={() => handleDelete(user.id)} 
    className="w-24 px-4 py-2 bg-red-500 rounded-full text-white text-center font-medium hover:bg-red-600"
  >
    Delete
  </button>
</span>

    </div>
  ))}

  {/* View More Button */}
  {displayCount < users.length && (
    <div className="flex justify-center mt-6">
      <button
        onClick={handleViewMore}
        className="px-6 py-2 bg-[#4b4cfe] rounded-full text-white font-semibold hover:bg-[#3738ff]"
      >
        View More
      </button>
    </div>
  )}

  {/* Edit Modal */}
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

export default UserTable;
