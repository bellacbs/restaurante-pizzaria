import axios from 'axios'
import {BASE_URL} from '../constants/urls'
import { goToFeed } from '../routes/cordinator'

export const sendLogin = (body, history, cleanFields, setSpan) => {
    axios.post(`${BASE_URL}/user/login`, body)
    .then((res) => {
        localStorage.setItem('token', res.data.token)
        cleanFields()
        goToFeed(history)
    })
    .catch((error) => {
        setSpan(error.response.data.message)
    })
}

export const sendSignUp = (form, history, cleanFields, setSpan) => {
    const body = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: "normal"
    }
    axios.post(`${BASE_URL}/user/signup`, body)
    .then((res) => {
        localStorage.setItem('token', res.data.token)
        cleanFields()
        goToFeed(history)
    })
    .catch((error) => {
        console.log(error.response)
    })
}