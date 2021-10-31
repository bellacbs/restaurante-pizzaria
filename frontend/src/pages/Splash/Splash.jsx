import React from "react";

import { useHistory } from "react-router";
import {goToLogin} from '../../routes/cordinator'
import { Container } from "./style";

const Splash = () => {
    const history = useHistory()

    setTimeout(() => {
        goToLogin(history)
    }, 3000)

    return(
        <Container/>
    )
}

export default Splash