import { connection_Variable } from "@/app/connection/db";
import { OrderSchema_var } from "@/app/connection/OrderSchema";
import { SchemaVariable } from "@/app/connection/Schema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request){
    const payload=await request.json();
    await mongoose.connect(connection_Variable);
    let resp=new OrderSchema_var(payload);
    let res=await resp.save();
    if(res){
        return NextResponse.json({result:res,success:true})
    }
    else{
        return NextResponse.json({result:res,success:false})
    }
}
export async function GET(request){
    const url = new URL(request.url); // Create a URL object
    let getuserid= url.searchParams.get('id')
  http://localhost:3000/api/OrderApi?id=6738e0a248f57e76e1a56042     ,,ese jo id pass hoga vo catch krega ye  
    await mongoose.connect(connection_Variable);
    let res=await OrderSchema_var.find({user_id:getuserid});
    let success=false;
    if(res){
        let restaurantData=await Promise.all(
            res.map(async(item)=>{
                let restoInfo={};
                restoInfo.data=await SchemaVariable.findOne({_id:item.resto_id})//orders db mai hai ye resto_id,,us se match krva rhe,,project vaale db k restaurants se
                restoInfo.amount=item.Totalamount;
                restoInfo.status=item.statusOfOrder;

                return restoInfo;

            })
        )
        res=restaurantData;
        success=true;
    }

    
        return NextResponse.json({result:res,success})
    

}