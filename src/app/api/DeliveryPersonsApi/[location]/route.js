import { connection_Variable } from "@/app/connection/db";
import { DeliveryPersonSchema_var } from "@/app/connection/DeliverypersonsSchema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request,content){
    let address=content.params.location;


    let success=false;
    await mongoose.connect(connection_Variable);
    let filter =  { Address: { $regex: address, $options: "i" } };//Address db mai element ka naam hai jo
        // Search for matching records
        const result = await DeliveryPersonSchema_var.find(filter);
        //console.log(filter)
        if(result.length>0){
            success=true;
        }

        // Return the search results
        return NextResponse.json({ success, res: result });
}