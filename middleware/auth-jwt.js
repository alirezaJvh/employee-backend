import jwt from 'jsonwebtoken'

const verifyToken = async (req, res, next) => {
    const token = req.header("authorization")
    if (!token) {
        return res.status(403).send({
            message: 'No token provided!'
        });
    }
    jwt.verify(token, process.env.PRIVATE_KEY, (err, decode) => {
        if (err) {
            return res.status(403).send({
                message: 'Unauthorized!'
            });            
        }
        req.employeeId = decode.id
        next()
    })
}

export { verifyToken }