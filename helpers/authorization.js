require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = {
    auth: (req, res, next) =>{
        const authHeader = req.headers.authorization

        const token = authHeader.split(' ')[1]

        if (token == null){
            return res.json('token missing')
        }

        try {
            const isTokenValid = jwt.verify(token, process.env.SECRET_KEY)
            console.log('token: ', isTokenValid)
            if(isTokenValid){
                let {password, ...rest} = isTokenValid

                req.body = rest
                next()
            }
        } catch (error) {
            res.json('token is not valid')
            console.log(error);
        }
    }
}