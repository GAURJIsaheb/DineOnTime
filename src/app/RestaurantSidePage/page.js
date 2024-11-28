"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '../../../public/restaurantlogo.png'; // Main logo
import AddFoodItems from '../_components/AddFoodItem';
import { useRouter } from 'next/navigation';

export default function RestaurantDashboard() {
  const [restoName, setRestoName] = useState('');
  const [showAddItem, setShowAddItem] = useState(false); // State to control AddFoodItem visibility
  const [isLoggedIn, setIsLoggedIn] = useState(true); // State to track login status
  const router = useRouter();

  const logout = () => {
    //localStorage.clear(); // Clears all data in localStorage
    localStorage.removeItem("isLoggedIn"); // Removes only the login status
    localStorage.removeItem("restaurantSignup"); // Removes only restaurant data
    setIsLoggedIn(false); // Update state to trigger redirect
  }

  useEffect(() => {
    // Check if user is logged in
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus === "false") {
      setIsLoggedIn(false); // Set state to false when not logged in
    }

    // To get the name of the current restaurant
    const restaurantSignupData = JSON.parse(localStorage.getItem('LoginData'));
    const name = restaurantSignupData ? restaurantSignupData.Name : null;
    setRestoName(name);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/RestaurantSideLandingPage'); // Redirect to login page or Landing page if not logged in
    }
  }, [isLoggedIn, router]); // Run this effect whenever isLoggedIn changes

  function goToItem() {
    router.push(`/FoodItemsList`);
  };

  return (
    <div className="bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 min-h-screen p-4">
      {/* Header Section */}
      <div className="bg-red-600 p-4 flex items-center justify-between text-white rounded-lg shadow-md mb-8">
        {/* Logo and Restaurant Name */}
        <div className="flex items-center space-x-4">
          <Image className="brightness-600 contrast-325 drop-shadow-lg filter" src={logo} alt="Restaurant Logo" width={200} height={150} />
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <span className="text-5xl font-bold">{restoName}</span>
          </div>
        </div>

        {/* Profile and Buttons */}
        <div className="flex flex-col items-start space-y-2">
          <div className="space-x-4">
            <button onClick={logout} className="bg-black text-white px-6 mr-10 py-1 rounded-lg font-semibold hover:bg-red-400">
              Log out
            </button>
          </div>
          <div className="space-x-4">
            <button 
              onClick={() => setShowAddItem(!showAddItem)} // Toggle showAddItem on click
              className="bg-blue-500 text-white px-5 py-1 mr-10 mt-4 rounded-lg font-semibold hover:bg-green-400"
            >
              {showAddItem ? 'Exit' : 'Add Item'}
            </button>
          </div>
          <div className="space-x-4">
            <button onClick={goToItem} className="bg-yellow-500 text-black px-3 mr-10 mt-3 py-1 rounded-lg font-semibold hover:bg-yellow-400">
              List of Items
            </button>
          </div>
        </div>
      </div>

      {/* Conditionally render AddFoodItems component */}
      {showAddItem && <AddFoodItems onAddItem={(item) => console.log('Item added:', item)} />}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Menu Management Section */}
        <div className="col-span-2">
          <h2 className="text-3xl font-bold mb-6 text-red-700">Manage Menu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MenuItem title="Burger Combo" price="15.99" color="bg-yellow-200" />
            <MenuItem title="Pasta Special" price="12.50" color="bg-green-200" />
            <MenuItem title="Sushi Platter" price="18.00" color="bg-red-200" />
            <MenuItem title="Vegan Salad" price="10.00" color="bg-purple-200" />
          </div>

          <h3 className="text-2xl font-semibold mt-10 mb-4 text-red-700">Upcoming Orders</h3>
          <OrderCard date="27/10/2024" orders={[{ title: 'Burger Combo', time: '12:00 PM' }, { title: 'Sushi Platter', time: '1:00 PM' }]} />
          <OrderCard date="27/10/2024" orders={[{ title: 'Vegan Salad', time: '2:00 PM' }, { title: 'Pasta Special', time: '3:00 PM' }]} />
        </div>

        {/* Sales Progress Section */}
        <div className="bg-white rounded-lg p-6 shadow-lg border-t-4 border-red-600">
          <h3 className="text-2xl font-semibold mb-6 text-red-700">Sales Progress</h3>
          <SalesProgressItem item="Burger Combo" progress="150/200 orders" />
          <SalesProgressItem item="Pasta Special" progress="120/150 orders" />
          <SalesProgressItem item="Vegan Salad" progress="90/100 orders" />
        </div>
      </div>
    </div>
  );
}

// Menu Item Component
function MenuItem({ title, price, color }) {
  return (
    <div className={`${color} p-6 rounded-lg shadow-md transform hover:scale-105 transition-all duration-200`}>
      <h4 className="text-xl font-semibold text-gray-800">{title}</h4>
      <p className="font-bold text-gray-700 mt-2">${price}</p>
      <button className="mt-4 bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-500">Edit</button>
    </div>
  );
}

// Order Card Component
function OrderCard({ date, orders }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h5 className="font-semibold text-lg mb-4 text-gray-800">{date}</h5>
      {orders.map((order, index) => (
        <div key={index} className="flex items-center justify-between mb-2">
          <span className="text-gray-800 font-medium">{order.title}</span>
          <span className="text-gray-600">{order.time}</span>
          <button className="bg-yellow-500 text-black py-1 px-3 rounded-full hover:bg-yellow-400">View</button>
        </div>
      ))}
    </div>
  );
}

// Sales Progress Item Component
function SalesProgressItem({ item, progress }) {
  return (
    <div className="bg-yellow-100 rounded-md p-6 mb-4 shadow-sm">
      <h5 className="font-semibold text-gray-800">{item}</h5>
      <div className="w-full bg-yellow-300 rounded-full h-4 mt-2">
        <div className="bg-red-500 h-4 rounded-full" style={{ width: '75%' }}></div>
      </div>
      <p className="text-gray-700 text-sm mt-2">{progress}</p>
    </div>
  );
}
