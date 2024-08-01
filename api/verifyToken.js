import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
    const token = req.cookies.token
    if(!token) {
        return res.status(401).json({message: "You are not authenticated"})
    }

    jwt.verify(token, process.env.JWT_SECRET, async(err, data) => {
        if(err) {
            return res.status(403).json({message: "Token not valid"})
        }

        req.userId = data.id
        next()
    })
}

export default verifyToken;