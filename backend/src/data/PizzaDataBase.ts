import { Pizza } from "../model/Pizza";
import { BaseDataBase } from "./BaseDataBase";

export class PizzaDataBase extends BaseDataBase{
    async createPizza(pizza: Pizza): Promise<void>{
        await this.getConnection()
        .insert({
            id: pizza.getId(),
            name: pizza.getName(),
            price: pizza.getPrice(),
        })
        .into(this.tableNames.pizza)
    }

    async getPizzaById(id: string): Promise<Pizza | null>{
        const pizza = await this.getConnection()
        .select()
        .from(this.tableNames.pizza)
        .where("id", "=", `${id}`)

        if(!pizza[0]){
            throw new Error("Pizza não encontrada")
        }

        return Pizza.toPizza(pizza[0])
    }

    async relationPizzaAndIngredient(pizzaId: string, ingredientId: string): Promise<void>{
        await this.getConnection()
        .insert({
            pizza_id: pizzaId,
            ingredient_id: ingredientId
        })
        .into(this.tableNames.pizzaIngredient)
    }

    async getPizzas(): Promise<any>{
        const pizzas = await this.getConnection()
        .select("*")
        .from(this.tableNames.pizza)

        if(!pizzas[0]){
            throw new Error("Pizza não encontrada")
        }

        return pizzas
    }

}