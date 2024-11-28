import { connection_Variable } from "@/app/connection/db";
import { Food_Schema_Var } from "@/app/connection/FoodsSchema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request){
    const payload=await request.json();
    await mongoose.connect(connection_Variable,{useNewUrlParser:true});
    const food=new Food_Schema_Var(payload)
    const result=await food.save();
    return NextResponse.json({result,success:true})

}