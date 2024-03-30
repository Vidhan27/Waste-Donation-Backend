const mongoose = require('mongoose');

const ewasteSchema = new mongoose.Schema({
    donor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"EcoEats",
        required:true
    },
    type:{
        type:String,
        default:"ewaste",
    },
    quantity:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    donorToAgentMsg:String,
    agentToDonorMsg:String,
    collectionTime:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:['pending','accepted','rejected','collected'],
        default:'pending',
        required:true
    }
})

const Ewaste = mongoose.model('Ewaste',ewasteSchema);
module.exports = Ewaste;