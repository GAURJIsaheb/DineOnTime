import { connection_Variable } from "@/app/connection/db";
import { DeliveryPersonSchema_var } from "@/app/connection/DeliverypersonsSchema";



import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(response) {
  try {
    let data = await response.json();
    //console.log('Received data:', data); // Debug log

    await mongoose.connect(connection_Variable);
    //console.log('Connected to database'); // Debug log

    let user = new DeliveryPersonSchema_var(data);
    let res = await user.save();
    //console.log('User saved:', res); // Debug log

    return NextResponse.json({result: res, success: true });
  } catch (error) {
    //console.error('Error during user save:', error); // Capture detailed error
    return NextResponse.json({ error: error.message, success: false });
  }
}