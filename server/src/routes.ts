import express from 'express'
import ClassesController from './controllers/ClassesController'
import ConnectionsController from './controllers/ConnectionsController'
import LoginController from './controllers/LoginController'
import SignUpController from './controllers/SignUpController'

import auth from './middleware/auth'

const routes = express.Router()
const classesController = new ClassesController()
const connectionsController = new ConnectionsController()
const loginController = new LoginController()
const signUpController = new SignUpController()

routes.get('/classes', auth, classesController.index)
routes.post('/classes', classesController.create)
routes.put('/classes/:id', classesController.update)
routes.delete('/classes/:id', classesController.delete)

routes.get('/connections', connectionsController.index)
routes.post('/connections', connectionsController.create)

routes.post('/signup', signUpController.create)

routes.post('/login', loginController.auth)
routes.post('/logout', loginController.logout)

routes.get('/getStatus', loginController.status)

export default routes