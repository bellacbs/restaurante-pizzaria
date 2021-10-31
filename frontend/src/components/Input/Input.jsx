import React, { useState } from 'react'
import { TextField } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'

export default function Input(props) {
    const {type, name, label, value, placeholder, error=null, onChange, password} = props

    const [visibilityPassword, setVisibilityPassword] = useState(false)

    const handleClickShowPassword = () => {
      setVisibilityPassword(!visibilityPassword)
    }

    return (
        <TextField
            variant = 'outlined'
            type = {password? visibilityPassword ? 'text' : 'password' : type}
            label = {label}
            name={name}
            value = {value}
            placeholder={placeholder}
            onChange = {onChange}
            fullWidth
            {...(error && {error:true, helperText:error} )}
            margin={'normal'}
            InputProps = {{ 
                endAdornment: 
                <InputAdornment position='end'>
                         <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                            >
                            { password? visibilityPassword ? <Visibility /> : <VisibilityOff /> : ''}
                        </IconButton>
                </InputAdornment>
            }}
        />
    )
}