const express = require('express');
const router = express.Router();

const { 
    getAllMember,
    getMemberById,
    addMember,
    updateMember,
    deleteMember,
    loginMember 
} = require('./controller.member');

const {auth} = require('../../helpers/authorization')

router.get('/me', auth, (req, res) =>{
    res.json({
        message: 'authorization was successful',
        user: req.body
    })
})

router.get('/', getAllMember);

router.get('/:id', getMemberById);

router.post('/', addMember);

router.put('/:id', updateMember);

router.delete('/:id', deleteMember);

router.post('/login', loginMember);

module.exports = router;