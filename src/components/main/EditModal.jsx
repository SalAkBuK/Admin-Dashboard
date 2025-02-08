import React, { useState, useEffect } from 'react';

function EditModal({ user, isOpen, onSave, onClose }) {
  // Initialize state only if `user` is provided, otherwise set empty values
  const [name, setName] = useState(user?.name || '');
  const [status, setStatus] = useState(user?.status || '');

  // Update state whenever `user` prop changes
  useEffect(() => {
    if (user) {
      setName(user.name);
      setStatus(user.status);
    }
  }, [user]);

  if (!isOpen || !user) return null; // Render nothing if modal is not open or user is undefined

  const handleSave = () => {
    onSave({ ...user, name, status });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#0b213e] p-6 rounded-lg max-w-md w-full shadow-lg text-white">
        <h2 className="text-lg font-semibold mb-4">Edit User</h2>
        <div className="mb-4">
          <label className="block text-sm mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 bg-[#281745] rounded-lg text-white"
          />
        </div>
       
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#4b4cfe] rounded-full text-white font-semibold hover:bg-[#3738ff]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 rounded-full text-white font-semibold hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
