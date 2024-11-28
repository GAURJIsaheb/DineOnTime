/*As a USER entry krega jo,,usae dikhai dega ye,,ah kisko kya dikhana hai,,vo Dekhna pdega */
"use client";
import React, { useState } from 'react';
import Login from '../_components/Login';
import SignUp from '../_components/Signup';

export default function HomePage() {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and SignUp

  const handleSwitch = () => {
    setIsLogin(!isLogin); // Toggle the login/signup state
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-300">
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 py-10">
        {isLogin ? (
          <>
            <Login switchToSignUp={handleSwitch} /> {/* Pass function to switch to SignUp */}
            <p className="mt-4 text-center">
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
            <SignUp switchToLogin={handleSwitch} /> {/* Pass function to switch to Login */}
            <p className="mt-4 text-center">
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
