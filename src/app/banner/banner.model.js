const mongoose = require("mongoose")
const BannerSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    link:{
        type:String,
        require:true
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
    position:  {
        type:String,
        require:true,
        default:0
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

const BannerModel = mongoose.model("Banner",BannerSchema)

module.exports = BannerModel