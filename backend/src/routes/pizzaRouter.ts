import express from 'express'
import { PizzaController } from '../controller/PizzaController'


export const pizzaRouter = express.Router()

const pizzaController = new PizzaController()

pizzaRouter.post("/create", (request, response) => pizzaController.createPizza(request, response))
pizzaRouter.get("/get", (request, response) => pizzaController.getPizzas(request, response))
