import express, { request, response } from 'express'
import { IngredientController } from '../controller/IngredietController'

export const ingredientsRouter = express.Router()

const ingredientsController = new IngredientController()

ingredientsRouter.post("/create", (request, response) => ingredientsController.createIngredient(request, response))
ingredientsRouter.get("/get", (request, response) => ingredientsController.getIngredient(request, response))