"use client"
import React, { useEffect, useState } from 'react';

export default function AllOrders() {
    const [myorders, setmyorders] = useState([]);
    
    const getorder = async () => {
        let fetchedId = JSON.parse(localStorage.getItem('LoginData'))
        let resp = await fetch("http://localhost:3000/api/OrderApi?id=" + fetchedId._id);
        resp = await resp.json();
        if (resp.success || resp.ok) {
            setmyorders(resp.result);
        }
    };

    useEffect(() => {
        getorder();
    }, []);

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-700 to-blue-600 p-6">
            <div className="w-full max-w-4xl rounded-lg p-6">
                <h1 className="text-4xl font-bold text-center text-white mb-8">All Orders</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {myorders.map((order) => (
                        <div key={order.data._id} className="bg-white shadow-lg rounded-lg p-6 transform transition-all hover:scale-105 hover:shadow-2xl">
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-semibold text-gray-800">{order.data.Name}</h2>
                                <p className="text-gray-600">{order.data.City}</p>
                            </div>
                            <div className="mb-4">
                                <p className="text-lg font-medium text-gray-700">Email:</p>
                                <p className="text-gray-800">{order.data.Email}</p>
                            </div>
                            <div className="mb-4">
                                <p className="text-lg font-medium text-gray-700">Amount:</p>
                                <p className="text-red-400 text-xl font-semibold">{order.amount} RS</p>
                            </div>
                            <div className="mb-4">
                                <p className="text-lg font-medium text-gray-700">Status:</p>
                                <p className={`text-lg font-semibold ${order.status === 'Confirm' ? 'text-green-500' : 'text-red-500'}`}>
                                    {order.status}
                                </p>
                            </div>
                            <div className="mt-4 text-center">
                                <button className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-all">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
