const mongoose = require("mongoose")
const CategorySchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
        unique:true
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        require:true,
        default:null
    },
    parent:{
        type:mongoose.Types.ObjectId,
        ref:"Category",
        require:true,
        default:null
    },
    brands:[{
        type:mongoose.Types.ObjectId,
        ref:"Brand",
        require:true,
        default:null
    }],
    image:{
        type:String,
        require:true
    },
    description:{
        type:String,
    },
    slug:{
        type: String,
        require: true
    },
    status:{
        type:String,
        enum:["active","inactive"],
        require: true,
        default:"inactive"
    }
},{
    autoCreate:true,
    autoIndex:true,
    timestamps:true
})

const CategoryModel = mongoose.model("Category",CategorySchema)

module.exports = CategoryModel