import jwt from 'jsonwebtoken'

export default (userId: number, remember?: boolean) => {
    const payload = {
        uid: `${userId}`
    }
    
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: remember ? '30d' : '1d'
    })

    return token
}