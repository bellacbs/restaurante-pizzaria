import React, { useEffect } from 'react'
import Footer from '../../components/Footer/Footer'
import Orders from '../../components/Orders/Orders'
import useRequestData from '../../hooks/useRequestData'
import { getOrdersByUser } from '../../services/orders'

const ProfilePage = () => {
    // const data = getOrdersByUser()
    const data = useRequestData([], "/orders/get-orders")

    return(
        <div>
            {data ? <Orders data ={data}/>: <p>Não há pedidos</p>}
            <Footer/>
        </div>
    )
}

export default ProfilePage