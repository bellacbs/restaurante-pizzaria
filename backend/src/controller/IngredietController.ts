import { Request, Response } from "express";
import { IngredientBusiness } from "../business/IngredientBusiness";
import { IngredientDataBase } from "../data/IngredientsDataBase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class IngredientController{
    private ingredientBusiness: IngredientBusiness

    constructor(){
        this.ingredientBusiness = new IngredientBusiness(
            new IngredientDataBase(),
            new Authenticator(),
            new IdGenerator()
        )
    }

    async createIngredient(req: Request, res: Response){
        try{
            const name = req.body.name
            const token = req.headers.authorization

            if(!token){
                throw new Error("Obrigatório login")
            }
            
            const result = await this.ingredientBusiness.createIngredient(name, token)
    
            res.status(200).send(result)
        }catch(error: any){
            res.status(400).send({error: error.message})
        }
    }

    async getIngredient(req: Request, res: Response){
        try{
            const token = req.headers.authorization

            if(!token){
                throw new Error("Obrigatório login")
            }

            const result = await this.ingredientBusiness.getIngredients(token)
   

            res.status(200).send(result)

        }catch(error: any){
            res.status(400).send({error: error.message})
        }
    }
}