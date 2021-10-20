export class Order{
    constructor(
        private id: string,
        private date: Date,
        private price: number,
        private userId: string
    ){}

    public getId(): string{
        return this.id
    }

    public getDate(): Date{
        return this.date
    }

    public getPrice(): number{
        return this.price
    }

    public getUserId(): string{
        return this.userId
    }


}

export interface OrderInputDTO{
    pizzaId: string,
    quantity: number
}