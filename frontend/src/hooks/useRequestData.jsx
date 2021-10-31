import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../constants/urls'

const useRequestData = (initialData, path) => {
    const [data, setData] = useState(initialData)

    const config = {
        method: 'get',
        url: BASE_URL + path,
        headers: {'authorization': localStorage.getItem('token')}
    }
    useEffect(() => {
        axios(config)
        .then((res) => {
            console.log(res.data.message)
            setData(res.data.message) 
        }).catch((error) => {
            window.alert('Erro ao realizar solicitação.\n Tente novamente.')
        })
    }, [path])

    console.log(data)
    return (data)
}

export default useRequestData