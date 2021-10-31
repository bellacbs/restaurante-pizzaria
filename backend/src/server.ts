import express from "express";
import dotenv from "dotenv";
import {pizzaRouter} from './routes/pizzaRouter'
import { userRouter } from './routes/userRouter'
import { ingredientsRouter } from "./routes/ingredientsRouter";
import { orderRouter } from "./routes/orderRouter";
import cors from 'cors'

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors())

app.use("/user", userRouter);
app.use("/pizza", pizzaRouter);
app.use("/ingredients", ingredientsRouter)
app.use("/orders", orderRouter)

module.exports = app

