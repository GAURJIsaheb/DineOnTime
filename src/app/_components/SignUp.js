"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

const SignUp = ({ switchToLogin }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [Phone_No, setPhone_No] = useState('');
  const [City, setCity] = useState('');
  const [Age, setAge] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Effect to handle success state after successful signup
  useEffect(() => {
    if (showSuccess) {
      const timeout = setTimeout(() => {
        switchToLogin(); // Switch to login after success
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [showSuccess]);

  const dosignup = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/restaurant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: "signup", Name, Email, Password, City, Age, Phone_No
        }),
      });
      const res = await response.json();
      console.log(res)
      if (res && res.success) {
        const result = res.res || res.result; // Ensure `res` is defined
        // // Remove sensitive data from the result before storing it
        // delete result.Password;
        // delete result.Age;
        // delete result.City;
        // localStorage.setItem("restaurantSignup", JSON.stringify(result));
        setShowSuccess(true); // Show success message
      } else {
        alert("Signup failed, please try again.");
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validate phone number
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(Phone_No)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    // Validate password length
    if (Password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    // Confirm password match
    if (Password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Proceed with signup
    await dosignup();
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6 text-green-500">Sign Up</h2>
      <form onSubmit={handleSignUp}>
        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            id="name"
            type="text"
            placeholder="Enter your name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-6 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
            Confirm Password
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            id="confirm-password"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* Phone Number Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={Phone_No}
            onChange={(e) => setPhone_No(e.target.value)}
            required
          />
        </div>

        {/* City Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
            City
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            id="city"
            type="text"
            placeholder="Enter your city"
            value={City}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        {/* Age Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
            Age
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            id="age"
            type="number"
            placeholder="Enter your age"
            value={Age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
            type="submit"
          >
            Sign Up
          </button>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mt-4 text-center text-green-600 font-bold">
            Sign Up Successful! Redirecting to login...
          </div>
        )}
      </form>
    </div>
  );
};

export default SignUp;
