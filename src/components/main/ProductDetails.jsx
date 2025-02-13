import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://167.99.228.40:5000/api/products/${productId}`);
        setProduct(response.data.products);
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      }
    };
    
    fetchProduct();
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? product.images.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === product.images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="w-full max-w-5xl bg-[#0b213e] p-10 gap-10 rounded-xl shadow-lg text-white ml-2 mt-2 mb-10">
      <h2 className="text-2xl font-semibold mb-6">{product.title}</h2>
      
      {/* Image Carousel */}
      <div className="relative">
        <img
          src={product.images[currentImageIndex] || 'fallback-image-url.jpg'}
          alt={`Image ${currentImageIndex + 1}`}
          className="w-full h-auto rounded-lg cursor-pointer"
        />
        {product.images.length > 1 && (
          <>
            <button onClick={handlePreviousImage} className="absolute top-1/2 left-2 transform -translate-y-1/2 text-2xl text-white bg-[#4b4cfe] rounded-full p-2 hover:bg-[#3738ff]">
              <FaArrowLeft />
            </button>
            <button onClick={handleNextImage} className="absolute top-1/2 right-2 transform -translate-y-1/2 text-2xl text-white bg-[#4b4cfe] rounded-full p-2 hover:bg-[#3738ff]">
              <FaArrowRight />
            </button>
          </>
        )}
      </div>
      
      {/* Product Details */}
      <div className="mt-6">
  <p><strong>Overview:</strong> {product.Overview}</p>
  <p><strong>Description:</strong> {product.Description}</p>
  <p><strong>Selected Features:</strong> {product.SelectedFeatures}</p>
  <p><strong>Body:</strong> {product.Body}</p>
  <p><strong>Fuel Type:</strong> {product.FuelType}</p>
  <p><strong>Condition:</strong> {product.Condition}</p>
  <p><strong>Engine Size:</strong> {product.EngineSize}</p>
  <p><strong>Door:</strong> {product.Door}</p>
  <p><strong>Model:</strong> {product.model}</p>
  <p><strong>Mileage:</strong> {product.mileage}</p>
  <p><strong>Price:</strong> {product.price}</p>
</div>

      
      {/* PDF Link */}
      {product.pdfUrl && (
        <div className="mt-4">
          <a href={product.pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-[#4b4cfe] rounded-full text-white font-semibold hover:bg-[#3738ff]">
            View Inspection Report
          </a>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
