import axios from "axios"
import { BASE_URL } from "../constants/urls"

export const getPizzas = () => {
    axios.get(`${BASE_URL}/pizza/get`)
    .then((res) => {
        return res.data.message
    })
}