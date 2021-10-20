import { IngredientDataBase } from "../data/IngredientsDataBase";
import { Ingredients } from "../model/Ingredients";
import { UserRole } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class IngredientBusiness{
    constructor(
        private ingredientDataBase: IngredientDataBase,
        private authenticator: Authenticator,
        private idGenerator: IdGenerator
    ){}

    async createIngredient(name: string, token: string){
        const user = this.authenticator.getData(token)

        if(user.role !== UserRole.ADMIN){
            throw new Error("Funcionalidade só pode ser acessada com um 'admin'")
        }

        const ingredientId = this.idGenerator.generate()

        const ingredient = new Ingredients(ingredientId, name)

        await this.ingredientDataBase.createIngredient(ingredient)

        return ({message: "Ingrediente criado com sucesso"})
    }

    async getIngredients(token: string){

        const user = this.authenticator.getData(token)

        if(user.role !== UserRole.ADMIN){
            throw new Error("Funcionalidade só pode ser acessada com um 'admin'")
        }

        const result = await this.ingredientDataBase.getIngredients()
        console.log("result", result)

        return ({message: result})
    }
}