import { useEffect } from "react"
import { useHistory } from "react-router"
import { goToFeed } from "../routes/cordinator"

const useUnProtected = () => {
    const history = useHistory()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){
            goToFeed(history)
        }
    })
}

export default useUnProtected