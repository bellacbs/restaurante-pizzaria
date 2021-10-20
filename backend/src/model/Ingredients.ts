export class Ingredients {
    constructor(
        private id: string,
        private name: string
    ){}

    public getId(): string{
        return this.id
    }

    public getName(): string{
        return this.name
    }

    public setName(name: string){
        this.name = name
    }

    public static toIngredients(data: any): Ingredients{
        return(
            data && new Ingredients(
                data.id,
                data.name
            )
        )
    }
}