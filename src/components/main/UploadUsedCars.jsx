import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Main from './Main';
import { motion } from "framer-motion";


const Form = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
      // Check token existence on component mount
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.log("No token found, redirecting to login.");
        navigate('/admin');  // Redirect to the admin login or dashboard
      }
    }, [navigate]); // dependency

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    model: '',
    mileage: '',
    images: [],
    pdf: null,
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  const handlePDFChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, pdf: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formData.images.forEach((image) => {
      formDataObj.append('images', image);
    });
    if (formData.pdf) {
      formDataObj.append('pdf', formData.pdf);
    }
    formDataObj.append('title', formData.title);
    formDataObj.append('price', formData.price);
    formDataObj.append('model', formData.model);
    formDataObj.append('mileage', formData.mileage);

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('User not authenticated');
        return;
      }

      await axios.post('http://167.99.228.40:5000/api/products', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      setFormData({
        title: '',
        price: '',
        model: '',
        mileage: '',
        images: [],
        pdf: null,
      });

      setLoading(false);
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      setLoading(false);
      alert('Error adding product. Please try again.');
    }
  };

  return (
    <div>
      <Main/>
      <section className="flex flex-col w-[90%] sm:w-[85%] overflow-auto">
        <div className="bg-[#0b213e] min-h-screen flex flex-col justify-center items-center py-8">

<form
  className="bg-white/10 backdrop-blur-lg shadow-2xl border border-gray-700 rounded-2xl p-6 space-y-6 w-full max-w-lg mx-auto"
  onSubmit={handleSubmit}
>
  <h2 className="text-2xl font-bold text-center text-white">Add Product</h2>

  {[
    { label: "Title", id: "title", type: "text" },
    { label: "Price", id: "price", type: "number" },
    { label: "Model", id: "model", type: "text" },
    { label: "Mileage", id: "mileage", type: "text" },
  ].map(({ label, id, type }) => (
    <motion.div key={id} className="relative group" whileHover={{ scale: 1.05 }}>
      <label
        htmlFor={id}
        className="absolute -top-2 left-3 bg-[#123a5d] px-2 text-xs font-semibold text-sky-400"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={id}
        value={formData[id]}
        onChange={handleInputChange}
        required
        className="w-full px-4 py-3 rounded-lg text-white bg-transparent border border-gray-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-400 outline-none shadow-lg transition-all duration-300" 
      />
    </motion.div>
  ))}

  {/* File Uploads */}
  {[
    { label: "Images", id: "imageUpload", accept: "image/*", handler: handleImageChange },
    { label: "PDFs", id: "pdfUpload", accept: ".pdf", handler: handlePDFChange },
  ].map(({ label, id, accept, handler }) => (
    <motion.div key={id} className="relative flex flex-col items-center">
      
      <motion.button
        type="button"
        className="w-full py-3 px-6 rounded-lg text-white font-semibold transition-all bg-blue-600 hover:bg-blue-700 shadow-md"
        onClick={() => document.getElementById(id).click()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Upload {label}
      </motion.button>
      <input id={id} type="file" accept={accept} onChange={handler} className="hidden" required />
    </motion.div>
  ))}

  {/* Submit Button */}
  <div className="flex justify-center">
    <motion.button
      type="submit"
      disabled={loading}
      className={`w-full py-3 px-6 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-300 ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {loading ? "Adding..." : "Add Product"}
    </motion.button>
  </div>
</form>

        </div>
      </section>
    </div>
  );
};

export default Form;
