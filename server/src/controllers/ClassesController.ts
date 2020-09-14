import {Request, Response} from 'express'

import db from '../database/connection'
import convertHoursToMinutes from '../utils/convertHourToMinutes'

interface ScheduleItem {
    weekday: number,
    from: string,
    to: string
}

export default class {
    async index(req: Request, res: Response) {
        try {
            const filters = req.query
            const subject = filters.subject as string
            const time = filters.time as string
            const weekday = filters.weekday as string
    
            if (!filters.subject || !filters.weekday || !filters.time) {
                const classesList = await db('users')
                .join('classes', 'users.id', 'classes.user_id')
                .select('*')
                return res.status(200).json(classesList)
            }
    
            const timeInMinutes = convertHoursToMinutes(time)
    
            const classes = await db('classes')
                .whereExists(function() {
                    this.select('classes_schedule.*')
                    .from('classes_schedule')
                    .whereRaw('`classes_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`classes_schedule`.`weekday` = ??', [Number(weekday)])
                    .whereRaw('`classes_schedule`.`from` <= ??',[timeInMinutes])
                    .whereRaw('`classes_schedule`.`to` > ??',[timeInMinutes])
                })
                .where('classes.subject', '=', subject)
                .join('users', 'classes.user_id', '=', 'users.id')
                .select(['classes.*', 'users.*'])
    
            return res.json(classes)
        } catch (error) {
            return res.status(500).json({"error": "Server error"})
        }
    }

    async create(req: Request, res: Response) {
        const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body
        
        const trx = await db.transaction()
    
        try {
            const insertedUsersIds = await trx('users').insert({ name, avatar, whatsapp, bio })
    
            const user_id = insertedUsersIds[0]
    
            const insertedClassesIds = await trx('classes').insert({ subject, cost, user_id })
    
            const class_id = insertedClassesIds[0]
    
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    weekday: scheduleItem.weekday,
                    from: convertHoursToMinutes(scheduleItem.from),
                    to: convertHoursToMinutes(scheduleItem.to)
                }
            })
    
            await trx('classes_schedule').insert(classSchedule)
    
            await trx.commit()
            
            return res.status(201).send()
        } catch (error) {
            await trx.rollback()
    
            return res.status(400).json({
                "error": "Unexpected error while creating new class"
            })
        }
    }

    async delete (req: Request, res: Response) {
        const {id} = req.params
        const trx = await db.transaction()
    
        try {
            await trx('users').where('id', id).del()
            await trx('classes').where('user_id', id).del()
            await trx('classes_schedule').where('class_id', id).del()

            await trx.commit()
            
            return res.status(200).send('User deleted')
        } catch (error) {
            trx.rollback()
    
            return res.status(400).json({
                "error": "Unexpected error while creating new class"
            })
        }
    }

    async update(req: Request, res: Response) {
        const {id} = req.params
        const trx = await db.transaction()
        await trx('classes').where('user_id', id).update({
            subject: req.body.subject,
          })
          await trx.commit()
            
          return res.status(200).send('User updated')
    }
}