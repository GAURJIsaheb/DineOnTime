import React, { useEffect, useState } from 'react';

const AddFootItems = ({ onAddItem }) => {
  const [itemName, setItemName] = useState('');
  const [itemLink, setItemLink] = useState(''); // item ki image hai ye *
  const [itemPrice, setItemPrice] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemRestaurantID, setitemRestaurantID] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  // Set itemRestaurantID from localStorage on mount
  useEffect(() => {
    const restaurantData = JSON.parse(localStorage.getItem("LoginData"));
    if (restaurantData) {
      setitemRestaurantID(restaurantData._id);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
   

    if (itemName && itemLink && itemPrice && itemDescription && itemRestaurantID) {
      try {
        const response = await fetch('/api/restaurant/foods', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            itemName: itemName,
            itemLink: itemLink,
            itemPrice: itemPrice,
            itemDescription: itemDescription,
            resto_id: itemRestaurantID,
          }),
        });

        if (response.ok) {
          console.log(itemRestaurantID,itemName,itemPrice);
          const newItem = await response.json();
          onAddItem(newItem);
          setItemName('');
          setItemLink('');
          setItemPrice('');
          setItemDescription('');
          setShowDropdown(false);
          setShowSuccess(true);

          setTimeout(() => {
            setShowSuccess(false);
          }, 3000);
        } else {
          setShowFailure(true);
          setTimeout(() => {
            setShowFailure(false);
          }, 3000);
          console.error('Failed to add item');
        }
      } catch (error) {
        setShowFailure(true);
        setTimeout(() => {
          setShowFailure(false);
        }, 3000);
        console.error('Error:', error);
      }
    } else {
      setShowDropdown(true);
    }
  };

  return (
    <div className="add-foot-item bg-white rounded-lg p-6 shadow-lg mb-6">
      {showDropdown && (
        <div className="bg-black text-white text-center py-3 px-4 rounded-lg shadow-md mb-4 transition-transform transform -translate-y-3 opacity-100 duration-300">
          Please fill all the fields.
        </div>
      )}
      {showSuccess && (
        <div className="bg-green-600 text-white text-center py-3 px-4 rounded-lg shadow-md mb-4 transition-transform transform -translate-y-3 opacity-100 duration-300">
          Item added successfully!
        </div>
      )}
      {showFailure && (
        <div className="bg-yellow-600 text-white text-center py-3 px-4 rounded-lg shadow-md mb-4 transition-transform transform -translate-y-3 opacity-100 duration-300">
          Failed to add item. Please try again.
        </div>
      )}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add a New Item</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Item Name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm transition-all"
                />
                <input
                    type="text"
                    placeholder="Image Link"
                    value={itemLink}
                    onChange={(e) => setItemLink(e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm transition-all"
                />
                <input
                    type="number"
                    placeholder="Price (INR)"
                    value={itemPrice}
                    onChange={(e) => setItemPrice(e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm transition-all"
                />
                <textarea
                    placeholder="Description"
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm transition-all resize-none h-24"
                />
                <button type="submit" className="bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:scale-105 transform transition-all duration-200 shadow-md hover:shadow-lg w-full">
                    Add Item
                </button>
            </form>
        </div>
  );
};

export default AddFootItems;
