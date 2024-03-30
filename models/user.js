const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:String,
    phone :Number,
    joinedTime:{
        type:Date,
        default:Date.now
    },
    role:{
        type:String,
        enum : ['agent' , 'donor'],
        required : true
    }
});

const User = mongoose.model('EcoEats',userSchema);
module.exports = User;