import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Main from './Main'; // Assuming Main is a shared component for the page header/navigation
import { motion } from "framer-motion";

const AddCarForm = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    carDetails: Yup.string().required('Car details are required'),
    auctionEndTime: Yup.string().required('Auction end time is required'),
    initialBid: Yup.number().min(0, 'Initial bid must be 0 or greater').required('Initial bid is required'),
    title: Yup.string().required('Title is required'),
    model: Yup.string().required('Model is required'),
    mileage: Yup.number().min(0, 'Mileage must be 0 or greater').required('Mileage is required'),
    Overview: Yup.string().required('Overview is required'),
    Description: Yup.string().required('Description is required'),
    SelectedFeatures: Yup.string().required('Selected features are required'),
    Body: Yup.string().required('Body is required'),
    FuelType: Yup.string().required('Fuel type is required'),
    Condition: Yup.string().required('Condition is required'),
    EngineSize: Yup.string().required('Engine size is required'),
    Door: Yup.number().min(1, 'Door must be at least 1').required('Number of doors is required'),
    Color: Yup.string().required('Color is required'),
    images: Yup.mixed().required('Images are required'),
    pdf: Yup.mixed().required('PDF is required')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("FormData:  ", FormData)
    const data = new FormData();
    for (const key in values) {
      if (key === 'images') {
        Array.from(values.images).forEach((image) => data.append('images', image));
      } else if (key === 'pdf') {
        data.append('pdf', values.pdf);
      } else {
        data.append(key, values[key]);
      }
    }

    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('User not authenticated');
        return;
      }
        console.log("DATA:", data)
      const response = await axios.post('http://167.99.228.40:5000/api/cars', data, {
        headers: { 
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}` }
      });
      console.log("RESPONSE: ", response)
      setMessage('Car added successfully!');
      resetForm();
      console.log(response.data);
    } catch (error) {
      setMessage('Failed to add car');
      console.error(error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (

    <div>

      <Main/>

    
      <Formik
      initialValues={{
        carDetails: "",
        auctionEndTime: "",
        initialBid: "",
        title: "",
        model: "",
        mileage: "",
        Overview: "",
        Description: "",
        SelectedFeatures: "",
        Body: "",
        FuelType: "",
        Condition: "",
        EngineSize: "",
        Color: "",
        Door: "",
        OwnerEmail: "",
        images: null,
        pdf: null,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form className="bg-white/10 backdrop-blur-lg shadow-2xl border border-gray-700 rounded-2xl p-6 space-y-6 w-full max-w-2xl mx-auto mt-2 mb-4 ">
          <h2 className="text-2xl font-bold text-center text-white">Add a New Car</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Car Details", name: "carDetails", type: "text" },
              { label: "Auction End Time", name: "auctionEndTime", type: "datetime-local" },
              { label: "Initial Bid", name: "initialBid", type: "number" },
              { label: "Title", name: "title", type: "text" },
              { label: "Model", name: "model", type: "text" },
              { label: "Mileage", name: "mileage", type: "number" },
              { label: "Overview", name: "Overview", type: "textarea" },
              { label: "Description", name: "Description", type: "textarea" },
              { label: "Selected Features", name: "SelectedFeatures", type: "text" },
              { label: "Body", name: "Body", type: "text" },
              { label: "Fuel Type", name: "FuelType", type: "text" },
              { label: "Condition", name: "Condition", type: "text" },
              { label: "Color", name: "Color", type: "text" },
              { label: "Engine Size", name: "EngineSize", type: "text" },
              { label: "Door", name: "Door", type: "number" },
              { label: "Owner Email", name: "OwnerEmail", type: "email" },
            ].map((field) => (
              <motion.div key={field.name} className="relative group" whileHover={{ scale: 1.05 }}>
                <label
                  htmlFor={field.name}
                  className="absolute -top-2 left-3 bg-[#123a5d] px-2 text-xs font-semibold text-sky-400"
                >
                  {field.label}
                </label>
                <Field
                  as={field.type === "textarea" ? "textarea" : "input"}
                  type={field.type}
                  name={field.name}
                  required
                  className="w-full px-4 py-3 rounded-lg text-white bg-transparent border border-gray-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-400 outline-none shadow-lg transition-all duration-300 resize-none"
                />
                <ErrorMessage name={field.name} component="div" className="text-red-500 text-sm mt-1" />
              </motion.div>
            ))}
          </div>

          {/* Upload Buttons */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Image Upload */}
            <motion.div className="flex flex-col flex-1" whileHover={{ scale: 1.05 }}>
              <label className="text-gray-200 font-medium mb-2">Upload Images (up to 5):</label>
              <motion.button
                type="button"
                className="w-full py-3 px-6 rounded-lg text-white font-semibold transition-all bg-blue-600 hover:bg-blue-700 shadow-md"
                onClick={() => document.getElementById("imageUpload").click()}
                whileTap={{ scale: 0.95 }}
              >
                Upload Images
              </motion.button>
              <input
                id="imageUpload"
                type="file"
                name="images"
                multiple
                accept="image/*"
                onChange={(event) => setFieldValue("images", event.currentTarget.files)}
                className="hidden"
              />
              <ErrorMessage name="images" component="div" className="text-red-500 text-sm mt-1" />
            </motion.div>

            {/* PDF Upload */}
            <motion.div className="flex flex-col flex-1" whileHover={{ scale: 1.05 }}>
              <label className="text-gray-200 font-medium mb-2">Upload PDF:</label>
              <motion.button
                type="button"
                className="w-full py-3 px-6 rounded-lg text-white font-semibold transition-all bg-blue-600 hover:bg-blue-700 shadow-md"
                onClick={() => document.getElementById("pdfUpload").click()}
                whileTap={{ scale: 0.95 }}
              >
                Upload PDF
              </motion.button>
              <input
                id="pdfUpload"
                type="file"
                name="pdf"
                accept=".pdf"
                onChange={(event) => setFieldValue("pdf", event.currentTarget.files[0])}
                className="hidden"
              />
              <ErrorMessage name="pdf" component="div" className="text-red-500 text-sm mt-1" />
            </motion.div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-300 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? "Submitting..." : "Add Car"}
            </motion.button>
          </div>

          {/* Success Message */}
          {message && <p className="text-green-500 text-center mt-4">{message}</p>}
        </Form>
      )}
    </Formik>
    </div>
  );
};

export default AddCarForm;
