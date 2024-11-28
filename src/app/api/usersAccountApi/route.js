
import { connection_Variable } from "@/app/connection/db";
import { usersSchemaVariable } from "@/app/connection/UsersSchema";

import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(response){
    let data=await response.json();
    await mongoose.connect(connection_Variable);
    let user=new usersSchemaVariable(data);
    let res=await user.save();
    if(res){
        return NextResponse.json({res,success:true})
    }
    else{
        return NextResponse.json({res,success:false})
    }

}