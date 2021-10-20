export class Pizza {
    
    constructor(
        private id: string,
        private name: string,
        private price: number
    ){}

    public getId(): string{
        return this.id
    }

    public getName(): string{
        return this.name
    }

    public getPrice(): number{
        return this.price
    }

    public setId(id: string){
        this.id = id
    }

    public setName(name: string){
        this.name = name
    }

    public setPrice(price: number){
        this.price = price
    }

    public static toPizza(data: any): Pizza{
        return (
            data && new Pizza(
                data.id,
                data.name,
                data.price
            )
        )
    }

}

export interface PizzaInputDTO{
    name: string,
    price: number,
    ingredients: string[]
}