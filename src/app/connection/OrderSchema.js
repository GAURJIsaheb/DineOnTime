const { default: mongoose } = require("mongoose");

const DBstructure=new mongoose.Schema({
    user_id:mongoose.Schema.Types.ObjectId,
    foodItemsIds:[String],//array of string
    resto_id:mongoose.Schema.Types.ObjectId,
    deliveryBoy_id:mongoose.Schema.Types.ObjectId,
    statusOfOrder:String,
    Totalamount:String

}, { versionKey: false });  // Disable the __v field);

export const OrderSchema_var=mongoose.models.order || mongoose.model('order',DBstructure);