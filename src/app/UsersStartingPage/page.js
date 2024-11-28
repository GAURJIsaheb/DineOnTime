"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import bgimage from '../../../public/colorbg.jpg';
import leftlogo from '../../../public/usersidelogo.png';
import { useRouter } from 'next/navigation'; // Correct hook for routing
import Link from 'next/link';

function StylishSearchPage() {
  const [locations, setLocations] = useState([]);
  const [searchCity, setSearchCity] = useState('');
  const [searchFood, setSearchFood] = useState('');
  const [restaurant, setRestaurant] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const router = useRouter(); // Use router here

  const NavItem = ({ href, children }) => (
    <li>
      <Link href={href} className="hover:text-yellow-400 transition duration-300 hover:underline">
        {children}
      </Link>
    </li>
  );

  useEffect(() => {
    fetchLocation();
    loadRestaurantsData();
  }, []);

  const fetchLocation = async () => {
    let response = await fetch("http://localhost:3000/api/user/locations");
    response = await response.json();
    if (response.success) {
      setLocations(response.res);
    }
  };

  const loadRestaurantsData = async (params = {}) => {
    let url = "http://localhost:3000/api/user"; // URL for your API

    if (params?.location) {
      url = url + "?location=" + params.location;
    }
    if (params?.restaurant) {
      url = url + "?restaurant=" + params.restaurant;
    }
    let resp = await fetch(url);
    resp = await resp.json();
    setRestaurant(resp.result);
  };

  function gotoAllOrdersPage() {
    router.push("/AllOrdersPage");
  }

  const handleLocationClick = (loc) => {
    setSearchCity(loc);
    setShowOptions(false);
    loadRestaurantsData({ location: loc, restaurant: searchFood });
  };

  const handleFoodSearch = (e) => {
    setSearchFood(e.target.value);
    loadRestaurantsData({ location: searchCity, restaurant: e.target.value });
  };

  const filteredLocations = locations.filter(location =>
    location.toLowerCase().includes(searchCity.toLowerCase())
  );

  return (
    <div className="relative w-full min-h-screen text-white bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-gradient-x">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-opacity-70">
        <Image
          src={bgimage}
          alt="background"
          layout="fill"
          objectFit="cover"
          className="opacity-80 blur-sm"
        />
      </div>

      {/* Navigation Bar */}
      <nav className="absolute w-full p-4 flex items-center justify-between z-10 bg-opacity-0">
        {/* Logo */}
        <div className="flex items-center transform hover:scale-110 transition duration-300">
          <Image
            src={leftlogo}
            alt="Logo"
            width={100}
            height={100}
            priority={true}
            className="brightness-125 drop-shadow-lg"
          />
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center py-20 px-6">
        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-8 mb-4 font-bold neon-text tracking-wider">
          <NavItem href="/">Home</NavItem>
          <NavItem href="/AllOrdersPage">All Orders</NavItem>
          <NavItem href="#">Offers</NavItem>
          <NavItem href="#">Profile</NavItem>
        </ul>

        {/* Search Inputs */}
        <div className="w-full max-w-5xl space-y-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search City Wise..."
              value={searchCity}
              onChange={(e) => {
                setSearchCity(e.target.value);
                setShowOptions(e.target.value.length > 0); // Show options when there's input
              }}
              className="w-full px-6 py-4 bg-gray-800 bg-opacity-60 text-white rounded-lg shadow-lg border-2 border-transparent focus:outline-none focus:border-yellow-400 placeholder-gray-400 transition-transform duration-200 hover:scale-105"
            />
            {showOptions && searchCity && (
              <div className="absolute w-full bg-gray-500 bg-opaque rounded-lg shadow-lg mt-1 z-20">
                {filteredLocations.length > 0 ? (
                  filteredLocations.map((loc, index) => (
                    <div
                      key={index}
                      onClick={() => handleLocationClick(loc)}
                      className="px-6 py-4 text-white hover:bg-gray-700 cursor-pointer transition-all duration-300"
                    >
                      {loc}
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-4 text-gray-400">No locations found</div>
                )}
              </div>
            )}
          </div>

          <input
            type="text"
            placeholder="Search your Food or Restaurant..."
            value={searchFood}
            onChange={handleFoodSearch}
            className="w-full px-6 py-4 bg-gray-800 bg-opacity-60 text-white rounded-lg shadow-lg border-2 border-transparent focus:outline-none focus:border-pink-400 placeholder-gray-400 transition-transform duration-200 hover:scale-105"
          />

          {/* Restaurant Data Display */}
          <div className="mt-8 w-full">
            <h2 className="text-4xl font-extrabold tracking-wide mb-6">Restaurant Details</h2>
            {restaurant.length > 0 ? (
              <ul className="space-y-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {restaurant.map((res, index) => (
                  <li
                    key={index}
                    className="p-6 bg-gray-900 bg-opacity-70 rounded-lg hover:cursor-pointer shadow-xl transform hover:scale-105 hover:bg-gradient-to-r from-purple-700 to-pink-600 transition-all duration-300"
                    onClick={() => {
                      router.push("/exploreRestaurant/" + res.Name + "?id=" + res._id);
                    }}
                  >
                    <p className="text-xl font-semibold"><span className="text-yellow-400">Name:</span> {res.Name}</p>
                    <p className="text-xl font-semibold"><span className="text-yellow-400">Email:</span> {res.Email}</p>
                    <p className="text-xl font-semibold"><span className="text-yellow-400">Phone Number:</span> {res.Phone_No}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-lg">No restaurant data available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StylishSearchPage;
