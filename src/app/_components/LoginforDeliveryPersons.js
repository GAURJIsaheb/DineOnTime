import React, { useState } from 'react'; 
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility
  const router = useRouter();

//   const gotoRestaurantSidePage = () => {
//     router.push('/RestaurantSidePage');
//   };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/DeliveryPersonsApi/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", Email: email, Password: password }),
      });
      const res = await response.json();
      if (res.success) {
        // Store the user data and logged-in status in localStorage
        localStorage.setItem("isLoggedIn-DeliveyPerson", "true");
        localStorage.setItem("LoginData-DeliveyPerson", JSON.stringify(res.userData)); // Store user data excluding password
        router.push("/DeliveryPersonDashboard");
      } else {
        setEmail("");
        setPassword("");
        setShowDropdown(true); // Show dropdown on unsuccessful login
        setTimeout(() => setShowDropdown(false), 3000); // Hide after 3 seconds
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6 text-green-500">Food Delivery App</h2>
      
      {showDropdown && (
        <div className="bg-red-600 text-white text-center py-3 px-4 rounded-lg shadow-md mb-4 transition-transform transform -translate-y-3 opacity-100 duration-300">
          Login failed. Please check your credentials.
        </div>
      )}
      
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="email">Email Address</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6 relative">
          <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="password">Password</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-3 cursor-pointer text-gray-500">
            <FontAwesomeIcon
              onClick={() => setShowPassword(!showPassword)}
              icon={showPassword ? faEyeSlash : faEye}
              className="text-lg" // Set the icon size using Tailwind
            />
          </div>
        </div>
        <button className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
