require('dotenv').config();

const PcRoom = require('../../models/PcRoom');

module.exports ={
    getAllPcRoom: (req, res) =>{
        PcRoom.find()
        .then(result =>{
            res.status(200).json({
                message: "get all pc room success",
                result
            })
        })
        .catch(error =>{
            res.status(404).send(error)
        })
    },
    getPcRoomById: (req, res) =>{
        PcRoom.findById(req.params.id)
        .then(result =>{
            res.status(200).json({
                message: "get pc room by id success",
                result
            })
        })
        .catch(error =>{
            res.status(404).send(error)
        })
    },
    addPcRoom:(req, res) =>{
        PcRoom.create(req.body)
        .then(result =>{
            res.status(200).json({
                message: "add data success",
                result
            })
        })
        .catch(error =>{
            res.status(404).send(error)
        })
    },
    updatePcRoom: (req, res) =>{
        PcRoom.findByIdAndUpdate(req.params.id, req.body)
        .then(result =>{
            res.status(200).json({
                message:`update pc-room id: ${req.params.id} has been success`,
                result
            })
        })
        .catch(error =>{
            res.status(404).send(error)
        })
    },
    deletePcRoom: (req, res) =>{
        PcRoom.findByIdAndDelete(req.params.id)
        .then(result =>{
            if(result){
                res.status(200).send(`delete pc room id: ${req.params.id} has been success`)
            } else {
                res.send('delete pc room failed')
            }
        })
        .catch(error =>{
            res.status(404).send(error)
        })
    }
}