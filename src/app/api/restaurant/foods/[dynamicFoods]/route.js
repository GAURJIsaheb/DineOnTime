import { connection_Variable } from "@/app/connection/db";
import { Food_Schema_Var } from "@/app/connection/FoodsSchema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request,content){
    let id=content.params.dynamicFoods;//dynamically id le rhe yahan
    
    await mongoose.connect(connection_Variable);
    const res=await Food_Schema_Var.find({resto_id:id});
    if(res){
        return NextResponse.json({result :res,success:true})
    }
    if(!res){ 
        return NextResponse.json({result :res,success:false})
    }
   
    
}
export async function DELETE(request,content){
  
    let originalId=content.params.dynamicFoods;//Restaurant se id le rhe jo foods mai,,,vo nhi hai ye
    //console.log(originalId)
    await mongoose.connect(connection_Variable);
    const deleteresp=await Food_Schema_Var.deleteOne({_id:originalId});
    if(deleteresp.deletedCount>0){
        return NextResponse.json({res:deleteresp,success:true})
    }
    else{
        return NextResponse.json({res:deleteresp,success:false})}

}