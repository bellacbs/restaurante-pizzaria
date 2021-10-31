import { useParams } from "react-router"
import BackButton from "../../components/BackButton/BackButton"
import useRequestData from "../../hooks/useRequestData"

const OrderDetails = () => {
    const params = useParams()
    const orderId = params.orderid
    const order = useRequestData({}, `/orders/${orderId}`)
    
    return(
        <div>
            <BackButton/>
            { order && 
            <div>
                <p>{order.date}</p>
                <p>R$ {order.price && order.price.toFixed(2)}</p>
                <div>
                    {order.itens?.map((pizza) => {
                        return(
                            <div key={pizza.pizzaId}>
                                <div>Pizza: {pizza.name}</div>
                                <div>Preço: R$ {pizza.price.toFixed(2)}</div>
                                <div>Quantidade: {pizza.quantity}</div>
                                <div>Ingredientes: {pizza.ingredients?.map((ingredient) =>{
                                    return(
                                        <div>
                                            {`| ${ingredient} |`} 
                                        </div>
                                    )
                                })}</div>
                            </div>
                        )
                    })}
                </div>
            </div>}
        </div>
    )
}

export default OrderDetails