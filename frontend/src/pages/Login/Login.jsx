import React from 'react'
import useUnProtected from '../../hooks/useUnProtected'
import { useHistory } from 'react-router-dom'
import LoginForm from './LoginForm'
import { ScreenContainer, SignUpButtonContainer } from './style'
import { Button } from '@material-ui/core'
import { goToSignup } from '../../routes/cordinator'

const Login = () => {
    useUnProtected()
    const history = useHistory()

    return(
        <div>
            <ScreenContainer>
                <h3>Entrar</h3>
                <LoginForm/>
                <SignUpButtonContainer
                    variant="text"
                    color="primary"
                    type={"submit"}
                    fullWitdth
                    margin={'normal'}
                    onClick={() => goToSignup(history)}
                >
                    <Button>
                        Não Possui cadastro? Clique aqui
                    </Button>
                </SignUpButtonContainer>
            </ScreenContainer>
        </div>
    )
}

export default Login