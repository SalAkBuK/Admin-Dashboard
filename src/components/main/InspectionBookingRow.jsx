import { format } from 'date-fns';
import { FaEdit, FaTrash } from 'react-icons/fa';

function InspectionBookingsRow({ user, onEdit, onDelete }) {
  const parsedDate = new Date(user.date);
  const formattedDate = isNaN(parsedDate) ? 'Invalid Date' : format(parsedDate, 'MM/dd/yyyy'); // Format date

  return (
    <div className="grid grid-cols-6 gap-x-12 mt-4 py-4 px-6 items-center text-white rounded-lg bg-zinc-600">
      <span className="text-left -ml-5  truncate">{user.name}</span>
      <span className="text-left ">{user.contactNumber}</span>
      <span className="text-left ">{user.email}</span>
      <span className="text-left  pl-20">{formattedDate}</span>
      <span className="text-left truncate pl-10 ">{user.time}</span> {/* Shifted right */}
      <div className="flex justify-end pr-6 gap-4">
        <FaEdit onClick={onEdit} className="cursor-pointer text-[#4b4cfe] hover:text-[#3738ff] text-2xl" />
        <FaTrash onClick={onDelete} className="cursor-pointer text-[#dc3545] hover:text-[#b52a38] text-2xl" />
      </div>
    </div>
  );
}

export default InspectionBookingsRow;
