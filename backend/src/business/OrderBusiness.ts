import { IngredientDataBase } from "../data/IngredientsDataBase";
import { OrderDataBase } from "../data/OrderDataBase";
import { PizzaDataBase } from "../data/PizzaDataBase";
import { Order, OrderInputDTO } from "../model/Order";
import { UserRole } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class OrderBusiness{
    constructor(
        private orderDataBase: OrderDataBase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private pizzaDataBase: PizzaDataBase,
        private ingredientsDataBase: IngredientDataBase
    ){}

    async createOrder(input: OrderInputDTO[], token: string): Promise<any>{
        const user = this.authenticator.getData(token)
        if(!user){
             throw new Error("Usuário não encontrado")
        }

        if(user.role !== UserRole.NORMAL){
            throw new Error("Usuário deve ser do tipo normal")
        }

        const orderId = this.idGenerator.generate()

        let total = 0

        await Promise.all(
            input.map(async(item) => {
                const pizza = await this.pizzaDataBase.getPizzaById(item.pizzaId)
                const pricePizza: any = pizza && pizza?.getPrice()
                total +=  (pricePizza * item.quantity)
            })
        )

        const order = new Order(orderId, new Date(), total, user.id)

        await this.orderDataBase.createOrder(order)

        await Promise.all(
            input.map(async(item) => {
                await this.orderDataBase.relationOrderAndPizza(orderId,item.pizzaId, item.quantity)
            })
        )
        
        return ({message: `Pedido ${orderId} criado com sucesso`})

    }

    async getOrders(token: string, clientId?: string){
        const user = this.authenticator.getData(token)
        if(!user){
             throw new Error("Usuário não encontrado")
        }

        if(user.role !== UserRole.ADMIN && user.role !== UserRole.NORMAL){
            throw new Error("Login Obrigatorio")
        }

        let userId: string

        if(clientId && user.role === UserRole.ADMIN){
            userId = clientId
        }else{
            userId = user.id
        }

        const orders = await this.orderDataBase.getOrdersByUserId(userId)

        return ({message: orders})
        
    }

    async getOrderById(orderId: string, token: string): Promise<any>{
        const user = this.authenticator.getData(token)

        if(!user){
             throw new Error("Usuário não encontrado")
        }

        const order = await this.orderDataBase.getOrderByIdAndUserId(orderId, user.id)

        if(!order){
            throw new Error("Essa ordem não pertence a esse usuário")
        }
        const getPizza = await this.orderDataBase.getPizzaIdByOrderId(orderId)
        
        let itens: Array<object> = []
        await Promise.all(
            getPizza.map(async(item: any)=> {
                const pizza = await this.pizzaDataBase.getPizzaById(item.pizzaId)

                const ingredients = await this.ingredientsDataBase.getIngredientByPizzaId(item.pizzaId)

                const pizzaDetails = {
                    pizzaId: pizza?.getId(),
                    name: pizza?.getName(),
                    price: pizza?.getPrice(),
                    quantity: item.quantity,
                    ingredients: ingredients
                }

                itens.push(pizzaDetails)
            })
        )

        const orderDetails = {
            id: order.id,
            date: order.date,
            price: order.price,
            itens: itens
        }

        return ({message: orderDetails})
    }
}