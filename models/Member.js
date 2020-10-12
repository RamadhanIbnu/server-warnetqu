const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email: String,
    password: String,
    gender: String,
    alamat: String,
    skill: String,
    pc:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"pc-room"
    }
});

const Member = mongoose.model("member", memberSchema);

module.exports = Member