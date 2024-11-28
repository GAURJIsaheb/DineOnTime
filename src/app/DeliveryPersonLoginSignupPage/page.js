"use client";
import React, { useState } from 'react';
import LoginforDeliveryPersons from '../../app/_components/LoginforDeliveryPersons';
import SignupforDeliveryPersons from '../../app/_components/SignupforDeliveryPersons';
import Image from 'next/image';
import DeliveryBoy from '../../../Public/deliveryBoy.png';

export default function HomePage() {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and SignUp

  const handleSwitch = () => {
    setIsLogin(!isLogin); // Toggle the login/signup state
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-t from-black via-red-700 to-purple-800 relative">
      {/* Responsive Image */}
      <div className="relative md:mr-8 mb-6 md:mb-0 w-full max-w-xs md:max-w-sm">
        <Image
          className="mx-auto object-contain"
          src={DeliveryBoy} // Path to the image
          alt="Delivery Boy"
          width={200} // Set a large base width
          height={150} // Set a large base height
          priority
        />
      </div>

      {/* Login/Signup Form */}
      <div className="w-full max-w-sm bg-black shadow-lg rounded-2xl px-8 py-10 mx-4 md:mx-0">
        {isLogin ? (
          <>
            <LoginforDeliveryPersons switchToSignUp={handleSwitch} /> {/* Pass function to switch to SignUp */}
            <p className="mt-4 text-center text-white">
              Did you have an account? 
              <button 
                onClick={handleSwitch} 
                className="text-blue-500 hover:underline ml-1"
              >
                Sign Up
              </button>
            </p>
          </>
        ) : (
          <>
            <SignupforDeliveryPersons switchToLogin={handleSwitch} /> {/* Pass function to switch to Login */}
            <p className="mt-4 text-center text-white">
              Already have an account? 
              <button 
                onClick={handleSwitch} 
                className="text-blue-500 hover:underline ml-1"
              >
                Login
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
