require('dotenv').config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Member = require('../../models/Member');

module.exports = {
    getAllMember: (req, res) =>{
        Member.find()
        .populate("pc")
        .then(result =>{
            res.status(200).json({
                message: "get all member success ",
                result
            })
        })
        .catch(error =>{
            res.status(404).send(error)
        })
        
    },
    getMemberById: (req, res) =>{
        Member.findById(req.params.id)
        .then(result =>{
            res.status(200).json({
                message: "get member by id success",
                result
            })
        })
        .catch(error =>{
            res.status(404).send(error)
        })
    },
    addMember: async (req, res) =>{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        let member = {
          ...req.body,
          password: hash,
        };
        console.log(member);

        member = await Member.create(member);

        
        try {
          res.json({
            message: "success add data member",
            member,
          });
        } catch (err) {
          console.log(err);
          res.status(500).send(err);
        }

        // const salt = bcrypt.genSalt(10);
        // const hash = bcrypt.hashSync(req.body.password, salt)

        // let member ={
        //     ...req.body,
        //     password: hash
        // }
        // console.log(member)

        // Member.create(member)
        // .then(result =>{
        //     res.status(200).json({
        //         message:"create member success",
        //         result
        //     })
        // })
        // .catch(error =>{
        //     res.status(404).send(error)
        // })
    },
    updateMember: (req, res) =>{
        Member.findByIdAndUpdate(req.params.id, req.body)
        .then(result =>{
            result.save();
            res.status(200).send("update member success")
        })
        .catch(error =>{
            res.status(404).send(error)
        })
    },
    deleteMember: (req, res) =>{
        Member.findByIdAndDelete(req.params.id)
        .then(result =>{
            if(result){
                res.status(200).send(`member id: ${req.params.id} has been deleted`)
            } else{
                res.send('delete member failed')
            }
        })
        .catch(error =>{
            res.status(404).send(error)
        })
    },
    loginMember: (req, res) =>{
        Member.findOne({email: req.body.email})
        .then(result =>{
            if(result){
                bcrypt.compare(req.body.password, result.password)
                .then((data) =>{
                    console.log(data)
                    const token = jwt.sign(result.toObject(), process.env.SECRET_KEY)
                        res.json({
                            message:"login success",
                            token
                        })
                })
                .catch((error) =>{
                    res.json('wrong password')
                })
                    // if(password){
                    //     const token = jwt.sign(result.toObject(), process.env.SECRET_KEY)
                    //     res.json({
                    //         message:"login success",
                    //         token
                    //     })
                    // } else{
                    //     res.json('wrong password')
                    // }
            } else{
                res.json('user not found')
            }
        })
        .catch(error =>{
            console.log(error)
        })
    }
}