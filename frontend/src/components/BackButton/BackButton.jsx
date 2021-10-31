import React from 'react'
import { useHistory } from 'react-router'
import back from '../../assets/back.png'

const BackButton = () => {
    const history = useHistory()

    const goBackPage = () => {
        history.goBack()
    }

    return(
        <div onClick={() => goBackPage()}>
           <img src={back} alt={"Botão de voltar"}/> 
        </div>
    )
}

export default BackButton