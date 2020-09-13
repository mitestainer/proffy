import { Request, Response } from 'express'
import db from '../database/connection'
import bcrypt from 'bcrypt'
import createToken from '../utils/createToken'

interface cookieInterface {
    httpOnly?: boolean
    sameSite?: string
    expires?: Date
}

export default class {
    async auth(req: Request, res: Response) {
        const {email, password, isRememberMeChecked} = req.body

        try {
            const user = await db('users')
                .where('email', '=', email)
                .first(['id', 'email', 'password'])
    
            if (!user) res.status(400).send({auth: false, error: 'Incorrect Credentials'})
            
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (isPasswordValid) {
                const cookieOptions: cookieInterface = {
                    httpOnly: true, sameSite: 'lax'
                }
                const date = new Date()
                const now = date.getTime()
                if (isRememberMeChecked) {
                    const nextMonth = 30 * 24 * 3600000
                    const nextMonthDate = new Date(now + nextMonth)
                    cookieOptions.expires = nextMonthDate
                }
                
                const token = createToken(user.id, isRememberMeChecked)

                res.cookie('access_token', token, cookieOptions as {})
                res.status(200).send({auth: true, token})
            } else {
                res.status(400).send({auth: false, error: 'Incorrect Credentials'})
            }
        } catch (error) {
            res.status(500).send({auth: false, error: 'Server error'})
        }

    }

    logout(req: Request, res: Response) {
        res.clearCookie('access_token')
        res.status(200).send({auth: false, message: 'Logged out'})
    }

    status(req: Request, res: Response) {
        const token = req.cookies['access_token']
        return token ? res.status(200).send(true) : res.status(200).send(false)
    }
}