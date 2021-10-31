import axios from 'axios'
import { BASE_URL } from '../constants/urls'

export const getOrdersByUser = async() => {

    const config = {
        method: 'get',
        url: BASE_URL + "/orders/get-orders",
        headers: {'authorization': localStorage.getItem('token')}
    }
    axios(config)
    .then((res) => {
        console.log(res.data.message)
        return res.data.message
    })
    .catch((err) => {
        window.alert(err.response.data)
    })
}
