import express, { request, response } from 'express'
import { OrderController } from '../controller/OrderController'

export const orderRouter = express.Router()

const orderController = new OrderController()

orderRouter.post("/create", (request, response) => orderController.createOrder(request, response))
orderRouter.get("/get-orders", (request, response) => orderController.getOrders(request, response))
orderRouter.get("/:orderId", (request, response) => orderController.getOrderById(request, response))