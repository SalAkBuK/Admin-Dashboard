import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

function UserTableRow({ user, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-4 gap-10 mt-7 py-2 items-center text-white rounded-lg bg-zinc-600 mb-2">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-gray-400 mr-2 ml-2"></div>
        <span>{user.name}</span>
      </div>
      <span>{user.email}</span>
      <div className="flex items-center justify-start pl-10">
        {user.subscriptionStatus === 'active' ? (
          <span className="text-green-900 font-semibold mr-4">Active</span>
        ) : (
          <span className="text-red-500 font-semibold mr-4">Inactive</span>
        )}
      </div>
      <div className="flex items-center gap-4">
        <FaEdit onClick={onEdit} className="cursor-pointer text-[#4b4cfe] hover:text-[#3738ff]" />
        <FaTrash onClick={onDelete} className="cursor-pointer text-[#dc3545] hover:text-[#b52a38]" />
      </div>
    </div>
  );
}

export default UserTableRow;
