"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function EditList({ params }) {
    const currentID = params.editpage;
    const [itemName, setItemName] = useState('');
    const [itemLink, setItemLink] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemRestaurantID, setItemRestaurantID] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const router=useRouter();
    function goback(){
        router.push('/FoodItemsList')
    }

    // Fetch item details on component mount
    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/restaurant/foods/edit/${currentID}`);
                const data = await response.json();
                if (response.ok && data) {
                    // Set state with fetched data to populate form
                    setItemName(data.result.itemName || '');
                    setItemLink(data.result.itemLink || '');
                    setItemPrice(data.result.itemPrice || '');
                    setItemDescription(data.result.itemDescription || '');
                   
                } else {
                    console.error('Failed to fetch item details');
                }
            } catch (error) {
                console.error('Error fetching item details:', error);
            }
        };

        fetchItemDetails();
    }, [currentID]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/api/restaurant/foods/edit/${currentID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    itemName,
                    itemLink,
                    itemPrice,
                    itemDescription,
                 
                }),
            });

            if (response.ok) {
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 2500);
               
            } else {
                console.error('Failed to update item');
            }
            setTimeout(goback, 2500);
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    return (
        <div className="bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 p-8 rounded-lg shadow-xl max-w-md mx-auto my-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Edit Item</h2>
            {showSuccess && (
                <div className="bg-green-600 text-white text-center py-3 px-4 rounded-lg shadow-md mb-4 transition-transform transform -translate-y-3 opacity-100 duration-300">
                    Item updated successfully!
                </div>
            )}
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
                    Update Item
                </button>
                <button onClick={goback}type="submit" className="bg-black text-white py-3 px-6 rounded-lg font-semibold hover:scale-105 transform transition-all duration-200 shadow-md hover:shadow-lg w-full">
                    Exit
                </button>
            </form>
        </div>
    );
}
