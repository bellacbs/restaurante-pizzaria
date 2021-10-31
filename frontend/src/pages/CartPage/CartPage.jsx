import { Button } from "@material-ui/core"
import { useContext, useEffect, useState } from "react"
import Footer from "../../components/Footer/Footer"
import { GlobalStateContext } from "../../global/GlobalStateContext"

const CartPage = () => {
    const[order, setOrder] = useState([])

    const {cart, removePizzaToCart, getCart} = useContext(GlobalStateContext)

    

    const listOrders = cart?.map((pizza) => {
        return(
            <div>
            <div key={pizza.id}>
                    <div>
                        <p>Nome:{pizza.name}</p>
                        <p>Preço:{pizza.price}</p>
                        <p>Ingredientes: {pizza.ingredients.map((ingredient) => {
                            return(
                                <p>{ingredient}</p>
                            )
                        })}</p>
                    </div>
                    <Button
                        variant="text"
                        color="primary"
                        type={"submit"}
                        margin={'normal'}
                        onClick={() => removePizzaToCart(pizza.id)}
                    >
                        Remover
                    </Button>
                </div>
                <Footer/>
            </div>
        )
    })

    return(
        <div>
            {listOrders}            
            <Button
                    variant="text"
                    color="primary"
                    type={"submit"}
                    margin={'normal'}
                >
                    Confirmar pedido
                </Button>
        </div>
    )
}

export default CartPage