import { connection_Variable } from "@/app/connection/db";
import { Food_Schema_Var } from "@/app/connection/FoodsSchema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

//To Populate Data after Clicking onnEdit button
export async function GET(request,content){
    const id=content.params.id;
    await mongoose.connect(connection_Variable);
    const result=await Food_Schema_Var.findOne({_id:id})
    if(result){
        return NextResponse.json({result,success:true})
    }else{return NextResponse.json({result,success:false})  }
}
export async function PUT(request,content){
    const id=content.params.id;
    const payload=await request.json();
    const result=await Food_Schema_Var.findOneAndUpdate({_id:id},payload)
    if(result){
        return NextResponse.json({res:result,success:true});
    }
    else{
        return NextResponse.json({res:result,success:false});
    }

}