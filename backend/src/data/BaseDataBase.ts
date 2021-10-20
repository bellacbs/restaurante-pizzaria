import knex from "knex";

export class BaseDataBase{
    private static connection: any | null = null

    protected tableNames = {
        pizza: "pizza",
        ingredient: "ingredient",
        pizzaIngredient: "pizza_ingredient",
        restaurantUser: "restaurant_user",
        restaurantOrder: "restaurant_order",
        orderPizza: "restaurant_order_pizza"
    }

    protected getConnection(): any{
        if(!BaseDataBase.connection){
            BaseDataBase.connection = knex({
                client: "mysql",
                connection: {
                    host: process.env.DB_HOST,
                    port: 3306,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_DATABASE_NAME,
                    multipleStatements: true,
                }
            })
        }

        return BaseDataBase.connection
    }
    
}