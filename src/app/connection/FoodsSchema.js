const { default: mongoose } = require("mongoose");

const FoodsDBstructure=new mongoose.Schema({
    itemName:String,
    itemLink:String,
    itemPrice:Number,
    itemDescription:String,
    //restaurant se id nikaalenge hum,,pta chle ki ye xyz FOOD konse restaurant ka hai
    
    resto_id:mongoose.Schema.Types.ObjectId,
    //Database same he hai,,Dono Collections ka to,,obviously id share kr skte hain
}, { versionKey: false });  // Disable the __v field)

export const Food_Schema_Var=mongoose.models.foods || mongoose.model("foods",FoodsDBstructure);