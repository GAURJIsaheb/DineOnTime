import { connection_Variable } from "@/app/connection/db";
import { SchemaVariable } from "@/app/connection/Schema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req){
    let queryparams=req.nextUrl.searchParams;
    console.log(queryparams.get('restaurant'))


//   ?location=Chennai,,,doge toString,,jiski City==Chennai hai vo Data uthkt aa jaaygea DB mai se

    let filterdata={}
    if(queryparams.get('location')){
        //bcz City --->name se stored hai data,,DB mai
        filterdata.City = new RegExp(queryparams.get('location'), 'i'); // Use RegExp to make it case-Insensitive
    }
//for ?restaurant=Name,,,
    if (queryparams.get('restaurant')) {
        filterdata.Name = new RegExp(queryparams.get('restaurant'), 'i'); // case-insensitive search for restaurant name
    }
    await mongoose.connect(connection_Variable)

    let res=await SchemaVariable.find(filterdata);


    return NextResponse.json({result:res})
}