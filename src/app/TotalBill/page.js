"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Bill() {
    const [showOrderedConfirmation, setshowOrderedConfirmation] = useState(false);
    const [OrderReject, setshowOrderReject] = useState(false);
    const [cartData, setCartData] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn || isLoggedIn !== 'true') {
            router.push('/'); // Redirect to login if not logged in
        } else {
            // Retrieve and set cart data
            const storedCartData = JSON.parse(localStorage.getItem('cart')) || [];
            setCartData(storedCartData);
        }
    }, [router]);

    const calculateTotal = () => {
        return cartData.reduce((total, item) => total + item.itemPrice * (item.quantity || 1), 0).toFixed(2);
    };

    const sendDatatoOrdersDb = async () => {
        try {
            let user_id = JSON.parse(localStorage.getItem('LoginData'))._id;
            let location= JSON.parse(localStorage.getItem('LoginData')).City;//or location
            let foodItemsIds = cartData.map((item) => item._id).toString();
            let resto_id = cartData[0]?.resto_id || '';

        //Deleivey Boy ki id,Name,Phone number,,fetch ho jaaye...jo sleect hoga,,randomly
        //---same Area.City ,,k naam k hisaab se,,,of user--and--delivery boy--
            let deliveryBoy_response=await fetch("http://localhost:3000/api/DeliveryPersonsApi/"+location);
            deliveryBoy_response=await deliveryBoy_response.json();
            //console.log(deliveryBoy_response);
            let deliveryBoy_Name=deliveryBoy_response.res.map((item)=>item.Name);
            deliveryBoy_Name=deliveryBoy_Name[Math.floor(Math.random()*deliveryBoy_Name.length)]

            let deliveryBoy_id = deliveryBoy_response.res.map((item)=>item._id);
            deliveryBoy_id=deliveryBoy_id[Math.floor(Math.random()*deliveryBoy_id.length)]

            let deliveryBoy_PhoneNumber = deliveryBoy_response.res.map((item)=>item.Phone_No);
            deliveryBoy_PhoneNumber=deliveryBoy_PhoneNumber[Math.floor(Math.random()*deliveryBoy_PhoneNumber.length)]
            if(!deliveryBoy_id){
                alert("Delivery Boy is not Present in your Address/Area")
            }

            console.log(deliveryBoy_Name,deliveryBoy_PhoneNumber,deliveryBoy_id);


            let statusOfOrder = 'Confirm';
            let Totalamount = calculateTotal();

            const collection = { user_id, foodItemsIds, resto_id, deliveryBoy_id, statusOfOrder, Totalamount };

            let res = await fetch('http://localhost:3000/api/OrderApi', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(collection),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            let resJson = await res.json();

            if (resJson.success) {
                setshowOrderedConfirmation(true);
                setTimeout(() => setshowOrderedConfirmation(false), 3000); // Hide after 3 seconds
            } else {
                setshowOrderReject(true);
                setTimeout(() => setshowOrderReject(false), 3000); // Hide after 3 seconds
            }
        } catch (error) {
            console.error('Error:', error);
            setshowOrderReject(true);
            setTimeout(() => setshowOrderReject(false), 3000); // Hide after 3 seconds
        }
    };

    const Notification = ({ message, type }) => (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-md ${type === 'success' ? 'bg-blue-900 text-white' : 'bg-red-500 text-white'}`}>
            {message}
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-r from-red-400 via-yellow-300 to-red-400 flex items-center justify-center p-8">
            {showOrderedConfirmation && <Notification message="Order Successful!" type="success" />}
            {OrderReject && <Notification message="Order Rejected. Please try again." type="error" />}

            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
            <button
            onClick={() => router.back()}
            className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-black hover:bg-gray-500 text-white py-2 px-4 rounded-lg shadow-md transition-colors"
          >
            Back
          </button>
                <h2 className="text-2xl font-bold mb-4 text-center">Final Bill</h2>
                <div className="space-y-3">
                    {cartData.map((item, index) => (
                        <div key={index} className="flex justify-between items-center border-b pb-2">
                            <span className="text-gray-700">
                                {item.itemName} (x{item.quantity || 1})
                            </span>
                            <span className="text-gray-900">₹{(item.itemPrice * (item.quantity || 1)).toFixed(2)}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-6 border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                        <span>Total:</span>
                        <span className="text-black">₹{calculateTotal()}</span>
                    </div>
                </div>
                <button onClick={sendDatatoOrdersDb} className="mt-6 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
}
