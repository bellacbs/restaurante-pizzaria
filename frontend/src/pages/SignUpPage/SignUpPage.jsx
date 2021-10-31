import SignUpForm from "./SignUpForm"
import { ScreenContainer } from "./styled"

const SignUpPage = () => {
    return(
        <div>
            <ScreenContainer>
                <h3>Cadastrar</h3>
                <SignUpForm />
            </ScreenContainer>
        </div>
    )
}

export default SignUpPage