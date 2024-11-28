"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Page(props) {
  const [restaurantFoods, setRestaurantFoods] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartData, setCartData] = useState([]);
  const name = props.params.name;
  const router=useRouter()

  useEffect(() => {
    loadRestaurantFoods();
    const storedRestaurantName = localStorage.getItem('restaurantName');
    const cartLocalStorage = JSON.parse(localStorage.getItem(`cart`));

    if (storedRestaurantName === name && cartLocalStorage) {
      setCartData(cartLocalStorage);
      setCartCount(cartLocalStorage.length);
    } else {
      localStorage.removeItem(`cart`);
      setCartData([]);
      setCartCount(0);
      localStorage.setItem('restaurantName', name);
    }
  }, [name]);

  useEffect(() => {
    if (cartData.length > 0) {
      localStorage.setItem(`cart`, JSON.stringify(cartData));
    }
    setCartCount(cartData.length);
  }, [cartData, name]);

  const addToCart = (item) => {
    if (!cartData.some(cartItem => cartItem._id === item._id)) {//taki vhi particular Item ka button change ho
      const updatedCart = [...cartData, item];
      setCartData(updatedCart);
    }
  };

  const removeFromCart = (item) => {
    const updatedCart = cartData.filter(cartItem => cartItem._id !== item._id);
    setCartData(updatedCart);
  };

  const loadRestaurantFoods = async () => {
    const urlId = props.searchParams.id;
    try {
      let resp = await fetch("http://localhost:3000/api/user/" + urlId);
      resp = await resp.json();

      if (resp.success) {
        setRestaurantFoods(resp.dataFood);
      }
    } catch (error) {
      console.error('Error fetching restaurant foods:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-red-500 via-yellow-400 to-pink-600 text-white animate-gradient-bg">
      {/* Header */}

      <header className="relative w-full py-4 md:py-6 bg-gradient-to-r from-yellow-500 via-red-600 to-pink-700 text-center shadow-2xl">
         {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-black hover:bg-gray-500 text-white py-2 px-4 rounded-lg shadow-md transition-colors"
          >
            Back
          </button>

          {/* Header Title */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-snug sm:leading-tight px-4">
  🍕🔥      Welcome to {decodeURI(name)} 🔥🍕
      </h1>


          {/* Cart Button */}
          <Link
            href={cartCount > 0 ? "/cartItems" : "#"}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 flex items-center text-white p-2 rounded-full transition-all"
          >
             <span className="text-2xl sm:text-3xl text-white  md:text-4xl">🛒</span>
            <span className="ml-2 text-sm md:text-base  font-bold">{cartCount}</span>
          </Link>
        </header>



      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-center items-center text-4xl font-semibold mt-8 space-y-6">
        {/* Decorative Elements */}
        <div className="text-7xl animate-bounce transition duration-500">🌟</div>
        <div className="bg-white bg-opacity-20 p-10 rounded-xl border-4 border-pink-500 shadow-2xl transform rotate-2 hover:rotate-0 hover:scale-110 transition-transform duration-500">
          <span className="text-black">Dare to Taste the Hotness of</span> {decodeURI(name)}
        </div>
        <div className="text-7xl animate-flicker transition duration-1000">🔥</div>

        {/* Display List of Foods */}
        {/* Display List of Foods */}
        <div className="mt-10 pb-10 w-full max-w-6xl px-4 md:px-8">
          {restaurantFoods.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {restaurantFoods.map((food, index) => (
                <li key={index} className="bg-white bg-opacity-40 p-6 rounded-lg shadow-lg text-black flex flex-col justify-between">
                  {/* Image Element */}
                  {food.itemLink && (
                    <img
                      src={food.itemLink}
                      alt={food.itemName}
                      className="w-full h-64 object-cover rounded-md mb-4"
                    />
                  )}
                  <h2 className="text-4xl font-bold">{food.itemName}</h2>
                  <p className="text-3xl mt-8">{food.itemDescription}</p>
                  <p className="flex justify-between items-center mt-4 text-2xl text-gray-700">
                    Price: ₹{food.itemPrice}
                  </p>
                  <div className="mt-4">
                    {cartData.some(cartItem => cartItem._id === food._id) ? (
                      <button
                        onClick={() => removeFromCart(food)}
                        className="text-lg p-3 w-full sm:w-auto rounded-lg bg-red-700 text-white shadow-lg hover:bg-yellow-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      >
                        Remove from Cart <span className="ml-2">✘</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => addToCart(food)}
                        className="text-lg p-3 w-full sm:w-auto rounded-lg bg-green-800 text-white shadow-lg hover:bg-green-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      >
                        Add to Cart <span className="ml-2">🛒</span>
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xl">Loading food items...</p>
          )}
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full py-4 bg-red-900 text-center text-xl font-medium shadow-inner">
        <p>Experience the sizzle, one bite at a time. 🌶️✨</p>
      </footer>
    </div>
  );
}
