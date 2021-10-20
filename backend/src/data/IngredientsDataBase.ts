import { Ingredients } from "../model/Ingredients";
import { BaseDataBase } from "./BaseDataBase";

export class IngredientDataBase extends BaseDataBase{
    async createIngredient(ingredients: Ingredients): Promise<void>{
        await this.getConnection()
        .insert({
            id: ingredients.getId(),
            name: ingredients.getName()
        })
        .into(this.tableNames.ingredient)
    }

    async getIngredientById(id: string): Promise<Ingredients | null>{
        const ingredient = await this.getConnection()
        .select()
        .from(this.tableNames.ingredient)
        .where("id", "=", `${id}`)

        if(!ingredient[0]){
            throw new Error("Ingrediente não encontrado")
        }

        return Ingredients.toIngredients(ingredient[0])
    }

    async getIngredients(): Promise<any>{
        const ingredients = await this.getConnection()
        .select("*")
        .from(this.tableNames.ingredient)

        if(ingredients.length === 0){
            throw new Error("Nenhum Ingrediente Encontrado")
        }

        return ingredients
    }

    async getIngredientByPizzaId(pizzaId: string): Promise<any>{

        const ingredients = await this.getConnection()
        .raw(`
        SELECT i.name FROM ${this.tableNames.ingredient} i
        JOIN ${this.tableNames.pizzaIngredient} p
        ON ingredient_id = i.id
        WHERE pizza_id = '${pizzaId}'
        `)
        
        let result: any = []

        ingredients[0].map((ingredient: any) =>{
            result.push(ingredient.name)
        })

        return result
    }
}