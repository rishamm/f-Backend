const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
   
    tittle:{type:String,required:true, unique:true},
    desc:{type:String,required:true,},
    price:{type:String,required:true},
    img:{},
    size:{type:Array},
    color:{type:Array},
    categories:{type:Array},
    inStock:{type:Boolean,default:true}
    },
     {timestamps:true}
);
module.exports= mongoose.model("Product",ProductSchema)