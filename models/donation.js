const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    donor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"EcoEats",
        required:true
    },
    agent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"EcoEats",
    },
    wasteType:{
        type:String,
        required:true
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

const Donation = mongoose.model('Donation',donationSchema);
module.exports = Donation;