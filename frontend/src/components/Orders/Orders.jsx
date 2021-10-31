import React from 'react'
import { useHistory } from 'react-router'
import { goToOrderDetails } from '../../routes/cordinator'

const Orders = ({data}) => {
    const history = useHistory()

    const orders = data.map((order) =>{
        return(
            <div key = {order.id}>
                <p>{order.date}</p>
                <p>{order.price}</p>
                <p onClick={() => goToOrderDetails(history, order.id)}>+ detalhes</p>
            </div>
        )
    })

    return(
        <div>
            {orders}
        </div>
    )
}

export default Orders