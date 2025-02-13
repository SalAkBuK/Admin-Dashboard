import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Main from './Main';
import { motion } from "framer-motion";

const UpdateProductForm = () => {
    const navigate = useNavigate();
    const { productId } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        model: '',
        mileage: '',
        images: [],
        pdf: null,
        Overview: '',
        Description: '',
        SelectedFeatures: '',
        Body: '',
        FuelType: '',
        Condition: '',
        EngineSize: '',
        Door: 0,
        sold: false, 
        Transmission: '', // Added Transmission field
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log("No token found, redirecting to login.");
            navigate('/admin');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://167.99.228.40:5000/api/products/${productId}`);
                const product = response.data.products;
                
                setFormData({
                    title: product.title || '',
                    price: product.price || '',
                    model: product.model || '',
                    mileage: product.mileage || '',
                    Overview: product.Overview || '',
                    Description: product.Description || '',
                    SelectedFeatures: product.SelectedFeatures || '',
                    Body: product.Body || '',
                    FuelType: product.FuelType || '',
                    Condition: product.Condition || '',
                    EngineSize: product.EngineSize || '',
                    Door: product.Door || '',
                    sold: product.sold || false,
                    Transmission: product.Transmission || 'Automatic', // Fetch Transmission
                });
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('User not authenticated');
                return;
            }

            await axios.put(`http://167.99.228.40:5000/api/products/${productId}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            alert('Product updated successfully!');
            navigate('/used-cars'); 
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Error updating product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#0b213e] w-full min-h-screen">
            <Main />
            <section className="flex flex-col w-[90%] sm:w-[100%] overflow-auto">
                <div className="bg-[#0b213e] min-h-screen flex flex-col justify-center items-center py-8">
                    {formData.sold && (
                        <h2 className="text-3xl font-bold text-red-500 text-center mb-4">
                            This car has been sold and cannot be updated.
                        </h2>
                    )}
                    <form
                        className="bg-white/10 backdrop-blur-lg shadow-2xl border border-gray-700 rounded-2xl p-6 space-y-6 w-full max-w-lg mx-auto"
                        onSubmit={handleSubmit}
                    >
                        <h2 className="text-2xl font-bold text-center text-white">Update Product</h2>

                        {Object.keys(formData).filter(key => key !== 'sold').map((id) => (
                            <motion.div key={id} className="relative group" whileHover={{ scale: 1.05 }}>
                                <label
                                    htmlFor={id}
                                    className="absolute -top-2 left-3 bg-[#123a5d] px-2 text-xs font-semibold text-sky-400"
                                >
                                    {id.charAt(0).toUpperCase() + id.slice(1)}
                                </label>
                                <input
                                    id={id}
                                    type="text"
                                    name={id}
                                    value={formData[id]}
                                    onChange={handleInputChange}
                                    required
                                    disabled={formData.sold}
                                    className={`w-full px-4 py-3 rounded-lg text-white bg-transparent border border-gray-500 ${formData.sold ? 'opacity-50 cursor-not-allowed' : 'focus:border-sky-400 focus:ring-2 focus:ring-sky-400'} outline-none shadow-lg transition-all duration-300`}
                                />
                            </motion.div>
                        ))}

                        <div className="flex justify-center">
                            <motion.button
                                type="submit"
                                disabled={loading || formData.sold}
                                className="w-full py-3 px-6 rounded-lg text-white font-semibold bg-blue-600"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {loading ? "Updating..." : "Update Product"}
                            </motion.button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default UpdateProductForm;
