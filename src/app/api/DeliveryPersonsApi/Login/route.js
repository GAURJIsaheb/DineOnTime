import { connection_Variable } from "@/app/connection/db";

import mongoose from "mongoose";
import argon2 from "argon2";
import { NextResponse } from "next/server";

import { DeliveryPersonSchema_var } from "@/app/connection/DeliverypersonsSchema";

export async function POST(request) {
    let res = await request.json();
    await mongoose.connect(connection_Variable);
    
    // Find the user by email
    let user = await DeliveryPersonSchema_var.findOne({ Email: res.Email });

    if (user) {

        // Verify the password using Argon2
        const isPasswordValid = await argon2.verify(user.Password, res.Password);
        if (isPasswordValid) {
            // Exclude sensitive information before sending the response
            const { Password, ...userData } = user._doc;
            return NextResponse.json({ userData, success: true });
        }
    }
    return NextResponse.json({ success: false });
} 