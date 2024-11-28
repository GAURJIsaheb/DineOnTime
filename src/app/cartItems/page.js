"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const [cartStorage, setCartStorage] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn || isLoggedIn !== "true") {
      router.push("/"); // Redirect to login if not logged in
    }
    setIsClient(true); // Set to true once the component is mounted on the client side
  }, []);

  useEffect(() => {
    if (isClient) {
      const cartData = JSON.parse(localStorage.getItem("cart")) || [];
      setCartStorage(cartData);
    }
  }, [isClient]);

  // Function to remove an item from the cart
  const removeItem = (itemId) => {
    const updatedCart = cartStorage.filter((item) => item._id !== itemId);
    setCartStorage(updatedCart);

    if (isClient) {
      if (updatedCart.length > 0) {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      } else {
        localStorage.removeItem("cart"); // Remove the cart from localStorage if empty
      }
    }
  };

  function gotoShowBillPage() {
    router.push("/TotalBill");
  }

  // Calculate total price and update in local storage if cart has items
  let totalPrice = cartStorage.reduce((total, item) => total + item.itemPrice, 0);
  totalPrice = Math.round(totalPrice + (totalPrice + 100) / 18);

  useEffect(() => {
    if (cartStorage.length > 0 || totalPrice > 0) {
      localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    }
  }, [cartStorage, totalPrice]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-yellow-400 p-8 text-white flex flex-col">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 bg-black hover:bg-gray-500 text-white py-2 px-4 rounded-lg shadow-md transition-colors"
      >
        Back
      </button>

      <div className="w-full max-w-3xl mx-auto flex-grow">
        <h1 className="text-4xl font-bold text-center mb-6">Cart Items :</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cartStorage && cartStorage.length > 0 ? (
            cartStorage.map((item) => (
              <div
                key={item._id}
                className="bg-white bg-opacity-20 rounded-lg shadow-lg p-4 hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={item.itemLink}
                  alt={item.itemName}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-2xl font-semibold">{item.itemName}</h2>
                <p className="mt-2 text-lg">{item.itemDescription}</p>
                <p className="mt-4 text-xl font-bold">Price: ₹{item.itemPrice}</p>
                <button
                  onClick={() => removeItem(item._id)}
                  className="mt-4 w-full bg-red-700 hover:bg-red-500 text-white font-semibold py-2 rounded-lg transition-colors duration-300"
                >
                  Remove Item
                </button>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-32">
              <p className="text-4xl">No cart data</p>
            </div>
          )}
        </div>
      </div>
      {cartStorage && cartStorage.length > 0 && (
        <div className="w-full max-w-3xl mx-auto mt-6 p-4 bg-white bg-opacity-20 rounded-lg">
          <p className="text-lg">Items Total: ₹ {totalPrice}</p>
          <p className="text-lg">Delivery Charges: ₹ 100</p>
          <p className="text-lg">GST: 18%</p>
          <p className="text-lg font-bold">Total Bill: ₹ {totalPrice}</p>
          <button
            onClick={gotoShowBillPage}
            className="mt-4 w-full bg-green-400 p-3 rounded-lg hover:bg-green-700 hover:scale-105 transition-transform duration-300"
          >
            Order Now
          </button>
        </div>
      )}
    </div>
  );
}
