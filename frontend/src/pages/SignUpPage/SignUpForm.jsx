import React from 'react'
import Button from '@material-ui/core/Button'
import { InputsContainer } from './styled'
import useForm from '../../hooks/userForms'
import {  sendSignUp } from '../../services/user'
import { useHistory } from 'react-router-dom'
import Input from '../../components/Input/Input'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'

const SignUpForm = () => {
    const history = useHistory()
    const { input, onChangeInput, cleanFields, errors, setErrors, span, setSpan } = useForm({
        name: '',
        email:'',
        password:'',
        passwordValidation:''
    })
    
    const validate = () => {
        let temp = {}
        temp.name = input.name===''?'Campo de preenchimento obrigatório':''
        temp.email = input.email===''?'Campo de preenchimento obrigatório':''
        temp.password = input.password.length>5?'':input.password===''?'Campo de preenchimento obrigatório':'Mínimo de 6 caracteres'
        temp.passwordValidation = 
            input.passwordValidation===''?
                'Campo de preenchimento obrigatório'
                :input.passwordValidation.length>5?
                    input.passwordValidation===input.password?
                    ''
                    :'As senhas informadas são diferentes, verifique novamente os campos'
                :'Mínimo de 6 caracteres'
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x === '')
    }
    
    const onSubmitSignUp = (event) =>{
        event.preventDefault()
        if (validate()){
            sendSignUp(input,history,cleanFields, setSpan)
        }
    }

    return (
        <div>
            <InputsContainer>
                <form onSubmit={onSubmitSignUp}>
                    <Input
                        type= 'text'
                        name='name'
                        label="Nome*"
                        value={input.name}
                        placeholder='Nome e sobrenome'
                        onChange={onChangeInput}
                        error={errors.name}
                    />
                    <Input
                        type= 'email'
                        name='email'
                        label="E-mail*"
                        value={input.email}
                        placeholder='email@email.com'
                        onChange={onChangeInput}
                        error={errors.email}
                    />
                    <Input
                        name='password'
                        label="Senha*"
                        value={input.password}
                        placeholder='Mínimo 6 caracteres'
                        onChange={onChangeInput}
                        error={errors.password}
                        password={true}
                    />
                    <Input
                        type= 'password'
                        name='passwordValidation'
                        label="Confirmar*"
                        value={input.passwordValidation}
                        placeholder='Confirme a senha anterior'
                        onChange={onChangeInput}
                        error={errors.passwordValidation}
                        password={true}
                    />
                     <ErrorMessage
                        errorMsg={span}
                    />
                    <Button variant="contained" color="primary"
                        type={'submit'}
                        fullWidth
                        margin={'normal'}
                    >
                    Criar
                    </Button>
                </form>
            </InputsContainer>
        </div>
    )
}

export default SignUpForm