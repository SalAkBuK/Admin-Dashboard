import { motion } from 'framer-motion';
import { XCircle, Mail, MapPin, Home, IdCard, Calendar, User, BadgeCheck } from 'lucide-react';

const BidderDetailsModal = ({ showModal, setShowModal, bidderDetails }) => {
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    hidden: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-lg flex items-center justify-center"
      variants={backdropVariants}
      initial="hidden"
      animate={showModal ? 'visible' : 'hidden'}
      exit="hidden"
    >
      <motion.div
        className="bg-gradient-to-br from-[#0b213e] to-[#123a5d] w-[420px] p-6 rounded-2xl shadow-2xl border border-gray-700 relative overflow-hidden"
        variants={modalVariants}
      >
        {/* Close Button */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-gray-300 hover:text-white transition duration-300"
        >
          <XCircle size={28} />
        </button>

        {bidderDetails ? (
          <div>
            {/* Header */}
            <h3 className="text-3xl font-semibold text-white mb-4 text-center border-b pb-2 animate-fade-in">
              {bidderDetails.name}
            </h3>

            {/* Details Section */}
            <div className="space-y-4 text-white text-base animate-fade-in">
              <p className="flex items-center gap-2">
                <Mail className="text-sky-400" />
                <strong className="text-lg text-sky-400">Email:</strong> 
                <span className="ml-2 text-gray-200">{bidderDetails.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="text-sky-400" />
                <strong className="text-lg text-sky-400">City:</strong> 
                <span className="ml-2 text-gray-300">{bidderDetails.city}</span>
              </p>
              <p className="flex items-center gap-2">
  <Home size={20} className="text-sky-400 flex-shrink-0" />
  <strong className="text-lg text-sky-400">Address:</strong> 
  <span className="ml-2 text-gray-300">{bidderDetails.address}</span>
</p>

              <p className="flex items-center gap-2">
                <IdCard className="text-sky-400" />
                <strong className="text-lg text-sky-400">CNIC:</strong> 
                <span className="ml-2 text-gray-300">{bidderDetails.cnic}</span>
              </p>
              <p className="flex items-center gap-2">
                <Calendar className="text-sky-400" />
                <strong className="text-lg text-sky-400">Date of Birth:</strong> 
                <span className="ml-2 text-gray-200">{new Date(bidderDetails.dateOfBirth).toLocaleDateString()}</span>
              </p>
              <p className="flex items-center gap-2">
                <User className="text-sky-400" />
                <strong className="text-lg text-sky-400">Role:</strong> 
                <span className="ml-2 text-indigo-400 font-semibold tracking-wide uppercase">{bidderDetails.role}</span>
              </p>

              {/* Subscription Status */}
              <p className="flex items-center gap-2">
                <BadgeCheck className="text-sky-400" />
                <strong className="text-lg text-sky-400">Subscription Status:</strong>
                <span className={`text-sm font-semibold px-2 py-1 rounded-md transition duration-300 shadow-md ${
                  bidderDetails.subscriptionStatus === 'active' ? 'bg-green-600 text-white shadow-green-500/50' :
                  bidderDetails.subscriptionStatus === 'canceled' ? 'bg-red-600 text-white shadow-red-500/50' :
                  bidderDetails.subscriptionStatus === 'past_due' ? 'bg-yellow-500 text-gray-900 shadow-yellow-400/50' :
                  'bg-gray-700 text-white shadow-gray-500/50'}`}
                >
                  {bidderDetails.subscriptionStatus}
                </span>
              </p>
            </div>

            {/* Action Button */}
            <div className="flex justify-center mt-6">
              <motion.button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Close
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="text-center animate-fade-in">
            <p className="text-lg font-semibold text-gray-300">Loading...</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default BidderDetailsModal;
