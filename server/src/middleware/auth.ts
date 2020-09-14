import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface ResquestInterface extends Request {
    userId?: any
}

export default (req: ResquestInterface, res: Response, next: NextFunction) => {
    const token = req.cookies['access_token']
    
    if (!token) return res.status(401).send({auth: false, message: 'No token provided'})

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
        req.userId = decoded.uid
        next()
    } catch (error) {
        res.status(500).send({auth: false, message: 'Token is invalid'})
    }
}