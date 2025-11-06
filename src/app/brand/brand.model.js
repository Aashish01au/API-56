const mongoose = require("mongoose")
const BrandSchema = new mongoose.Schema({
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
    image:{
        type:String,
        require:true
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

const BrandModel = mongoose.model("Brand",BrandSchema)

module.exports = BrandModel