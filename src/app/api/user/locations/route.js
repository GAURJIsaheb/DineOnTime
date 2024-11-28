import { connection_Variable } from "@/app/connection/db";
import { SchemaVariable } from "@/app/connection/Schema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(){
    await mongoose.connect(connection_Variable);
    let res=await SchemaVariable.find();//restaurant ka he schema variable hai ye
    res=res.map((item)=>item.City.charAt(0).toUpperCase()+item.City.slice(1))
    //item.City mai,,uska 1st Letter ko Uppercase mai add kra,,then small vaale ko slice..kr dia---hta dia
    if(res){return NextResponse.json({res,success:true}) }
    else{ 
        return NextResponse.json({res,success:false});
    }
    
}