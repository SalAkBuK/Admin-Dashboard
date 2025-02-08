import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TotalRevenueChart = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchTotalRevenue = async () => {
      try {
        const response = await fetch('http://167.99.228.40:5000/admin/total-revenue', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        setTotalRevenue(data.totalRevenue);
      } catch (error) {
        console.error("Error fetching total revenue:", error);
      }
    };

    fetchTotalRevenue();
  }, []);

  const data = {
    labels: ['Total Revenue'],
    datasets: [
      {
        label: 'Revenue (PKR)',
        data: [totalRevenue],
        backgroundColor: 'linear-gradient(45deg, #ff6ec7, #8e44ad)', // Gradient for a modern look
        borderColor: '#9b59b6',
        borderWidth: 3,
        hoverBackgroundColor: '#8e44ad',  // Purple hover effect
        hoverBorderColor: '#fff',
        hoverBorderWidth: 4,
        barThickness: 40, // Thicker bars for a more substantial look
      },
    ],
  };

  const options = {
    responsive: true,
    animation: {
      duration: 1000, // Smooth animation for transitions
      easing: 'easeOutBounce', // Bouncy easing effect
    },
    plugins: {
      title: {
        display: true,
        text: 'Total Revenue for the Month',
        font: {
          size: 28,
          weight: 'bold',
        },
        color: '#fff',
        padding: {
          top: 30,
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker tooltip background
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderWidth: 2,
        padding: 12,
        cornerRadius: 6,
      },
      legend: {
        labels: {
          font: {
            size: 16,
            weight: 'bold',
          },
          color: '#fff',
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // No grid lines
        },
        ticks: {
          color: '#fff',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',  // Lighter grid lines
        },
        ticks: {
          color: '#fff',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-96 bg-gradient-to-r from-blue-700 via-purple-800 to-indigo-700 p-6 rounded-xl shadow-2xl">
      <h3 className="text-white text-center text-3xl font-extrabold mb-6">Total Revenue</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default TotalRevenueChart;
