"use client"
import React, { useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { useRouter } from "next/navigation";


// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);



export default function Dashboard() {

    const router=useRouter();

    useEffect(() => {
            // Fetch data from localStorage
            const LoginState = localStorage.getItem("isLoggedIn-DeliveyPerson"); // Replace with your key
            if (!LoginState || LoginState!=='true') {
            router.push('/'); // Parse the JSON data
            }
        }, [router]);



        
  // Pie Chart Data for "Orders by Status"
  const ordersByStatusData = {
    labels: ["Delivered", "On Delivery", "Cancelled", "New"],
    datasets: [
      {
        data: [40.47, 29.77, 9.7, 20.06], // percentages
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384", "#4BC0C0"],
      },
    ],
  };

  // Pie Chart Data for "Best Selling Items"
  const bestSellingItemsData = {
    labels: ["Philly Cheesesteak", "Fried Green Tomatoes", "Fried Shrimp", "Hot Dogs", "Nachos"],
    datasets: [
      {
        data: [28.12, 20.78, 18.07, 16.27, 16.76], // percentages
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  // Bar Chart Data for "Orders by Payment Type and Source"
  const ordersByPaymentData = {
    labels: ["Website", "Mobile App", "Cash on Delivery", "Credit Card", "Debit Card"],
    datasets: [
      {
        label: "Orders",
        data: [20000, 15000, 10000, 12000, 8000],
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <header className="text-xl font-bold text-gray-800 mb-6">
        Online Food Ordering Analysis Dashboard
      </header>

      {/* Stats Summary */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {[
          { title: "Total Restaurants", value: 45, color: "bg-yellow-200" },
          { title: "Total Menus", value: 53, color: "bg-pink-200" },
          { title: "Total Customers", value: 297, color: "bg-blue-200" },
          { title: "Total Sales", value: "$3.99M", color: "bg-purple-200" },
        ].map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} p-4 rounded-lg shadow-md text-gray-800`}
          >
            <p className="text-sm font-medium">{stat.title}</p>
            <p className="text-2xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-2 gap-6">
        {/* Orders by Status */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-medium text-gray-800 mb-4">Orders by Status</h3>
          <Pie data={ordersByStatusData} />
        </div>

        {/* Best Selling Items */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-medium text-gray-800 mb-4">Best Selling Items</h3>
          <Pie data={bestSellingItemsData} />
        </div>

        {/* Orders by Payment */}
        <div className="bg-white p-4 rounded-lg shadow-md col-span-2">
          <h3 className="font-medium text-gray-800 mb-4">
            Orders by Payment Type and Source
          </h3>
          <Bar data={ordersByPaymentData} />
        </div>
      </div>
    </div>
  );
}

