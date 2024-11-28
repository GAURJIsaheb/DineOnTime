"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function FoodItemList() {
  const [fooditems, setfooditems] = useState(null); // Initialize as null to distinguish empty state
  const [loading, setLoading] = useState(true);
  const [deleteItemDropbox,setdeleteItemDropbox]=useState(false)


  useEffect(() => {
    loadFoodItems();
  }, []);
  

  const loadFoodItems = async () => {
    try {
      const restaurantId = JSON.parse(localStorage.getItem('LoginData'));
      const resto_id = restaurantId._id;
  
      const resp = await fetch("http://localhost:3000/api/restaurant/foods/" + resto_id); // Replace with your actual API endpoint
      const data = await resp.json();
      if (data.success) {
        setfooditems(data.result);
      }
    } catch (error) {
      console.error("Failed to fetch food items:", error);
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();
  const gotoRestaurantSidePage = () => {
    router.push('/RestaurantSidePage');
  };

  const handleEdit = (itemId) => {
    // Redirect to the edit page, passing the item ID
    router.push(`/RestaurantSidePage/`+itemId);
  };

  //Delete Button
  const deleteFoodItem=async(id)=>{
    try{
      let responseDelte=await fetch("http://localhost:3000/api/restaurant/foods/"+id,{
        method:"DELETE"
      });
      responseDelte=await responseDelte.json();
      if(responseDelte.success){
        loadFoodItems();//Delete hone k baad,,firse Database mai jaakr,Render hob jaaye,,BAAKI Items
        setdeleteItemDropbox(true)

        //3 seconds baad Dropbox ht jaayega
        setTimeout(() => {
          setdeleteItemDropbox(false);
        }, 3000);
      }
      
    } catch (error) {
      console.error("Failed to Delete food items:", error);
    }
    
    

  }



  return (
    <div className="bg-black text-white min-h-screen p-6">
      {deleteItemDropbox && (
        <div className="fixed top-0 left-1/2 mt-5 bg-green-500 text-white px-4 py-2 rounded shadow-md transform -translate-x-1/2">
            Successfully deleted the item!
        </div>
        )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-red-500">Food Item List</h1>
        <button onClick={gotoRestaurantSidePage} className="bg-yellow-500 text-black px-3 py-1 rounded-lg font-semibold hover:bg-yellow-400">
          Back
        </button>
      </div>

      {loading ? (
        <div className="p-6 bg-gray-800 rounded-lg text-center">
          <p className="text-white text-lg">Loading food items...</p>
        </div>
      ) : fooditems ? ( // Check if array has items
        <div className="space-y-6">
          {fooditems.map((item) => (
            <div key={item._id} className="p-4 bg-gray-800 rounded-lg flex justify-between items-center">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-red-400">{item.itemName}</h2>
                <p className="text-white mt-1">Price: ₹{item.itemPrice}</p>
                <a href={item.itemLink} className="text-blue-400 underline mt-1" target="_blank" rel="noopener noreferrer">View Image</a>
                <p className="text-white mt-1">Item Description: {item.itemDescription}</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(item._id)} className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-400">
                  Edit
                </button>
                <button onClick={() => deleteFoodItem(item._id)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-400">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 bg-gray-800 rounded-lg text-center">
          <p className="text-white text-lg">No food items available</p>
        </div>
      )}
    </div>
  );
}
