const express = require('express');
const { route } = require('../member/index.member');
const router = express.Router();

const { 
    getAllPcRoom,
    getPcRoomById,
    addPcRoom,
    updatePcRoom,
    deletePcRoom 
} = require('./controller.PcRoom');

router.get('/', getAllPcRoom);

router.get('/:id', getPcRoomById);

router.post('/', addPcRoom);

router.put('/:id', updatePcRoom);

router.delete('/:id', deletePcRoom);

module.exports = router