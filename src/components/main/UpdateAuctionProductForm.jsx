import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Main from './Main';

const UpdateAuctionProductForm = () => {
  const { auctionId } = useParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [carData, setCarData] = useState(null);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get(
          `http://167.99.228.40:5000/api/cars/${auctionId}`
        );
        setCarData(response.data);
       
      } catch (error) {
        console.error('Failed to fetch car data:', error);
      }
    };
    fetchCarData();
  }, [auctionId]);

  const validationSchema = Yup.object().shape({
    carDetails: Yup.string().required('Car details are required'),
    auctionEndTime: Yup.string().required('Auction end time is required'),
    initialBid: Yup.number()
      .min(0, 'Initial bid must be 0 or greater')
      .required('Initial bid is required'),
    title: Yup.string().required('Title is required'),
    model: Yup.string().required('Model is required'),
    mileage: Yup.number()
      .min(0, 'Mileage must be 0 or greater')
      .required('Mileage is required'),
    Overview: Yup.string().required('Overview is required'),
    Description: Yup.string().required('Description is required'),
    SelectedFeatures: Yup.string().required('Selected features are required'),
    Body: Yup.string().required('Body is required'),
    FuelType: Yup.string().required('Fuel type is required'),
    Condition: Yup.string().required('Condition is required'),
    EngineSize: Yup.string().required('Engine size is required'),
    Door: Yup.number()
      .min(1, 'Door must be at least 1')
      .required('Number of doors is required'),
    Color: Yup.string().required('Color is required'),
    sold: Yup.string().oneOf(['Yes', 'No'], 'Invalid option'),
    // New file fields for uploads; these are optional.
    newImages: Yup.mixed().nullable(),
    newPdf: Yup.mixed().nullable(),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    setMessage(null);

    const token = localStorage.getItem('token');
    if (!token) {
      alert('User not authenticated');
      setLoading(false);
      setSubmitting(false);
      return;
    }

    // Determine if new files were provided.
    const hasNewImages =
      values.newImages && values.newImages instanceof FileList && values.newImages.length > 0;
    const hasNewPdf = values.newPdf && values.newPdf instanceof File;

    try {
      // If no new file is provided, send a JSON payload.
      if (!hasNewImages && !hasNewPdf) {
        // Build payload object using existing data.
        const payload = {
          ...values,
          // Ensure sold is a boolean.
          sold: values.sold === 'Yes',
          // Use existing images/pdf if no new file is provided.
          images: carData.images,
          pdf: carData.pdfUrl,
        };
        // Remove file fields that are not needed.
        delete payload.newImages;
        delete payload.newPdf;

        console.log('Sending JSON payload:', payload);

        await axios.put(
          `http://167.99.228.40:5000/api/cars/car/${auctionId}`,
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );
      } else {
        // Otherwise, build a FormData payload.
        const data = new FormData();

        // If new images are provided, append them.
        if (hasNewImages) {
          Array.from(values.newImages).forEach((image) =>
            data.append('images', image)
          );
        } else if (carData.images && Array.isArray(carData.images)) {
          // Otherwise, append the existing images (assuming backend can handle strings).
          carData.images.forEach((img) => data.append('images', img));
        }

        // For PDF: new file if provided; otherwise, the existing PDF URL.
        if (hasNewPdf) {
          data.append('pdf', values.newPdf);
        } else if (carData.pdfUrl) {
          data.append('pdf', carData.pdfUrl);
        }

        // Append remaining fields.
        for (const key in values) {
          if (key === 'newImages' || key === 'newPdf') continue;
          if (key === 'sold') {
            // Append as boolean value. Note: in FormData, this becomes a string,
            // so your backend must handle conversion.
            data.append('sold', values.sold === 'Yes');
          } else {
            data.append(key, values[key]);
          }
        }

        console.log('Sending FormData:');
        for (let pair of data.entries()) {
          console.log(`${pair[0]}: ${pair[1]}`);
        }

        const response = await axios.put(
          `http://167.99.228.40:5000/api/cars/car/${auctionId}`,
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        console.log("response: ", response)
      }
      setMessage('Car updated successfully!');
    } catch (error) {
      setMessage('Failed to update car');
      console.error(error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  if (!carData) return <p className="text-white">Loading...</p>;

  return (
    <div className="bg-[#1E223D]">
      <Main />
      <Formik
        initialValues={{
          ...carData,
          // Use separate fields for file uploads.
          newImages: null,
          newPdf: null,
          sold: carData.sold ? 'Yes' : 'No',
        }}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          console.log('Formik submitted:', values);
          handleSubmit(values, actions);
        }}
      >
        {({ setFieldValue, isSubmitting, errors, values, touched }) => (
          <>
            {/* Debug information */}
            <pre className="text-white p-2">
              {/*JSON.stringify({ errors, values, touched }, null, 2)*/}
            </pre>
            <Form className="bg-white/10 p-6 w-full max-w-2xl mx-auto mt-4 mb-4 rounded-2xl border border-gray-700 shadow-2xl">
              <h2 className="text-2xl font-bold text-center text-white">
                Update Car
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(carData).map(
                  (field) =>
                    // Exclude fields handled separately or not meant for editing.
                    field !== '_id' &&
                    field !== '__v' &&
                    field !== 'images' &&
                    field !== 'pdfUrl' &&
                    field !== 'pdfUrl' &&
                    field !== 'topBids' &&
                    field !== 'highestBidder' &&
                    field !== 'highestBid' && (
                      <div key={field} className="relative group">
                        <label className="absolute -top-2 left-3 bg-[#123a5d] px-2 text-xs font-semibold text-sky-400">
                          {field === 'sold' ? 'Sold' : field}
                        </label>
                        {field === 'sold' ? (
                          <Field
                            as="select"
                            name="sold"
                            className="w-full px-4 py-3 rounded-lg text-white bg-transparent border border-gray-500"
                          >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </Field>
                        ) : (
                          <Field
                            name={field}
                            className="w-full px-4 py-3 rounded-lg text-white bg-transparent border border-gray-500"
                          />
                        )}
                        <ErrorMessage
                          name={field}
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    )
                )}
              </div>

              {/* Preview of existing images */}
              {carData.images && Array.isArray(carData.images) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {carData.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt="Car"
                      className="w-20 h-20 rounded-md border border-gray-300"
                    />
                  ))}
                </div>
              )}

              {/* Preview of existing PDF */}
              {carData.pdfUrl && (
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => window.open(carData.pdfUrl, '_blank')}
                    className="bg-sky-500 text-white px-4 py-2 rounded-md"
                  >
                    View PDF
                  </button>
                </div>
              )}

              {/* File upload inputs for new images/PDF */}
              <div className="flex flex-col gap-4 mt-4">
  {/* Heading for Image Upload */}
  <label className="font-semibold">Upload Images:</label>
  <input
    type="file"
    name="newImages"
    multiple
    onChange={(e) => setFieldValue('newImages', e.currentTarget.files)}
  />

  {/* Heading for PDF Upload */}
  <label className="font-semibold">Upload PDF:</label>
  <input
    type="file"
    name="newPdf"
    accept=".pdf"
    onChange={(e) => setFieldValue('newPdf', e.currentTarget.files[0])}
  />
</div>


              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg"
              >
                {isSubmitting || loading ? 'Updating...' : 'Update Car'}
              </button>
              {message && (
                <p className="text-green-500 text-center mt-4">{message}</p>
              )}
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default UpdateAuctionProductForm;
