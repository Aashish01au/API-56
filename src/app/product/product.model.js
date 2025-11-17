const mongoose = require("mongoose")
const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    seller:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        require:true,
        default:null
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        require:true,
        default:null
    },
    brand:{
        type:mongoose.Types.ObjectId,
        ref:"Brand",
        require:true,
        default:null
    },
    category:[{
        type:mongoose.Types.ObjectId,
        ref:"Category",
        require:true,
        default:null
    }],
    images:[{
        type:String,
        require:true
    }],
    isFeatured:{
        type:Boolean,
        default:false
    },
    slug:{
        type: String,
        require: true
    },
    price:{
        type:Number,
        min:1,
        require:true
    },
    discount:{
        type:Number,
        min:0,
        max:100,
        default:0
    },
    afterDiscount:{
        type:Number,
        min:1,
        require:true
    },
    stock:{
        type:Number,
        min:0,
        require:true
    },
    tags:[{
        type:String,
    }],
    status:{
        type:String,
        enum:["active","inactive"],
        require: true,
        default:"inactive"
    },
    description:{
        type:String,
    },
},{
    autoCreate:true,
    autoIndex:true,
    timestamps:true
})

const ProductModel = mongoose.model("Product",ProductSchema)

module.exports = ProductModel