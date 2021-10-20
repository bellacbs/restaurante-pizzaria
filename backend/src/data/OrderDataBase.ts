import { Order } from "../model/Order";
import { BaseDataBase } from "./BaseDataBase";

export class OrderDataBase extends BaseDataBase{
    async createOrder(order: Order): Promise<void>{
        await this.getConnection()
        .insert({
            id: order.getId(),
            date: order.getDate(),
            price: order.getPrice(),
            user_id: order.getUserId()
        })
        .into(this.tableNames.restaurantOrder)
    }

    async relationOrderAndPizza(orderId: string, pizzaId: string, quantity: number){
        await this.getConnection()
        .insert({
            order_id: orderId,
            pizza_id: pizzaId,
            quantity: quantity
        })
        .into(this.tableNames.orderPizza)
    }

    async getOrderByIdAndUserId(orderId: string, userId: string): Promise<any>{
        const order = await this.getConnection()
        .select("*")
        .from(this.tableNames.restaurantOrder)
        .where("id", "=", `${orderId}`)
        .where("user_id", "=", `${userId}`)

        return order[0]
    }

    async getPizzaIdByOrderId(orderId: string){
        const pizzas = await this.getConnection()
        .raw(`
        SELECT p.pizza_id as pizzaId, quantity
        FROM ${this.tableNames.orderPizza} p
        LEFT JOIN ${this.tableNames.restaurantOrder} o
        ON o.id = '${orderId}'
        `)

        return pizzas[0]
    }

    async getOrdersByUserId(userId: string): Promise<any>{
        const orders = await this.getConnection()
        .select("*")
        .from(this.tableNames.restaurantOrder)
        .where("user_id", "=", `${userId}`)
        .orderBy("date")

        return orders

    }
}