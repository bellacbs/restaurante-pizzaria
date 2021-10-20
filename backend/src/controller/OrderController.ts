import { Request, Response } from "express"
import { OrderBusiness } from "../business/OrderBusiness"
import { IngredientDataBase } from "../data/IngredientsDataBase"
import { OrderDataBase } from "../data/OrderDataBase"
import { PizzaDataBase } from "../data/PizzaDataBase"
import { OrderInputDTO } from "../model/Order"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"

export class OrderController{
    private orderBusiness: OrderBusiness

    constructor(){
        this.orderBusiness = new OrderBusiness(
            new OrderDataBase(),
            new IdGenerator(),
            new Authenticator(),
            new PizzaDataBase(),
            new IngredientDataBase()
        )
    }

    async createOrder(req: Request, res: Response){
        try{
            const input: OrderInputDTO[] = req.body.itens

            const token = req.headers.authorization

            if(!token){
                throw new Error("Login Obrigatório")
            }

            if(typeof(input) !== "object"){
                throw new Error(`O tipo do campo 'itens' deve ser um array de objetos com as propriedades 'pizzaId' e 'quantity'`)
            }

            const result = await this.orderBusiness.createOrder(input, token)

            res.status(200).send(result)

        }catch(error: any){
            res.status(400).send(error.message)
        }
    }

    async getOrders(req: Request, res: Response){
        try{
            const clienteId = req.query.clientId as string

            const token = req.headers.authorization

            if(!token){
                throw new Error("Login Obrigatório")
            }

            const result = await this.orderBusiness.getOrders(token, clienteId)

            res.status(200).send(result)

        }catch(error: any){
            res.status(400).send(error.message)
        }
    }

    async getOrderById(req: Request, res: Response){
        try{
            const orderId = req.params.orderId

            const token = req.headers.authorization

            if(!token){
                throw new Error("Login Obrigatório")
            }

            const result = await this.orderBusiness.getOrderById(orderId, token)

            res.status(200).send(result)

        }catch(error: any){
            res.status(400).send(error.message)
        }
    }
}