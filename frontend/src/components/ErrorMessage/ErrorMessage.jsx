import React from "react";
import styled from "styled-components";
import {primaryColor} from '../../constants/colors'

const ErrorMessage = (props) => {
    const Span = styled.div`
    color: #e8222e
    `

    return(
        <Span>
            {props.ErrorMessage}
        </Span>
    )
}

export default ErrorMessage