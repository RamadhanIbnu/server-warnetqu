const mongoose = require('mongoose');

const PcRoomSchema = new mongoose.Schema({
    pcNumber:{
        type: Number,
        required: true
    },
    class: String,

});

const PcRoom = mongoose.model('pc-room', PcRoomSchema);

module.exports =PcRoom