import { Request, Response } from 'express'
import db from '../database/connection'
import bcrypt from 'bcrypt'
import createToken from '../utils/createToken'

export default class {
    async create(req: Request, res: Response) {
        const {firstName, lastName, email, password} = req.body
        try {
            const user = await db('users')
            .where('email', '=', email)
            .first(['email'])

            if (user) return res.status(400).send('User already exists')

            const newUser = {firstName, lastName, email, password: ''}

            const salt = await bcrypt.genSalt(10)
            newUser.password = await bcrypt.hash(password, salt)

            const savedUser = await db('users').insert(newUser)

            const token = createToken(savedUser[0])

            return res.status(201).send({firstName, lastName, email, password, token})
        } catch (error) {
            return res.status(500).json({
                "error": error.message
            })
        }
    }
}