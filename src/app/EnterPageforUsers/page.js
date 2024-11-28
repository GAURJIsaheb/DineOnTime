"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function Page() {
  const [userName, setUserName] = useState(''); // Initialize userName state
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in and retrieve user data from localStorage
    const loginData = localStorage.getItem("LoginData");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn || isLoggedIn !== "true") {
      router.push('/'); // Redirect to login if not logged in
    } else if (loginData) {
      const userData = JSON.parse(loginData);
      setUserName(userData.username); // Assuming "username" is a key in LoginData
    }
  }, [router]);

  const gotoStartingPage = () => {
    router.push('/UsersStartingPage');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Welcome, {userName || "User"}!</h1>
      <p className="text-lg mb-8">Explore our exclusive offerings just for you.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white text-black rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Browse Menu</h2>
          <p className="text-gray-800">Check out our delicious options!</p>
        </div>

        <div className="bg-white text-black rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Special Offers</h2>
          <p className="text-gray-800">Discover exclusive deals just for you.</p>
        </div>

        <div className="bg-white text-black rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Your Orders</h2>
          <p className="text-gray-800">Review your recent purchases.</p>
        </div>
      </div>

      <button
        onClick={gotoStartingPage} // Navigate to the starting page
        className="mt-8 bg-red-500 text-white font-bold py-2 px-6 rounded hover:bg-red-700"
      >
        Enter
      </button>
    </div>
  );
}

export default Page;
