import express from 'express'
import { UserController } from '../controller/UserController'

export const userRouter = express.Router()

const userController = new UserController()

userRouter.post("/signup", (request, response) => userController.signup(request, response))
userRouter.post("/login", (request, response) => userController.login(request, response))