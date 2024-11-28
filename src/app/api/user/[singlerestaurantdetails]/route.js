import { connection_Variable } from "@/app/connection/db";
import { Food_Schema_Var } from "@/app/connection/FoodsSchema";
import { SchemaVariable } from "@/app/connection/Schema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req,content){
    let dynamicid=content.params.singlerestaurantdetails;
    await mongoose.connect(connection_Variable);
    let dataRestaurant=await SchemaVariable.findOne({_id:dynamicid})
    let dataFood = await Food_Schema_Var.find({resto_id:dynamicid})
    return NextResponse.json({dataRestaurant,dataFood,success:true})
}