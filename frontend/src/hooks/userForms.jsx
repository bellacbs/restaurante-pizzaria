import { useState } from "react"

const useForm = (initialState) => {

    const [input, setForm] = useState(initialState)
    const [errors, setErrors] = useState({})
    const [span, setSpan] = useState('')

    const onChangeInput = (event) => {
        console.log("event",event)
        const {name, value} = event.target
        setForm({...input, [name]: value})
    }

    const cleanFields = () => {
        setForm(initialState)
    }

    return {input, onChangeInput, cleanFields, errors, setErrors, span, setSpan}
}

export default useForm