/*As a USER entry krega jo,,usae dikhai dega ye,,ah kisko kya dikhana hai,,vo Dekhna pdega */
"use client";
import React, { useState } from 'react';
import LoginforUsers from '../app/_components/LoginforUsers';
import SignupforUsers from '../app/_components/SignupforUsers';

export default function HomePage() {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and SignUp

  const handleSwitch = () => {
    setIsLogin(!isLogin); // Toggle the login/signup state
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-black via-red-700 to-purple-800">
      <div className="w-full max-w-md bg-black shadow-md rounded-2xl px-8 py-10">
        {isLogin ? (
          <>
            <LoginforUsers switchToSignUp={handleSwitch} /> {/* Pass function to switch to SignUp */}
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
            <SignupforUsers switchToLogin={handleSwitch} /> {/* Pass function to switch to Login */}
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


