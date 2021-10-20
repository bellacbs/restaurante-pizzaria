import { IngredientDataBase } from "../data/IngredientsDataBase";
import { PizzaDataBase } from "../data/PizzaDataBase";
import { Pizza, PizzaInputDTO } from "../model/Pizza";
import { UserRole } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class PizzaBusiness{
    constructor(
        private pizzaDataBase: PizzaDataBase,
        private authenticator: Authenticator,
        private idGenerator: IdGenerator,
        private ingredientsDataBase: IngredientDataBase
    ){}


    async createPizza(pizzaInput: PizzaInputDTO, token: string){
        const user = this.authenticator.getData(token)

        if(user.role !== UserRole.ADMIN){
            throw new Error("Funcionalidade só pode ser acessada com um 'admin'")
        }

        const pizzaId = this.idGenerator.generate()

        const pizza = new Pizza(pizzaId, pizzaInput.name, pizzaInput.price)

        await this.pizzaDataBase.createPizza(pizza)

        await Promise.all(pizzaInput.ingredients.map(async(ingredientId: string) => {
            await this.pizzaDataBase.relationPizzaAndIngredient(pizzaId, ingredientId)
        }))

        return ({message: "Pizza Incluída com sucesso"})

    }

    async getPizzas(){
        const pizzas = await this.pizzaDataBase.getPizzas()

        let result: Array<any> = []

        await Promise.all(
            pizzas.map(async(pizza: any) => {
                const ingredients = await this.ingredientsDataBase.getIngredientByPizzaId(pizza.id)

                result.push({
                    id: pizza.id,
                    name: pizza.name,
                    price: pizza.price,
                    ingredients: ingredients
                })
            })
        )
        return ({message: result})
    }
}